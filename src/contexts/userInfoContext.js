import React, { useState, createContext } from "react";

export const UserInfoContext = createContext();
export const UserInfoContextProvider = (props) => {
	const [userInfo, setUserInfo] = useState({
		challengeGroup: false,
		challenge: false,
		scenerio: false,
		block: false,
		botChat: false,
	});
	return (
		<UserInfoContext.Provider
			value={[deleteIdsCategory, setDeleteIdsCategory]}
		>
			{props.children}
		</UserInfoContext.Provider>
	);
};
