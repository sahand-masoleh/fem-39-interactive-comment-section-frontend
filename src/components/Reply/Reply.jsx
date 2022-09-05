import "./Reply.scss";
import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext, TOAST_MESSAGE } from "@contexts/ToastContext";
import { ReactComponent as PersonIcon } from "@assets/icon-person.svg";

function Reply({ handleReply, handleReplyOrphan, orphan }) {
	const [input, setInput] = useState("");
	const textareaRef = useRef();
	const { user } = useContext(AuthContext);
	const showToast = orphan ? useContext(ToastContext).showToast : null;

	useEffect(() => {
		resize();
	}, [input]);

	function handleTextEdit(event) {
		const { value } = event.target;
		setInput(value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!input) return;
		if (!user) {
			showToast(TOAST_MESSAGE.NOT_LOGGED_IN);
			return;
		}

		if (!orphan) {
			handleReply(input);
		} else {
			handleReplyOrphan(null, input);
		}
		setInput("");
	}

	function resize() {
		textareaRef.current.style.height = "2rem";
		textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
	}

	return (
		<div className="reply-wrapper">
			{!orphan && <div className="line line--unselectable"></div>}
			<div className="reply">
				{user ? (
					<div className="reply__avatar image">
						<img
							src={user?.avatar_url}
							alt="your avatar"
							className="image__img"
						/>
					</div>
				) : (
					<PersonIcon className="reply__avatar reply__avatar--empty" />
				)}
				<textarea
					autoFocus={!orphan}
					className="reply__text reply__text--edit"
					value={input}
					onChange={handleTextEdit}
					ref={textareaRef}
				/>
				<button
					className="reply__button button button--confirm"
					disabled={!input}
					onClick={handleSubmit}
				>
					{orphan ? "send" : "reply"}
				</button>
			</div>
		</div>
	);
}
export default Reply;
