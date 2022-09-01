import { ReactComponent as ReplyIcon } from "@assets/icon-reply.svg";
import { ReactComponent as EditIcon } from "@assets/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "@assets/icon-delete.svg";

function ActionsContainer({ isCurrentUser, dispatch }) {
	const handleDelete = () => dispatch({ type: "deleting" });
	const handleEdit = () => dispatch({ type: "editing" });
	const handleReply = () => dispatch({ type: "replying" });

	return (
		<div className="post__actions-container">
			{isCurrentUser && (
				<>
					<Action
						name="Delete"
						onClick={handleDelete}
						Icon={DeleteIcon}
						isSecondary
					/>
					<Action name="Edit" onClick={handleEdit} Icon={EditIcon} />
				</>
			)}
			<Action name="Reply" onClick={handleReply} Icon={ReplyIcon} />
		</div>
	);
}

export default ActionsContainer;

function Action({ name, Icon, onClick, isSecondary = false }) {
	return (
		<button
			className={`post__action action action--${
				!isSecondary ? "primary" : "secondary"
			}`}
			onClick={onClick}
		>
			<Icon title={name} className="action__icon" />
			<p className="action__label">{name}</p>
		</button>
	);
}
