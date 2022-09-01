import "./App.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import Sort from "@components/Sort/Sort";
import Post from "@components/Post/Post";
import More from "@components/More/More";

function App() {
	const { isLoading, error, data, hasNextPage } = useContext(PostsContext);

	function postsMap() {
		if (!data) return;
		const map = [];
		let parentIds = [];
		for (let page of data.pages) {
			const posts = page.rows;
			for (let i = 0; i < posts.length; i++) {
				const post = posts[i];
				if (post.depth === 0 && !parentIds.includes(post.id))
					parentIds.push(post.id);
				map.push(
					<Post
						key={post.id}
						id={post.id}
						parent_id={post.parent_id}
						user_id={post.user_id}
						depth={post.depth}
						name={post.name}
						avatar_url={post.avatar_url}
						date={post.date}
						text={post.text}
						votes={post.votes}
						replies={post.replies}
						path={post.path.slice(0, -1)}
					/>
				);
			}
		}
		if (hasNextPage) {
			map.push(<More key={parentIds.toString()} />);
		}
		return map;
	}

	return (
		<div className="app">
			<Nav />
			<Outlet />
			{isLoading && <main className="main">loading...</main>}
			{error && <main className="main">error fetching data!</main>}
			{data && (
				<main className="main">
					<Sort />
					{postsMap()}
				</main>
			)}
		</div>
	);
}

export default App;
