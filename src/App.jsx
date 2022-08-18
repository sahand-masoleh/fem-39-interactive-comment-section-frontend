import "./App.scss";

import { useState } from "react";
import { useQuery } from "react-query";

import Post from "./components/Post";

function App() {
	const [postsMap, setPostsMap] = useState();

	const { isLoading, error, isSuccess } = useQuery("repoData", async () => {
		let res = await fetch("http://localhost:4000/posts");
		res = await res.json();
		handleData(res);
	});

	function handleData(posts) {
		const map = posts.map((post) => (
			<Post
				key={post.id}
				id={post.id}
				depth={post.depth}
				name={post.name}
				date={post.date}
				text={post.text}
				votes={post.votes}
			/>
		));
		setPostsMap(map);
	}

	if (isLoading) return <p>loading...</p>;

	if (error) return <p>error fetching data!</p>;

	if (isSuccess) return <div className="app">{postsMap}</div>;
}

export default App;
