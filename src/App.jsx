import "./App.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import Reply from "@components/Reply/Reply";
import PostsContainer from "@components/Post/PostsContainer";

function App() {
	const { isLoading, error, data, reply } = useContext(PostsContext);
	const { from } = useParams();

	return (
		<div className="app">
			<Nav />
			<main className="main">
				{!from && <Reply handleReplyOrphan={reply} orphan />}
				{isLoading && <h2>loading...</h2>}
				{error && <h2>error fetching data!</h2>}
				{data && <PostsContainer />}
			</main>
			<Outlet />
		</div>
	);
}

export default App;
