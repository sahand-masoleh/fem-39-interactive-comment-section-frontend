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
			<Button
				selected={params.sort_by === OPTS.DATE}
				onClick={() => handleSort_by(OPTS.DATE)}
			>
				date
			</Button>
			<Button
				selected={params.sort_by === OPTS.SCORE}
				onClick={() => handleSort_by(OPTS.SCORE)}
			>
				score
			</Button>
			<span className="sort__text">|</span>
			<Button
				selected={params.order === OPTS.ASC}
				onClick={() => handleOrder(OPTS.ASC)}
			>
				asc.
			</Button>
			<Button
				selected={params.order === OPTS.DESC}
				onClick={() => handleOrder(OPTS.DESC)}
			>
				desc.
			</Button>
			<span className="sort__text">&#93;</span>
		</div>
	);
}

export default Sort;

function Button({ selected, onClick, children }) {
	return (
		<button
			className={`sort__button ${
				selected ? "sort__button--selected" : "sort__button--unselected"
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
