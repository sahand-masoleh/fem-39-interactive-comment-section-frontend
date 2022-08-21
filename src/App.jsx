import "./App.scss";

import { useContext } from "react";

import { PostsContext } from "@contexts/PostsContext";

import Post from "@components/Post/Post";

function App() {
	const { isLoading, error, posts } = useContext(PostsContext);

	function postsMap() {
		const map = posts.map((post) => <Post key={post.id} data={post} />);
		return map;
	}

	return (
		<div className="app">
			{isLoading && <p>loading...</p>}

			{error && <p>error fetching data!</p>}

			{posts && <main className="main">{postsMap()}</main>}
		</div>
	);
}

export default App;
