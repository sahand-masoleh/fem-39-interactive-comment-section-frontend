import { useReducer, useContext, useEffect } from "react";
import { PostsContext } from "@contexts/PostsContext";
import { ModalContext } from "@contexts/ModalContext";
import { AuthContext } from "@contexts/AuthContext";
import { ToastContext, TOAST_MESSAGE } from "@contexts/ToastContext";

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

function useActions(id) {
	const { reply, remove, edit, addVote, removeVote } = useContext(PostsContext);
	const { user } = useContext(AuthContext);
	const getCofirmation = useContext(ModalContext);
	const { showToast } = useContext(ToastContext);

	const [state, dispatch] = useReducer(reducer, {
		isReplying: false,
		isEditing: false,
		isDeleting: false,
	});

	function checkLogin(callback, ...args) {
		if (!user) {
			showToast(TOAST_MESSAGE.NOT_LOGGED_IN);
		} else {
			callback(...args);
		}
	}

	useEffect(() => {
		if (state.isDeleting) handleDelete();
	}, [state]);
	async function handleDelete() {
		try {
			await getCofirmation();
			remove(id);
		} finally {
			dispatch({ type: "deleting" });
		}
	}

	function handleReply(text) {
		reply(id, text);
		dispatch({ type: "replying" });
	}
	function handleEdit(text) {
		edit(id, text);
		dispatch({ type: "editing" });
	}

	function handleAddVote(is_up) {
		addVote(id, is_up);
	}
	function handleRemoveVote() {
		removeVote(id);
	}

	return {
		state,
		dispatch: (...args) => checkLogin(dispatch, ...args),
		handleReply,
		handleEdit,
		handleAddVote: (...args) => checkLogin(handleAddVote, ...args),
		handleRemoveVote: (...args) => checkLogin(handleRemoveVote, ...args),
	};
}

export default useActions;
