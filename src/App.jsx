import "./App.scss";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import Post from "@components/Post/Post";

function App() {
	const { isLoading, error, posts } = useContext(PostsContext);

	function postsMap() {
		const map = posts.map((post) => (
			<Post
				key={post.id}
				id={post.id}
				parent_id={post.parent_id}
				depth={post.depth}
				name={post.name}
				date={post.date}
				text={post.text}
				votes={post.votes}
				replies={post.replies}
				path={post.path.slice(0, -1)}
			/>
		));
		return map;
	}

	return (
		<div className="app">
			<Nav />
			{isLoading && <main className="main">loading...</main>}
			{error && <main className="main">error fetching data!</main>}
			{posts && <main className="main">{postsMap()}</main>}
		</div>
	);
}

export default App;
