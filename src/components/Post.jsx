import "./Post.scss";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

import { ReactComponent as ReplyIcon } from "@assets/icon-reply.svg";
import { ReactComponent as PlusButton } from "@assets/icon-plus.svg";
import { ReactComponent as MinusButton } from "@assets/icon-minus.svg";
import { ReactComponent as DeleteIcon } from "@assets/icon-delete.svg";

function Post({ id, depth, name, date, text, votes }) {
	return (
		<div className="post">
			<div className="post__voting voting">
				<button className="voting__button voting__button--uncast">
					<PlusButton title="upvote" className="voting__icon" />
				</button>
				<p className="voting__vote-count">{votes}</p>
				<button className="voting__button voting__button--uncast">
					<MinusButton title="downvote" className="voting__icon" />
				</button>
			</div>
			<div className="post__info">
				<div className="post__avatar image">
					<img
						src="https://source.unsplash.com/random/64x64/?face"
						alt={`${name}'s avatar`}
						className="image__img"
					/>
				</div>
				<p className="post__name">{name}</p>
				<p className="post__date">{timeAgo.format(new Date(date))}</p>
			</div>
			<div className="post__action-container">
				<button className="post__action action action--secondary">
					<DeleteIcon title="reply" className="action__icon" />
					<p className="action__label">Delete</p>
				</button>
				<button className="post__action action action--primary">
					<ReplyIcon title="reply" className="action__icon" />
					<p className="action__label">Reply</p>
				</button>
			</div>
			<p className="post__text">{text}</p>
		</div>
	);
}
export default Post;
