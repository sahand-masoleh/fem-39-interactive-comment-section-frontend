import { createContext, useRef, useState } from "react";

import Modal from "@components/Modal/Modal";

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
	const [isShowing, setIsShowing] = useState(false);

	const acceptRef = useRef();
	const refuseRef = useRef();

	function getCofirmation() {
		setIsShowing(true);
		document.querySelector("body").style.overflow = "hidden";

		const request = new Promise((resolve, reject) => {
			acceptRef.current = resolve;
			refuseRef.current = reject;
		});

		return request;
	}

	function accept() {
		acceptRef.current();
		setIsShowing(false);
		document.querySelector("body").style.overflow = "unset";
	}

	function refuse() {
		refuseRef.current();
		setIsShowing(false);
		document.querySelector("body").style.overflow = "unset";
	}

	return (
		<ModalContext.Provider value={getCofirmation}>
			{children}
			{isShowing && <Modal accept={accept} refuse={refuse} />}
		</ModalContext.Provider>
	);
}
