import { createContext } from "react";
import { nanoid } from "nanoid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();
const CLIENT_ID = "61bd93401da3bfc14b01";

import serverURL from "@utils/serverURL";
const BASE = serverURL();

export function AuthContextProvider({ children }) {
	const queryClient = useQueryClient();

	const { status, data: user } = useQuery(
		["userData"],
		async () => {
			const url = new URL("users/check", BASE);
			const res = await fetch(url, {
				credentials: "include",
			});
			if (res.status === 200) {
				return await res.json();
			} else if (res.status === 401) {
				return null;
			} else {
				throw new Error("authentication failed");
			}
		},
		{
			retry: false,
			staleTime: Infinity,
		}
	);

	const login = useMutation(
		async (code) => {
			const url = new URL("users/login", BASE);
			const res = await fetch(url, {
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

	const logout = useMutation(
		async () => {
			const url = new URL("users/logout", BASE);
			const res = await fetch(url, {
				method: "POST",
			});
			if (res.status !== 200) throw new Error("an error occured");
			return null;
		},
		{
			onSuccess: () => {
				queryClient.setQueriesData(["userData"], null);
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
		login.mutate(code);
	}

	return (
		<AuthContext.Provider
			value={{ getAuthLink, checkCode, user, status, logout: logout.mutate }}
		>
			{children}
		</AuthContext.Provider>
	);
}
