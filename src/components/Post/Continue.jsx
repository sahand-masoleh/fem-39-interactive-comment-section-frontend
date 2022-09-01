import { Link } from "react-router-dom";

function More({ onClick }) {
	return (
		<div className="continue">
			<Link to={"#"}>click to load more comments...</Link>
		</div>
	);
}

export default More;
