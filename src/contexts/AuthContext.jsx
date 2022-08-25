import { createContext, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();
const CLIENT_ID = "61bd93401da3bfc14b01";

export function AuthContextProvider({ children }) {
	const queryClient = useQueryClient();

	const { status, data: user } = useQuery(
		["userData"],
		async () => {
			const res = await fetch("http://localhost:4000/users/check", {
				credentials: "include",
			});
			if (res.status === 200) {
				return await res.json();
			} else {
				throw new Error("not signed in");
			}
		},
		{
			retry: false,
			staleTime: Infinity,
		}
	);

	const mutation = useMutation(
		async (code) => {
			const res = await fetch("http://localhost:4000/users/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
			});
			if (res.status !== 200) throw new Error("authetication unsuccessful");
			return res.json();
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("userData");
			},
		}
	);

	function getAuthLink() {
		let state = sessionStorage.getItem("state");
		if (!state) {
			state = nanoid(10);
			sessionStorage.setItem("state", state);
		}
		const url = new URL(
			`login/oauth/authorize?client_id=${CLIENT_ID}&state=${state}`,
			"https://github.com"
		);
		return url;
	}

	async function checkCode(code, state) {
		// catch is handled by the <Auth /> route component
		let savedState = sessionStorage.getItem("state");
		if (!savedState || savedState !== state)
			throw new Error("authetication unsuccessful");
		mutation.mutate(code);
	}

	return (
		<AuthContext.Provider value={{ getAuthLink, checkCode, user, status }}>
			{children}
		</AuthContext.Provider>
	);
}
