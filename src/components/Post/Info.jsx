import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function Info({ name, date }) {
	return (
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
	);
}
export default Info;
