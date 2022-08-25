import "./Line.scss";
import { useContext } from "react";
import { PostsContext } from "@contexts/PostsContext";

function Line({ parentId }) {
	const { handleHover, handleHide, hovered, handleFocus } =
		useContext(PostsContext);

	function handleClick() {
		handleHide(parentId, true);
		handleFocus(parentId);
		document
			.getElementById(parentId)
			.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}

	return (
		<div
			className={`line ${
				parentId === hovered ? "line--hovered" : "line--unhovered"
			}`}
			onMouseEnter={() => handleHover(parentId, true)}
			onMouseLeave={() => handleHover(parentId, false)}
			onClick={handleClick}
		></div>
	);
}

export default Line;
