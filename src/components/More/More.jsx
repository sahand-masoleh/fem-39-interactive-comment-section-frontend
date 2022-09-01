import "./More.scss";
import { useContext } from "react";
import { PostsContext } from "@contexts/PostsContext";

function More() {
	const { fetchNextPage } = useContext(PostsContext);

	return (
		<div className="more">
			<button className="more__text" onClick={fetchNextPage}>
				click to load more comments...
			</button>
		</div>
	);
}

export default More;
