import "./Back.scss";

import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "@assets/icon-arrow-left.svg";

function Back() {
	return (
		<Link className="back" to="../">
			<ArrowLeftIcon className="back__icon" />
			<span className="back__text">show all comments</span>
		</Link>
	);
}

export default Back;
