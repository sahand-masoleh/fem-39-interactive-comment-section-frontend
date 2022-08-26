import "./Post.scss";

import { useState, useContext } from "react";

import { PostsContext } from "@contexts/PostsContext";
import { AuthContext } from "@contexts/AuthContext";

import { ReactComponent as ReplyIcon } from "@assets/icon-reply.svg";
import { ReactComponent as EditIcon } from "@assets/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "@assets/icon-delete.svg";
import { ReactComponent as UpIcon } from "@assets/icon-up.svg";

import Line from "./Line";
import Info from "./Info";
import Action from "./Action";
import Voting from "./Voting";
import Text from "./Text";
import Reply from "./Reply";

function Post({
	id,
	parent_id,
	user_id,
	depth,
	name = user.name,
	avatar_url = user.avatar_url,
	date,
	text,
	votes,
	replies,
	path,
}) {
	const { hidden, handleHide, focused, handleFocus, reply, remove, edit } =
		useContext(PostsContext);
	const { user } = useContext(AuthContext);
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const isDeleted = user_id === 1;

	function handleReply() {
		setIsReplying((prevIsReplying) => !prevIsReplying);
	}
	function handleReplySubmit(text) {
		reply(id, text);
		handleReply();
	}
	function handleEdit() {
		setIsEditing((prevIsEditing) => !prevIsEditing);
	}
	function handleEditSubmit(text) {
		edit(id, text);
		handleEdit();
	}
	function handleDelete() {
		setIsDeleting((prevIsDeleting) => !prevIsDeleting);
	}
	function handleDeleteSubmit() {
		remove(id);
		// TODO: modal
		// handleDelete()
	}

	function goToParent() {
		document
			.getElementById(parent_id)
			.scrollIntoView({ behavior: "smooth", block: "center" });
		handleFocus(parent_id);
	}

	const lineMap = () => {
		return new Array(depth)
			.fill(null)
			.map((_, i) => <Line key={path[i]} parentId={path[i]} />);
	};

	if (!hidden.some((e) => path.includes(e)))
		return (
			<div id={id} className="post-container">
				<div className="line-container">{lineMap()}</div>
				<div
					className={`post ${focused == id ? "post--focused" : ""}`}
					onAnimationEnd={() => handleFocus(null)}
				>
					<Voting votes={votes} />
					<Info
						user_id={user_id}
						name={name}
						date={date}
						avatarUrl={avatar_url}
						isCurrentUser={user_id === user?.id}
						isDeleted={isDeleted}
					/>
					<div className="post__action-container">
						{user_id === user?.id && (
							<>
								<Action
									name="Delete"
									// TODO: modal
									// onClick={handleDelete}
									onClick={handleDeleteSubmit}
									Icon={DeleteIcon}
									isSecondary
								/>
								<Action name="Edit" onClick={handleEdit} Icon={EditIcon} />
							</>
						)}
						{!isDeleted && (
							<Action name="Reply" onClick={handleReply} Icon={ReplyIcon} />
						)}
					</div>
					<Text
						text={text}
						isEditing={isEditing}
						isDeleted={isDeleted}
						handleSubmit={handleEditSubmit}
					/>
					{hidden.includes(id) && (
						<p className="post__more" onClick={() => handleHide(id, false)}>
							{replies} {replies == 1 ? "reply" : "replies"}
						</p>
					)}
					{parent_id && (
						<button className="post__scroll" onClick={goToParent}>
							<UpIcon title="Go to parent" />
						</button>
					)}
				</div>
				{isReplying && <Reply handleSubmit={handleReplySubmit} />}
			</div>
		);
}
export default Post;
