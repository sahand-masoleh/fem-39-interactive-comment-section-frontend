import "./Nav.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

function Nav() {
	const { user, getAuthLink } = useContext(AuthContext);

	function handleLogin() {
		const link = getAuthLink();
		location.href = link;
	}

	return (
		<div className="nav-container">
			<nav className="nav">
				{!user && (
					<button className="nav__button" onClick={handleLogin}>
						Login via Github
					</button>
				)}
			</nav>
		</div>
	);
}
export default Nav;
