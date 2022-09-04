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
				const url = new URL("posts", BASE);
				url.search = new URLSearchParams({
					from,
					sort_by,
					order,
					page: pageParam,
				});

				const res = await fetch(url, {
					credentials: "include",
				});
				if (res.status !== 200) throw new Error("could not fetch");
				return await res.json();
			},
			{
				enabled: !!user || user === null,
				staleTime: Infinity,
				getNextPageParam: (lastPage) => {
					return lastPage.nextPage > -1 ? lastPage.nextPage : undefined;
				},
			}
		);

	const reply = useMutation(
		// TODO: spinning wheel
		async ({ parent_id, text }) => {
			const url = new URL("posts", BASE);
			let res = await fetch(url, {
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
			onSuccess: ({ parent_id, ...row }) => {
				const newPost = {
					...row,
					parent_id,
					name: user.name,
					avatar_url: user.avatar_url,
					is_up: null,
				};
				if (parent_id) {
					queryClient.setQueriesData(["repoData"], (repo) => {
						for (let page of repo.pages) {
							const parentIndex = page.rows.findIndex(
								(e) => e.id === parent_id
							);
							if (parentIndex === -1) {
								continue;
							} else {
								const parent = page.rows[parentIndex];
								parent.replies++;

								if (parent.depth < 3) {
									newPost.path = [...parent.path, parent_id];
									newPost.depth = parent.depth + 1;

									page.rows.splice(parentIndex, 1, parent, newPost);
								} else {
									queryClient.invalidateQueries(["repoData", parent.id]);
								}
								return repo;
							}
						}
					});
				} else {
					queryClient.invalidateQueries(["repoData"]);
				}
			},
		}
	);

	const edit = useMutation(
		async ({ id, text }) => {
			const url = new URL("posts", BASE);
			let res = await fetch(url, {
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
			onSuccess: ({ id, text }) => {
				// TODO: mark edited
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
			const url = new URL("posts", BASE);
			let res = await fetch(url, {
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
			onSuccess: ({ id }) => {
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
			const url = new URL("upvotes", BASE);
			let res = await fetch(url, {
				method: "POST",
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
			onSuccess: ({ post_id, is_up }) => {
				queryClient.setQueriesData(["repoData"], (repo) => {
					for (let page of repo.pages) {
						const index = page.rows.findIndex((e) => e.id === post_id);
						if (index === -1) {
							continue;
						} else {
							// remove the effect of the previous vote
							const prevVote = page.rows[index].is_up;
							if (prevVote === true) {
								page.rows[index].votes--;
							} else if (prevVote === false) {
								page.rows[index].votes++;
							}
							// add the new vote
							page.rows[index].is_up = is_up;
							if (is_up === true) {
								page.rows[index].votes++;
							} else if (is_up === false) {
								page.rows[index].votes--;
							}
							return repo;
						}
					}
				});
			},
		}
	);

	const removeVote = useMutation(
		async ({ id }) => {
			const url = new URL("upvotes", BASE);
			let res = await fetch(url, {
				credentials: "include",
				method: "DELETE",
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
			onSuccess: ({ post_id }) => {
				queryClient.setQueriesData(["repoData"], (repo) => {
					for (let page of repo.pages) {
						const index = page.rows.findIndex((e) => e.id === post_id);
						if (index === -1) {
							continue;
						} else {
							const prevVote = page.rows[index].is_up;
							if (prevVote === true) {
								page.rows[index].votes--;
							} else if (prevVote === false) {
								page.rows[index].votes++;
							}
							page.rows[index].is_up = null;
						}
						return repo;
					}
				});
			},
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
				addVote: (id, is_up) => addVote.mutate({ id, is_up }),
				removeVote: (id) => removeVote.mutate({ id }),
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
