import { createContext, useState, useRef } from "react";
import Toast from "@components/Toast/Toast";

export const ToastContext = createContext();

const TOAST_DURATION = 4750;

export const TOAST_MESSAGE = {
	NOT_LOGGED_IN: "Please log in first",
};

export function ToastContextProvider({ children }) {
	const [message, setMessage] = useState("");
	const [disapearing, setDisapearing] = useState(false);
	const timeoutRef = useRef();

	function showToast(text) {
		setMessage(text);
		timeoutRef.current = setTimeout(() => {
			setDisapearing(true);
		}, TOAST_DURATION);
	}

	function hideToast() {
		setDisapearing(true);
	}

	function onAnimationEnd({ animationName }) {
		if (animationName === "disapear") {
			clearTimeout(timeoutRef.current);
			setMessage("");
			setDisapearing(false);
		}
	}

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{message && (
				<div onClick={hideToast}>
					<Toast
						message={message}
						disapearing={disapearing}
						onAnimationEnd={onAnimationEnd}
					/>
				</div>
			)}
		</ToastContext.Provider>
	);
}
