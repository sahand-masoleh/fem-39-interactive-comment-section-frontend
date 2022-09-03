import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";
import Sort from "@components/Sort/Sort";
import Back from "@components/Back/Back";
import Post from "@components/Post/Post";
import More from "@components/More/More";

function PostsContainer() {
	const { data, hasNextPage, fetchNextPage } = useContext(PostsContext);
	const { from } = useParams();

	return (
		<div className="posts-container">
			<Sort />
			{from && <Back />}
			{postMap(data, from)}
			{hasNextPage && <More onClick={fetchNextPage} />}
		</div>
	);
}

export default PostsContainer;

function postMap(data, from) {
	if (!data) return;
	const map = [];
	for (let page of data.pages) {
		const posts = page.rows;
		for (let i = 0; i < posts.length; i++) {
			const post = posts[i];
			map.push(
				<Post
					key={post.id}
					id={post.id}
					parent_id={post.id !== from * 1 ? post.parent_id : null}
					user_id={post.user_id}
					depth={post.depth}
					name={post.name}
					avatar_url={post.avatar_url}
					date={post.date}
					text={post.text}
					votes={post.votes}
					replies={post.replies}
					path={post.path.slice(0, -1)}
					is_up={post.is_up}
				/>
			);
		}
	}

	return map;
}
