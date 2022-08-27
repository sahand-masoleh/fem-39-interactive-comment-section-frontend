import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

export function PostsContextProvider({ children }) {
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);

	const {
		isLoading,
		error,
		data: posts,
	} = useQuery(
		["repoData"],
		async () => {
			const res = await fetch("http://localhost:4000/posts");
			if (res.status !== 200) throw new Error("could not fetch");
			return await res.json();
		},
		{
			staleTime: Infinity,
		}
	);

	const reply = useMutation(
		// TODO: spinning wheel
		async ({ parent_id, text }) => {
			let res = await fetch("http://localhost:4000/posts", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ parent_id, text }),
			});
			if (res.status !== 201) throw new Error("could not post");
			res = await res.json();
			return res;
		},
		{
			onSuccess: (row) => {
				const { parent_id } = row;
				const newPost = {
					...row,
					name: user.name,
					avatar_url: user.avatar_url,
				};
				queryClient.setQueryData(["repoData"], (repo) => {
					const parentIndex = repo.findIndex((e) => e.id === parent_id);
					const parent = repo[parentIndex];
					parent.replies++;
					newPost.path = [...parent.path, parent_id];
					newPost.depth = parent.depth + 1;

					repo.splice(parentIndex, 1, parent, newPost);
					return repo;
				});
			},
		}
	);

	const edit = useMutation(
		async ({ id, text }) => {
			let res = await fetch("http://localhost:4000/posts", {
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, text }),
			});
			if (res.status !== 200) throw new Error("could not update");
			res = await res.json();
			return res;
		},
		{
			onSuccess: (row) => {
				// TODO: mark edited
				const { id, text } = row;
				queryClient.setQueryData(["repoData"], (repo) => {
					const index = repo.findIndex((e) => e.id === id);
					repo[index].text = text;
					return repo;
				});
			},
		}
	);

	const remove = useMutation(
		async ({ id }) => {
			let res = await fetch("http://localhost:4000/posts", {
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});
			res = await res.json();
			if (res.success === false) throw new Error(res.message);
			return res;
		},
		{
			onSuccess: (row) => {
				const { id } = row;
				const deleted = {
					user_id: 1,
					name: "",
					text: "",
					avatar_url: null,
				};
				queryClient.setQueryData(["repoData"], (repo) => {
					const index = repo.findIndex((e) => e.id === id);
					repo[index] = { ...repo[index], ...deleted };
					return repo;
				});
			},
		}
	);

	return (
		<PostsContext.Provider
			value={{
				isLoading,
				error,
				posts,
				reply: (parent_id, text) => reply.mutate({ parent_id, text }),
				remove: (id) => remove.mutate({ id }),
				edit: (id, text) => edit.mutate({ id, text }),
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
