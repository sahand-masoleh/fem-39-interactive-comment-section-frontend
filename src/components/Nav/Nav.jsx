import "./Nav.scss";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { ReactComponent as GithubLogo } from "@assets/logo-github.svg";

function Nav() {
	const { getAuthLink, user, status } = useContext(AuthContext);

	function renderElement() {
		if (status === "loading") {
			return (
				<>
					<GithubLogo
						title="Github"
						className="nav__avatar nav__avatar--loading"
					/>
					<a href={getAuthLink()} className="nav__text">
						Checking...
					</a>
				</>
			);
		} else if (user) {
			return (
				<>
					<div className="nav__avatar nav__avatar--round image">
						<img
							className="image__img"
							src={user.avatar_url}
							alt="user's avatar"
						/>
					</div>
					<span className="nav__text">{user.name}</span>
				</>
			);
		} else {
			return (
				<>
					<GithubLogo title="Github" className="nav__avatar" />
					<a href={getAuthLink()} className="nav__text">
						Login via Github
					</a>
				</>
			);
		}
	}

	return (
		<div className="nav-container">
			<nav className="nav">{renderElement()}</nav>
		</div>
	);
}
export default Nav;
