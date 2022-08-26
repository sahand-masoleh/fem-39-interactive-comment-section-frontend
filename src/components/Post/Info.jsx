import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

import { ReactComponent as PersonIcon } from "@assets/icon-person.svg";

function Info({ name, avatarUrl, date, isCurrentUser }) {
	return (
		<div className="post__info">
			{avatarUrl ? (
				<div className="post__avatar image">
					<img
						src={avatarUrl}
						alt={`${name}'s avatar`}
						className="image__img"
					/>
				</div>
			) : (
				<PersonIcon className="post__avatar post__avatar--empty" />
			)}
			<span className="post__name">{name}</span>
			{isCurrentUser && <span className="post__you">you</span>}
			<span className="post__date">{timeAgo.format(new Date(date))}</span>
		</div>
	);
}
export default Info;
