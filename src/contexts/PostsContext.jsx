import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const PostsContext = createContext();

export function PostsContextProvider({ children }) {
	const [hovered, setHovered] = useState(null);
	const [hidden, setHidden] = useState([]);
	const [focused, setFocused] = useState(null);

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

	function handleHover(parentId, bool) {
		if (bool) {
			setHovered(parentId);
		} else {
			setHovered(null);
		}
	}

	function handleHide(parentId, bool) {
		if (bool) {
			setHidden((prevHidden) => [...prevHidden, parentId]);
			setHovered(null);
		} else {
			setHidden((prevHidden) => {
				return prevHidden.filter((e) => e !== parentId);
			});
		}
	}

	function handleFocus(parentId) {
		if (parentId) {
			setFocused(parentId);
		} else {
			setFocused(null);
		}
	}

	return (
		<PostsContext.Provider
			value={{
				isLoading,
				error,
				posts,
				hovered,
				handleHover,
				hidden,
				handleHide,
				focused,
				handleFocus,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
