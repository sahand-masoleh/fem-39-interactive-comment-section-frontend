import { createContext, useState } from "react";
import { nanoid } from "nanoid";

export const AuthContext = createContext();
const CLIENT_ID = "61bd93401da3bfc14b01";

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

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

		const searchParams = new URLSearchParams({ test: "this is a test" });

		let res = await fetch("http://localhost:4000/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ code }),
		});
		if (res.status !== 200) throw new Error("authetication unsuccessful");
		return;
	}

	return (
		<AuthContext.Provider value={{ user, getAuthLink, checkCode }}>
			{children}
		</AuthContext.Provider>
	);
}
