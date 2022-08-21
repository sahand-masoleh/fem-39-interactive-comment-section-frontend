import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const PostsContext = createContext();

export function PostsContextProvider({ children }) {
	const [posts, setPosts] = useState([]);
	const [hovered, setHovered] = useState(null);
	const [hidden, setHidden] = useState([]);

	const { isLoading, error } = useQuery("repoData", async () => {
		let res = await fetch("http://localhost:4000/posts");
		res = await res.json();
		setPosts(res);
	});

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
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
