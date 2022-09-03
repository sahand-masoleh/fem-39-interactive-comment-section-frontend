import "./Voting.scss";
import { ReactComponent as PlusButton } from "@assets/icon-plus.svg";
import { ReactComponent as MinusButton } from "@assets/icon-minus.svg";

function Voting({ votes, handleAddVote, handleRemoveVote, is_up }) {
	function handleVote(newVote) {
		if (is_up === newVote) {
			handleRemoveVote();
		} else {
			handleAddVote(newVote);
		}
	}

	return (
		<div className="post__voting voting">
			<Button
				Icon={PlusButton}
				title="upvote"
				onClick={() => handleVote(true)}
				cast={is_up === true}
			/>
			<p className="voting__vote-count">{votes}</p>
			<Button
				Icon={MinusButton}
				title="downvote"
				onClick={() => handleVote(false)}
				cast={is_up === false}
			/>
		</div>
	);
}
export default Voting;

function Button({ Icon, title, onClick, cast }) {
	return (
		<button
			className={`voting__button voting__button${cast ? "--cast" : "--uncast"}`}
			onClick={onClick}
		>
			<Icon title={title} className="voting__icon" />
		</button>
	);
}
