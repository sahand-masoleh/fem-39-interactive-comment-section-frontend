import "./Nav.scss";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

import { ReactComponent as GithubLogo } from "@assets/logo-github.svg";
import { ReactComponent as LogoutIcon } from "@assets/icon-logout.svg";

function Nav() {
	const { getAuthLink, user, status, logout } = useContext(AuthContext);

	return (
		<div className="nav-wrapper">
			<nav className="nav">
				<GithubLogo
					title="Github"
					className="nav__avatar nav__avatar--loading"
				/>

				{user ? (
					<>
						<span className="nav__text">{user.name}</span>
						<button
							className="nav__button"
							onClick={logout}
							aria-label="logout"
						>
							<LogoutIcon title="logout" />
						</button>
					</>
				) : status === "loading" ? (
					<a href={getAuthLink()} className="nav__text">
						Checking...
					</a>
				) : user === null ? (
					<a href={getAuthLink()} className="nav__text nav__text--link">
						Login via Github
					</a>
				) : null}
			</nav>
		</div>
	);
}
export default Nav;
