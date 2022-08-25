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
	name,
	avatar_url,
	date,
	text,
	votes,
	replies,
	path,
}) {
	const { hidden, handleHide, focused, handleFocus } = useContext(PostsContext);
	const { id: currentUser } = useContext(AuthContext);
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	function handleReply() {
		setIsReplying((prevIsReplying) => !prevIsReplying);
	}
	function handleEdit() {
		setIsEditing((prevIsEditing) => !prevIsEditing);
	}
	function handleDelete() {
		setIsDeleting((prevIsDeleting) => !prevIsDeleting);
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
						isCurrentUser={user_id === currentUser}
					/>
					<div className="post__action-container">
						{user_id === currentUser && (
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
					<Text text={text} isEditing={isEditing} />
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
				{isReplying && <Reply parentId={id} />}
			</div>
		);
}
export default Post;
