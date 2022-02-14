import React, { useState, createContext } from "react";

export const CursorContext = createContext();

export const CursorContextProvider = (props) => {
	const [cursorCategory, setCursorCategory] = useState({
		challenge: false,
		scenerio: false,
		block: false,
		botChat: false,
		users: false,
	});

	return (
		<CursorContext.Provider value={[cursorCategory, setCursorCategory]}>
			{props.children}
		</CursorContext.Provider>
	);
};
