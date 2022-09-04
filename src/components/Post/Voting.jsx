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
				label="upvote"
				onClick={() => handleVote(true)}
				cast={is_up === true}
			/>
			<p
				className={`
			voting__vote-count
			 ${
					votes > 0
						? "voting__vote-count--positive"
						: votes < 0
						? "voting__vote-count--negative"
						: "voting__vote-count--zero"
				}
			`}
			>
				{votes}
			</p>
			<Button
				Icon={MinusButton}
				label="downvote"
				onClick={() => handleVote(false)}
				cast={is_up === false}
			/>
		</div>
	);
}
export default Voting;

function Button({ Icon, label, onClick, cast }) {
	return (
		<button
			className={`voting__button voting__button${
				!cast
					? "--uncast"
					: label === "upvote"
					? "--upvote"
					: label === "downvote"
					? "--downvote"
					: ""
			}`}
			onClick={onClick}
			aria-label={label}
		>
			<Icon title={label} className="voting__icon" />
		</button>
	);
}
