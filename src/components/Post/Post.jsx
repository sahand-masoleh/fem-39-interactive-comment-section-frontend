import "./Post.scss";

import { useState, useContext } from "react";

import { PostsContext } from "@contexts/PostsContext";

import { ReactComponent as ReplyIcon } from "@assets/icon-reply.svg";
import { ReactComponent as EditIcon } from "@assets/icon-edit.svg";
import { ReactComponent as DeleteIcon } from "@assets/icon-delete.svg";

import Line from "./Line";
import Info from "./Info";
import Action from "./Action";
import Voting from "./Voting";
import Text from "./Text";
import Reply from "./Reply";

function Post(props) {
	const { hidden, handleHide } = useContext(PostsContext);
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// from the DB
	const { id, parent_id, depth, name, date, text, votes } = props.data;

	function handleReply() {
		setIsReplying((prevIsReplying) => !prevIsReplying);
	}
	function handleEdit() {
		setIsEditing((prevIsEditing) => !prevIsEditing);
	}
	function handleDelete() {
		setIsDeleting((prevIsDeleting) => !prevIsDeleting);
	}

	const lineMap = () => {
		return new Array(depth)
			.fill(null)
			.map((_, i) => <Line key={"" + id + i} parentId={parent_id} />);
	};

	if (!hidden.includes(parent_id))
		return (
			<div className="post-container">
				{lineMap()}
				<div className="post">
					<Voting votes={votes} />
					<Info name={name} date={date} />
					<div className="post__action-container">
						<Action
							name="Delete"
							onClick={handleDelete}
							Icon={DeleteIcon}
							isSecondary
						/>
						<Action name="Reply" onClick={handleReply} Icon={ReplyIcon} />
						<Action name="Edit" onClick={handleEdit} Icon={EditIcon} />
					</div>
					<Text text={text} isEditing={isEditing} />
					{hidden.includes(id) && (
						<p className="post__more" onClick={() => handleHide(id, false)}>
							Show Replies
						</p>
					)}
				</div>
				{isReplying && <Reply parentId={id} />}
			</div>
		);
}
export default Post;
