import "./Nav.scss";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { ReactComponent as GithubLogo } from "@assets/logo-github.svg";

function Nav() {
	const { getAuthLink, user, status } = useContext(AuthContext);

	return (
		<div className="nav-wrapper">
			<nav className="nav">
				<GithubLogo
					title="Github"
					className="nav__avatar nav__avatar--loading"
				/>

				{user ? (
					<span className="nav__text">{user.name}</span>
				) : status === "loading" ? (
					<a href={getAuthLink()} className="nav__text">
						Checking...
					</a>
				) : user === null ? (
					<a href={getAuthLink()} className="nav__text">
						Login via Github
					</a>
				) : null}
			</nav>
		</div>
	);
}
export default Nav;
