import "./Toast.scss";
import { createPortal } from "react-dom";

function Toast({ message, disapearing, onAnimationEnd, type }) {
	return createPortal(
		<div
			className={`toast toast--${type} ${
				disapearing ? "toast--disapearing" : ""
			}`}
			onAnimationEnd={onAnimationEnd}
		>
			{message}
		</div>,
		document.body
	);
}

export default Toast;
