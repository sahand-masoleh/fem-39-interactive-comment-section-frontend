import { useState, useRef, useEffect } from "react";

function Text({ text, isEditing }) {
	const [editedText, setEditedText] = useState();
	const textareaRef = useRef();

	useEffect(() => {
		if (isEditing) {
			resize();
		} else {
			setEditedText(text);
		}
	}, [isEditing]);

	function handleTextEdit(event) {
		const { value } = event.target;
		setEditedText(value);
	}

	function resize() {
		textareaRef.current.style.height = 0;
		textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
	}

	if (isEditing) {
		return (
			<>
				<textarea
					className="post__text post__text--edit"
					value={editedText}
					onChange={handleTextEdit}
					ref={textareaRef}
					onInput={resize}
				/>
				<button className="post__button">UPDATE</button>
			</>
		);
	} else {
		return <p className="post__text post__text--normal">{text}</p>;
	}
}
export default Text;
