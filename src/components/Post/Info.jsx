import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function Info({ user_id, name, avatarUrl, date, isCurrentUser }) {
	return (
		<div className="post__info">
			<div className="post__avatar image">
				<img
					src={avatarUrl || "https://source.unsplash.com/random/64x64/?face"}
					alt={`${name}'s avatar`}
					className="image__img"
				/>
			</div>
			<span className="post__name">{name}</span>
			{isCurrentUser && <span className="post__you">you</span>}
			<span className="post__date">{timeAgo.format(new Date(date))}</span>
		</div>
	);
}
export default Info;
