import React, { useState, createContext } from "react";

export const TableSortContext = createContext(false);

export const TableSortProvider = (props) => {
	const [sortBy, setSortBy] = useState({
		sortBy: "-idx",
	});

	return (
		<TableSortContext.Provider value={[sortBy, setSortBy]}>
			{props.children}
		</TableSortContext.Provider>
	);
};
