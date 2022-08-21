import { useState, useRef } from "react";

import Line from "./Line";

function Reply({ parentId }) {
	const [text, settext] = useState();
	const textareaRef = useRef();

	function handleTextEdit(event) {
		const { value } = event.target;
		settext(value);
	}

	function resize() {
		textareaRef.current.style.height = 0;
		textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
	}

	return (
		<div className="reply-container">
			<div className="line line--unselectable"></div>
			<div className="reply">
				<div className="reply__avatar image">
					<img
						src="https://source.unsplash.com/random/64x64/?face"
						alt="your avatar"
						className="image__img"
					/>
				</div>
				<textarea
					className="post__text post__text--edit"
					value={text}
					onChange={handleTextEdit}
					ref={textareaRef}
					onInput={resize}
				/>
				<button className="post__button">Reply</button>
			</div>
		</div>
	);
}
export default Reply;
