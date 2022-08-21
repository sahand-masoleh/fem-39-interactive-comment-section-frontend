import { useContext } from "react";
import { PostsContext } from "@contexts/PostsContext";

function Line({ parentId }) {
	const { handleHover, handleHide, hovered } = useContext(PostsContext);

	return (
		<div
			className={`line ${
				parentId === hovered ? "line--hovered" : "line--unhovered"
			}`}
			onMouseEnter={() => handleHover(parentId, true)}
			onMouseLeave={() => handleHover(parentId, false)}
			onClick={() => handleHide(parentId, true)}
		></div>
	);
}

export default Line;
