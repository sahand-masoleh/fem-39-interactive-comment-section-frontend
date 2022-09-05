import "./Article.scss";
import { ReactComponent as OpenIcon } from "@assets/icon-open.svg";

function Article() {
	return (
		<article className="article">
			<h1 className="article__title article__title--primary">
				Project Interactive Comment Section
			</h1>
			<p className="article__text">Hello world!</p>
			<p className="article__text">
				This is my solution to the{" "}
				<a
					href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9/hub/interactive-comments-section-CnRm2ZaEuO"
					className="article__link"
				>
					"Interactive Comment Section"
				</a>{" "}
				challenge from{" "}
				<a
					href="https://www.frontendmentor.io/"
					className="article__link"
					target="_blank"
				>
					frontendmentor.io
				</a>
				, a full-stack, CRUD web-app. The aim was to have a comment section
				resembling Reddit's in which anyone can post a comment which can be
				upvoted, downvoted, edited, deleted, and most importantly, replied to.
			</p>
			<h2 className="article__title article__title--secondary">
				Additional features
			</h2>

			<ul className="article__list list">
				<li className="list__item">
					<h3 className="list__title">A tree structure:</h3>
					<p className="list__text">Comments can be nested indefinitely</p>
				</li>
				<li className="list__item">
					<h3 className="list__title">Sorting:</h3>
					<p className="list__text">
						Based on date or score, ascending or descending.
					</p>
				</li>
				<li className="list__item">
					<h3 className="list__title">Pagination:</h3>
					<p className="list__text">
						Data is queried gradually from the database.
					</p>
				</li>
				<li className="list__item">
					<h3 className="list__title">Authentication:</h3>
					<p className="list__text">Using Github's Auth0.</p>
				</li>
			</ul>

			<h2 className="article__title article__title--secondary">
				The technology stack
			</h2>
			<ul className="article__list list">
				<li className="list__item">
					<h3 className="list__title">
						Frontend{" "}
						<a
							href="https://github.com/sahand-masoleh/fem-39-interactive-comment-section-frontend"
							target="_blank"
						>
							<OpenIcon className="list__link" title="Github repo" />
						</a>
						:
					</h3>
					<p className="list__text">
						ReactJS with React Query and React Router, SASS
					</p>
				</li>
				<li className="list__item">
					<h3 className="list__title">
						Backend{" "}
						<a
							href="https://github.com/sahand-masoleh/fem-39-interactive-comment-section-backend"
							target="_blank"
						>
							<OpenIcon className="list__link" title="Github repo" />
						</a>
						:
					</h3>
					<p className="list__text">NodeJS with ExpressJS, PostgreSQL</p>
				</li>
			</ul>

			<p className="article__text">
				Feel free to leave a comment below, and if you are interested, you can
				also check out my other projects on{" "}
				<a
					href="https://www.frontendmentor.io/profile/sahand-masoleh"
					className="article__link"
					target="_blank"
				>
					Frontend Mentor.
				</a>
			</p>

			<details>
				<summary className="article__title article__title--tertiary">
					Disclaimer
				</summary>
				<p className="article__text article__text--small">
					To have some mock posts to show the functionality of the app with, I
					used some quotes from famous people and randomly assigned parent-child
					relations, votes, and dates to them. These people have not used this
					app to post a comment and/or vote on each other's posts, and I am
					confident that most of them do not use Github and therefore cannot
					even log in.
				</p>
			</details>

			<hr className="article__divider" />

			<div className="article__info info">
				<span className="article__text article__text--small">Sep. 2022</span>
				<a
					href="https://github.com/sahand-masoleh"
					target="_blank"
					className="article__link"
				>
					Sahand Masoleh
				</a>
			</div>
		</article>
	);
}

export default Article;
