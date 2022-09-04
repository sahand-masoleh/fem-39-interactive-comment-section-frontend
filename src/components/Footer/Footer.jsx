import "./Footer.scss";

import { ReactComponent as LinkedInLogo } from "@assets/logo-linkedin.svg";
import { ReactComponent as TwitterLogo } from "@assets/logo-twitter.svg";
import { ReactComponent as GithubLogo } from "@assets/logo-github.svg";

function Footer() {
	return (
		<div className="footer-wrapper">
			<footer className="footer">
				<span className="footer__attribution">
					Challenge by{" "}
					<a
						href="https://www.frontendmentor.io"
						className="footer__link"
						target="_blank"
					>
						Frontend Mentor
					</a>
					. Coded by{" "}
					<a
						href="https://www.frontendmentor.io/profile/sahand-masoleh"
						className="footer__link"
						target="_blank"
					>
						Sahand Masoleh.
					</a>
				</span>
				<div className="footer__socials">
					<a
						href="https://www.linkedin.com/in/sahand-masoleh-220045244/"
						target="_blank"
					>
						<LinkedInLogo className="footer__icon" title="LinkedIn" />
					</a>
					<a href="https://twitter.com/SahandMasoleh" target="_blank">
						<TwitterLogo className="footer__icon" title="Twitter" />
					</a>
					<a href="https://github.com/sahand-masoleh" target="_blank">
						<GithubLogo className="footer__icon" title="Github" />
					</a>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
