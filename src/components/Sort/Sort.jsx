import "./Sort.scss";

import { useContext } from "react";
import { PostsContext, OPTS } from "@contexts/PostsContext";

function Sort() {
	const { params, setSearchParams } = useContext(PostsContext);

	function handleSort_by(value) {
		setSearchParams({ sort_by: value, order: params.order });
	}
	function handleOrder(value) {
		setSearchParams({ sort_by: params.sort_by, order: value });
	}

	return (
		<div className="sort">
			<span className="sort__text">order by</span>
			<span className="sort__text">&#91;</span>
			<button
				className={`sort__button ${
					params.sort_by === OPTS.DATE
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleSort_by(OPTS.DATE)}
			>
				date
			</button>
			<button
				className={`sort__button ${
					params.sort_by === OPTS.SCORE
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleSort_by(OPTS.SCORE)}
			>
				score
			</button>
			<span className="sort__text">|</span>
			<button
				className={`sort__button ${
					params.order === OPTS.ASC
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleOrder(OPTS.ASC)}
			>
				asc.
			</button>
			<button
				className={`sort__button ${
					params.order === OPTS.DESC
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleOrder(OPTS.DESC)}
			>
				desc.
			</button>
			<span className="sort__text">&#93;</span>
		</div>
	);
}

export default Sort;
