import { useReducer, useContext } from "react";
import { PostsContext } from "@contexts/PostsContext";

function useActions() {
	const { reply, remove, edit } = useContext(PostsContext);
	const [state, dispatch] = useReducer(reducer, {
		isReplying: false,
		isEditing: false,
		isDeleting: false,
	});

	function reducer(state, action) {
		switch (action.type) {
			case "replying":
				return { ...state, isReplying: !state.isReplying };

			case "editing":
				return { ...state, isEditing: !state.isEditing };

			case "deleting":
				return { ...state, isDeleting: !state.isDeleting };
		}
	}

	function handleReply(id, text) {
		reply(id, text);
		dispatch({ type: "replying" });
	}
	function handleEdit(id, text) {
		edit(id, text);
		dispatch({ type: "editing" });
	}
	function handleDelete(id) {
		remove(id);
		dispatch({ type: "deleting" });
	}

	return { state, dispatch, handleReply, handleEdit, handleDelete };
}

export default useActions;
