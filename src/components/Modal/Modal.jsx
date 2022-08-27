import "./Modal.scss";
import { createPortal } from "react-dom";

function Modal({ accept, refuse }) {
	return createPortal(
		<div className="modal">
			<div className="dialog">
				<h2 className="dialog__title">Delete comment</h2>
				<p className="dialog__text">
					Are you sure you want to delete this comment? This will remove the
					comment and can't be undone.
				</p>
				<div className="dialog__button-container">
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
