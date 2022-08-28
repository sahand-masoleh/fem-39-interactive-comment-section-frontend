import "./Line.scss";
import { useContext } from "react";
import {
	HiddenContext,
	HoveredContext,
	FocusedContext,
	ClosingContext,
} from "@contexts/UIContexts";

function Line({ parentId }) {
	const { handleHide } = useContext(HiddenContext);
	const { hovered, handleHover } = useContext(HoveredContext);
	const { handleFocus } = useContext(FocusedContext);
	const { handleClose } = useContext(ClosingContext);

	function handleClick() {
		handleHide(parentId, true);
		handleFocus(parentId);
		handleClose(parentId);
		handleHover(null);
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
