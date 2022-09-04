import { useRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

import { ReactComponent as PersonIcon } from "@assets/icon-person.svg";

function Info({ name, avatarUrl, url, date, isCurrentUser }) {
	const aRef = useRef();
	function handleClick() {
		aRef.current.click();
	}

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
			<span
				className={`post__name ${url ? "post__name--link" : ""}`}
				onClick={url && handleClick}
				role={url && "link"}
				tabIndex={url && 0}
			>
				{name}
			</span>
			{isCurrentUser && <span className="post__you">you</span>}
			<span className="post__date">{timeAgo.format(new Date(date))}</span>
			<a href={url} ref={aRef} target="_blank" hidden></a>
		</div>
	);
}
export default Info;
