function Action({ name, Icon, onClick, isSecondary = false }) {
	return (
		<button
			className={`post__action action action--${
				!isSecondary ? "primary" : "secondary"
			}`}
			onClick={onClick}
		>
			<Icon title={name} className="action__icon" />
			<p className="action__label">{name}</p>
		</button>
	);
}

export default Action;
