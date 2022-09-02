import { createContext, useContext, useState, useEffect } from "react";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams, useParams } from "react-router-dom";

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
		from: 0,
		sort_by: searchParams.get("sort_by") ?? OPTS.DATE,
		order: searchParams.get("order") ?? OPTS.DESC,
		page: 0,
	});
	const { from } = useParams();

	useEffect(() => {
		const sort_by = searchParams.get("sort_by");
		const order = searchParams.get("order");
		if (sort_by || order) {
			setParams({
				sort_by,
				order,
			});
		}
	}, [searchParams]);

	const { isLoading, error, data, fetchNextPage, hasNextPage } =
		useInfiniteQuery(
			["repoData", from ?? 0, params.sort_by, params.order],
			async ({ queryKey, pageParam = 0 }) => {
				const [_, from, sort_by, order] = queryKey;
				const route = "posts";
				const options = new URLSearchParams({
					from,
					sort_by,
					order,
					page: pageParam,
				});
				const url = new URL(`${route}/?${options}`, BASE);

				const res = await fetch(url);
				if (res.status !== 200) throw new Error("could not fetch");
				return await res.json();
			},
			{
				staleTime: Infinity,
				getNextPageParam: (lastPage) => {
					return lastPage.nextPage > -1 ? lastPage.nextPage : undefined;
				},
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
				queryClient.setQueriesData(["repoData"], (repo) => {
					for (let page of repo.pages) {
						const parentIndex = page.rows.findIndex((e) => e.id === parent_id);
						if (parentIndex === -1) {
							continue;
						} else {
							const parent = page.rows[parentIndex];
							parent.replies++;
							newPost.path = [...parent.path, parent_id];
							newPost.depth = parent.depth + 1;

							page.rows.splice(parentIndex, 1, parent, newPost);
							return repo;
						}
					}
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
				queryClient.setQueriesData(["repoData"], (repo) => {
					for (let page of repo.pages) {
						const index = page.rows.findIndex((e) => e.id === id);
						if (index === -1) {
							continue;
						} else {
							page.rows[index].text = text;
							return repo;
						}
					}
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
				queryClient.setQueriesData(["repoData"], (repo) => {
					for (let page of repo.pages) {
						const index = page.rows.findIndex((e) => e.id === id);
						if (index === -1) {
							continue;
						} else {
							page.rows[index] = { ...page.rows[index], ...deleted };
							return repo;
						}
					}
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
				data,
				reply: (parent_id, text) => reply.mutate({ parent_id, text }),
				remove: (id) => remove.mutate({ id }),
				edit: (id, text) => edit.mutate({ id, text }),
				params,
				setParams,
				setSearchParams,
				fetchNextPage,
				hasNextPage,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
