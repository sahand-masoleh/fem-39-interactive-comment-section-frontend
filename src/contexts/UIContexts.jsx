import { createContext, useState } from "react";

export const HiddenContext = createContext();

export function HiddenContextProvider({ children }) {
	const [hidden, setHidden] = useState([]);

	function handleHide(parentId, bool) {
		if (bool) {
			setHidden((prevHidden) => [...prevHidden, parentId]);
		} else {
			setHidden((prevHidden) => {
				return prevHidden.filter((e) => e !== parentId);
			});
		}
	}

	return (
		<HiddenContext.Provider value={{ hidden, handleHide }}>
			{children}
		</HiddenContext.Provider>
	);
}

export const HoveredContext = createContext();

export function HoveredContextProvider({ children }) {
	const [hovered, setHovered] = useState(null);

	function handleHover(parentId, bool) {
		if (bool) {
			setHovered(parentId);
		} else {
			setHovered(null);
		}
	}

	return (
		<HoveredContext.Provider value={{ hovered, handleHover }}>
			{children}
		</HoveredContext.Provider>
	);
}

export const FocusedContext = createContext();

export function FocusedContextProvider({ children }) {
	const [focused, setFocused] = useState(null);

	function handleFocus(parentId) {
		if (parentId) {
			setFocused(parentId);
		} else {
			setFocused(null);
		}
	}
	return (
		<FocusedContext.Provider value={{ focused, handleFocus }}>
			{children}
		</FocusedContext.Provider>
	);
}

export const ClosingContext = createContext();

export function ClosingContextProvider({ children }) {
	const [closing, setClosing] = useState(false);

	function handleClose(parentId) {
		if (parentId) {
			setClosing(parentId);
		} else {
			setClosing(null);
		}
	}
	return (
		<ClosingContext.Provider value={{ closing, handleClose }}>
			{children}
		</ClosingContext.Provider>
	);
}
