import "./Post.scss";

import { useContext } from "react";

import { HiddenContext, FocusedContext } from "@contexts/UIContexts";
import { AuthContext } from "@contexts/AuthContext";

import { ReactComponent as UpIcon } from "@assets/icon-up.svg";
import useActions from "./hooks/useActions";
import Line from "./Line";
import Info from "./Info";
import ActionContainer from "./ActionContainer";
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
	const { hidden, handleHide } = useContext(HiddenContext);
	const isHidden = hidden.some((e) => path.includes(e));
	const hasHidden = hidden?.includes(id);

	const { focused, handleFocus } = useContext(FocusedContext);
	const isFocused = focused === id;

	const { user } = useContext(AuthContext);
	const isCurrentUser = user_id === user?.id;

	const { state, dispatch, handleReply, handleEdit, handleDelete } =
		useActions();

	const isDeleted = user_id === 1;

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

	if (!isHidden)
		return (
			<div id={id} className="post-container">
				<div className="line-container">{lineMap()}</div>
				<div
					className={`post ${isFocused ? "post--focused" : ""}`}
					onAnimationEnd={() => handleFocus(null)}
				>
					<Voting votes={votes} />
					<Info
						user_id={user_id}
						name={name}
						date={date}
						avatarUrl={avatar_url}
						isCurrentUser={isCurrentUser}
						isDeleted={isDeleted}
					/>
					<ActionContainer
						isCurrentUser={isCurrentUser}
						isDeleted={isDeleted}
						dispatch={dispatch}
					/>
					<Text
						text={text}
						isEditing={state.isEditing}
						isDeleted={state.isDeleted}
						handleSubmit={(text) => handleEdit(id, text)}
					/>
					{hasHidden && (
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
				{state.isReplying && (
					<Reply
						handleSubmit={(text) => {
							handleReply(id, text);
						}}
						avatar={user.avatar}
					/>
				)}
			</div>
		);
}
export default Post;
