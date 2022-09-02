import "./Continue.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "@assets/icon-arrow-right.svg";
import { ReactComponent as ArrowDownIcon } from "@assets/icon-arrow-down.svg";

function Continue({ replies, unhide, id }) {
	if (unhide) {
		return (
			<button className="continue" onClick={unhide}>
				<span className="continue__text">
					{replies} {replies == 1 ? "reply" : "replies"}
				</span>
				<ArrowDownIcon className="continue__icon" />
			</button>
		);
	} else {
		return (
			<Link className="continue" to={`/from/${id}`}>
				<span className="continue__text">
					{replies} {replies == 1 ? "reply" : "replies"}
				</span>
				<ArrowRightIcon className="continue__icon" />
			</Link>
		);
	}
}

export default Continue;
