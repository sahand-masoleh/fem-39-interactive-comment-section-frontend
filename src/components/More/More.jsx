import "./More.scss";

function More({ onClick }) {
	return (
		<div className="more">
			<button className="more__button" onClick={onClick}>
				click to load more comments...
			</button>
		</div>
	);
}

export default More;
