import "./App.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import PostsContainer from "@components/Post/PostsContainer";

function App() {
	const { isLoading, error, data } = useContext(PostsContext);

	return (
		<div className="app">
			<Nav />
			<Outlet />
			<main className="main">
				{isLoading && <h2>loading...</h2>}
				{error && <h2>error fetching data!</h2>}
				{data && <PostsContainer />}
			</main>
		</div>
	);
}

export default App;
