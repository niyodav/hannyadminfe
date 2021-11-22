import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TS_BLOCK } from "../graphql/mutations";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import { useState, useEffect, useContext } from "react";

function DeleteBlock({ data }) {
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const [deleteTsBlock] = useMutation(DELETE_TS_BLOCK);

	useEffect(() => {
		if (data) {
			deleteTsBlock({ variables: { blockId: data.blockId } });
			window.location.reload(false);
		}
		// return () =>{
		//     setSelectedMenu({...selectedMenu,block:{id:false,action:'edit'}})

		// }
	}, [selectedMenu.block.id]);

	return null;
}
export default DeleteBlock;
