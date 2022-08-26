import { useState, useRef, useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

function Reply({ handleSubmit }) {
	const [input, setInput] = useState();
	const textareaRef = useRef();
	const { user } = useContext(AuthContext);

	function handleTextEdit(event) {
		const { value } = event.target;
		setInput(value);
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
					<img src={user.avatar_url} alt="your avatar" className="image__img" />
				</div>
				<textarea
					className="post__text post__text--edit"
					value={input}
					onChange={handleTextEdit}
					ref={textareaRef}
					onInput={resize}
					rows={1}
				/>
				<button className="post__button" onClick={() => handleSubmit(input)}>
					Reply
				</button>
			</div>
		</div>
	);
}
export default Reply;
