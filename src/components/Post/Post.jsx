import "./Post.scss";

import { useContext } from "react";

import {
	HiddenContext,
	FocusedContext,
	ClosingContext,
} from "@contexts/UIContexts";
import { AuthContext } from "@contexts/AuthContext";
import useActions from "./hooks/useActions";

import Line from "./Line";
import Info from "./Info";
import ActionsContainer from "./ActionsContainer";
import Voting from "./Voting";
import Text from "./Text";
import Continue from "./Continue";
import Reply from "@components/Reply/Reply";

import { ReactComponent as UpIcon } from "@assets/icon-up.svg";
import { ReactComponent as StickyIcon } from "@assets/icon-sticky.svg";

function Post({
	id,
	parent_id,
	user_id,
	depth,
	name,
	avatar_url,
	url,
	date,
	text,
	votes,
	replies,
	is_edited,
	is_sticky,
	path,
	is_up,
}) {
	const { hidden, handleHide } = useContext(HiddenContext);
	const isHidden = hidden.some((e) => path.includes(e));
	const hasHidden = hidden?.includes(id);

	const { focused, handleFocus } = useContext(FocusedContext);
	const isFocused = focused === id;

	const { closing, handleClose } = useContext(ClosingContext);
	const isClosing = closing === id;

	const { user } = useContext(AuthContext);
	const isCurrentUser = user_id === user?.id;
	const isOP = user_id === 80;

	const {
		state,
		dispatch,
		handleReply,
		handleEdit,
		handleAddVote,
		handleRemoveVote,
	} = useActions(id);

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

	const className = `
	${isFocused ? "post--focused" : ""} ${isClosing ? "post--closing" : ""}
	 ${isDeleted ? "post--deleted" : "post--normal"}
	`;

	function onAnimationEnd(event) {
		if (event.animationName === "focus") handleFocus(null);
		if (event.animationName === "close") handleClose(null);
	}

	if (!isHidden)
		return (
			<div id={id} className="post-wrapper">
				<div className="lines-container">{lineMap()}</div>

				<div className={`post ${className}`} onAnimationEnd={onAnimationEnd}>
					{is_sticky && (
						<StickyIcon className="post__sticky" title="Sticky post" />
					)}

					{!isDeleted && (
						<>
							<Voting
								votes={votes}
								handleAddVote={handleAddVote}
								handleRemoveVote={handleRemoveVote}
								is_up={is_up}
							/>
							<Info
								user_id={user_id}
								name={name}
								date={date}
								avatarUrl={avatar_url}
								url={url}
								isCurrentUser={isCurrentUser}
								isOP={isOP}
							/>
							<ActionsContainer
								isCurrentUser={isCurrentUser}
								dispatch={dispatch}
							/>
						</>
					)}
					<Text
						text={text}
						is_edited={is_edited}
						isEditing={state.isEditing}
						isDeleted={isDeleted}
						handleSubmit={handleEdit}
					/>

					{hasHidden && (
						<Continue replies={replies} unhide={() => handleHide(id, false)} />
					)}

					{replies > 0 && depth > 0 && depth % 3 === 0 && (
						<Continue replies={replies} id={id} />
					)}

					{parent_id && (
						<button className="post__scroll" onClick={goToParent}>
							<UpIcon title="Go to parent" />
						</button>
					)}
				</div>

				{state.isReplying && (
					<Reply handleReply={handleReply} avatar={user.avatar} />
				)}
			</div>
		);
}
export default Post;
