import "./More.scss";
import { useEffect, useRef, useState } from "react";

const TIMEOUT = 5000;

function More({ onClick }) {
	const moreRef = useRef();
	const observer = useRef(new IntersectionObserver(handleVisible));
	const timeoutRef = useRef();
	const [timer, setTimer] = useState(5);
	const intervalRef = useRef();

	useEffect(() => {
		observer.current.observe(moreRef.current);

		return () => {
			!observer.current ?? observer.current.unobserve(moreRef.current);
			clearTimeout(timeoutRef.current);
			clearInterval(intervalRef.current);
		};
	}, []);

	function handleVisible(event) {
		const isVisible = event[0].isIntersecting;
		if (isVisible) {
			timeoutRef.current = setTimeout(() => {
				moreRef.current.click();
				clearInterval(intervalRef.current);
			}, TIMEOUT);
			intervalRef.current = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else {
			clearTimeout(timeoutRef.current);
			clearInterval(intervalRef.current);
			setTimer(5);
		}
	}

	return (
		<div className="more">
			<button className="more__button" onClick={onClick} ref={moreRef}>
				click to load more comments ({timer})
			</button>
		</div>
	);
}

export default More;
