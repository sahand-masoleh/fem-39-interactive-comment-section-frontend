import "./Toast.scss";
import { createPortal } from "react-dom";

function Toast({ message, disapearing, onAnimationEnd }) {
	return createPortal(
		<div
			className={`toast ${disapearing ? "toast--disapearing" : ""}`}
			onAnimationEnd={onAnimationEnd}
		>
			{message}
		</div>,
		document.body
	);
}

export default Toast;
