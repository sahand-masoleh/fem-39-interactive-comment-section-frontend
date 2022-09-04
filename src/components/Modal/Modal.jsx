import "./Modal.scss";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ accept, refuse }) {
	const modalRef = useRef();
	useEffect(() => {
		modalRef.current.focus();
	}, []);

	function handleKeyDown(event) {
		if (event.key === "Enter") accept();
		if (event.key === "Escape") refuse();
	}

	function handleModalClick(event) {
		if (event.currentTarget === event.target) {
			refuse();
		}
	}

	return createPortal(
		<div
			className="modal"
			ref={modalRef}
			onKeyDown={handleKeyDown}
			onClick={handleModalClick}
			tabIndex={0}
		>
			<div className="dialog">
				<h2 className="dialog__title">Delete comment</h2>
				<p className="dialog__text">
					Are you sure you want to delete this comment? This will remove the
					comment and can't be undone.
				</p>
				<div className="dialog__buttons-container">
					<button onClick={refuse} className="dialog__button button button--no">
						no, cancel
					</button>
					<button
						onClick={accept}
						className="dialog__button button button--yes"
					>
						yes, delete
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}

export default Modal;
