import "./App.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PostsContext } from "@contexts/PostsContext";

import Nav from "@components/Nav/Nav";
import Article from "@components/Article/Article";
import Reply from "@components/Reply/Reply";
import Sort from "@components/Sort/Sort";
import PostsContainer from "@components/Post/PostsContainer";
import Loading from "@components/Loading/Loading";
import Footer from "@components/Footer/Footer";

function App() {
	const { isLoading, error, data, reply } = useContext(PostsContext);
	const { from } = useParams();

	return (
		<div className="app">
			<Nav />
			<main className="main">
				{!from && <Article />}
				{!from && <Reply handleReplyOrphan={reply} orphan />}
				<Sort />
				{isLoading && <Loading />}
				{data && <PostsContainer />}
				{error && (
					<h2 className="main__error">could not connect to the server :(</h2>
				)}
			</main>
			<Footer />
			<Outlet />
		</div>
	);
}

export default App;
