import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

const BASE = "http://localhost:4000";

export const OPTS = {
	DATE: "date",
	SCORE: "score",
	ASC: "asc",
	DESC: "desc",
};

export function PostsContextProvider({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryClient = useQueryClient();
	const { user } = useContext(AuthContext);
	const [params, setParams] = useState({
		sort_by: searchParams.get("sort_by") ?? OPTS.DATE,
		order: searchParams.get("order") ?? OPTS.DESC,
		page: 0,
	});

	useEffect(() => {
		const sort_by = searchParams.get("sort_by");
		const order = searchParams.get("order");
		if (sort_by || order) {
			setParams((prev) => ({
				...prev,
				sort_by,
				order,
			}));
		}
	}, [searchParams]);

	const {
		isLoading,
		error,
		data: posts,
	} = useQuery(
		["repoData", params],
		async ({ queryKey }) => {
			const { sort_by, order, page } = queryKey[1];
			const route = "posts";
			const options = new URLSearchParams({
				sort_by: sort_by,
				order: order,
			});
			const url = new URL(`${route}/?${options}`, BASE);

			const res = await fetch(url);
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
			res = await res.json();
			if (res.success === false) throw new Error(res.message);
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
			res = await res.json();
			if (res.success === false) throw new Error(res.message);
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

	const addVote = useMutation(
		async ({ id, is_up }) => {
			let res = await fetch("http://localhost:4000/upvotes", {
				method: "post",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id, is_up }),
			});
			res = await res.json();
			if (res.success === false) throw new Error(res.message);
			return res;
		},
		{
			onSuccess: (row) => {},
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
				params,
				setSearchParams,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
