import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<main className="main">
					<h2 className="main__error">Oops! Somthing went wrong... :(</h2>
				</main>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
