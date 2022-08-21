import { ReactComponent as PlusButton } from "@assets/icon-plus.svg";
import { ReactComponent as MinusButton } from "@assets/icon-minus.svg";

function Voting({ votes }) {
	return (
		<div className="post__voting voting">
			<button className="voting__button voting__button--uncast">
				<PlusButton title="upvote" className="voting__icon" />
			</button>
			<p className="voting__vote-count">{votes}</p>
			<button className="voting__button voting__button--uncast">
				<MinusButton title="downvote" className="voting__icon" />
			</button>
		</div>
	);
}
export default Voting;
