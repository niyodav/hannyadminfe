import React from "react";
import { useEffect, useCallback, useState, useContext } from "react";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";

import useContextMenu from "./useContextMenu";

const Menu = ({ outerRef, contextKey }) => {
	const [id, setId] = useState(false);

	const { xPos, yPos, menu, row } = useContextMenu(outerRef);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	function handleClick(e, id) {
		if (e.target.innerHTML === "edit") {
			setSelectedMenu({
				...selectedMenu,
				[contextKey]: { id: row, action: e.target.innerHTML },
			});
		} else {
			if (
				e.target.innerHTML === "delete" &&
				window.confirm("삭체 하시겠습니까?")
			) {
				setSelectedMenu({
					...selectedMenu,
					[contextKey]: { id: row, action: e.target.innerHTML },
				});
			}
		}
	}

	if (menu) {
		return (
			<ul className="menu" id={row} style={{ top: yPos, left: xPos }}>
				<li
					onClick={(e) => {
						handleClick(e, row);
					}}
					value="edit"
				>
					edit
				</li>
				<li
					onClick={(e) => {
						handleClick(e, row);
					}}
					value="delete"
				>
					delete
				</li>
				{/* <li
					onClick={(e) => {
						handleClick(e, row);
					}}
					value="copy"
				>
					copy
				</li> */}
			</ul>
		);
	}
	return <></>;
};

export default Menu;
