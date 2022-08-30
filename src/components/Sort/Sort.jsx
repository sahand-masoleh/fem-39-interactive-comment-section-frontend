import "./Sort.scss";

import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PostsContext, OPTS } from "@contexts/PostsContext";

function Sort({ onChange }) {
	const { params, setParams } = useContext(PostsContext);
	const [searchParams, setSearchParams] = useSearchParams();
	const [sort_by, setSort_by] = useState(
		searchParams.get("sort_by") ?? params.sort_by
	);
	const [order, setOrder] = useState(searchParams.get("order") ?? params.order);

	useEffect(() => {
		setSearchParams({ sort_by: sort_by, order });
	}, [sort_by, order]);

	useEffect(() => {
		setParams((prev) => ({ ...prev, sort_by, order }));
	}, [searchParams]);

	function handleSort_by(value) {
		setSort_by(value);
	}
	function handleOrder(value) {
		setOrder(value);
	}

	return (
		<div className="sort">
			<span className="sort__text">order by</span>
			<span className="sort__text">&#91;</span>
			<button
				className={`sort__button ${
					sort_by === OPTS.DATE
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleSort_by(OPTS.DATE)}
			>
				date
			</button>
			<button
				className={`sort__button ${
					sort_by === OPTS.SCORE
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
					order === OPTS.ASC
						? "sort__button--selected"
						: "sort__button--unselected"
				}`}
				onClick={() => handleOrder(OPTS.ASC)}
			>
				asc.
			</button>
			<button
				className={`sort__button ${
					order === OPTS.DESC
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
