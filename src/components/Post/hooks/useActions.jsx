import { useReducer, useContext, useEffect } from "react";
import { PostsContext } from "@contexts/PostsContext";
import { ModalContext } from "@contexts/ModalContext";

function reducer(state, action) {
	switch (action.type) {
		case "replying":
			return { ...state, isReplying: !state.isReplying };

		case "editing":
			return { ...state, isEditing: !state.isEditing };

		case "deleting":
			return { ...state, isDeleting: !state.isDeleting };

		default:
			return state;
	}
}
// TODO: remove post_id from fucntions
function useActions(id) {
	const { reply, remove, edit } = useContext(PostsContext);
	const [state, dispatch] = useReducer(reducer, {
		isReplying: false,
		isEditing: false,
		isDeleting: false,
	});
	const getCofirmation = useContext(ModalContext);

	useEffect(() => {
		if (state.isDeleting) handleDelete();
	}, [state]);

	function handleReply(id, text) {
		reply(id, text);
		dispatch({ type: "replying" });
	}
	function handleEdit(id, text) {
		edit(id, text);
		dispatch({ type: "editing" });
	}
	async function handleDelete() {
		try {
			await getCofirmation();
			remove(id);
		} catch {}
		dispatch({ type: "deleting" });
	}

	return { state, dispatch, handleReply, handleEdit };
}

export default useActions;
