import "./App.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import Sort from "@components/Sort/Sort";
import PostsContainer from "@components/Post/PostsContainer";

function App() {
	const { isLoading, error, data } = useContext(PostsContext);

	return (
		<div className="app">
			<Nav />
			<Outlet />
			{isLoading && <main className="main">loading...</main>}
			{error && <main className="main">error fetching data!</main>}
			{data && (
				<main className="main">
					<Sort />
					<PostsContainer />
				</main>
			)}
		</div>
	);
}

export default App;
