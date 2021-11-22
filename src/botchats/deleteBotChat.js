import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_BOT_CHATS } from "../graphql/mutations";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import { useState, useEffect, useContext } from "react";

function DeleteBotChat({ data }) {
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const [deleteBotchat] = useMutation(DELETE_BOT_CHATS);

	useEffect(() => {
		if (data) {
			deleteBotchat({ variables: { botChatId: data.botChatId } });
			window.location.reload(false);
		}
		// return () =>{
		//     setSelectedMenu({...selectedMenu,block:{id:false,action:'edit'}})

		// }
	}, [selectedMenu.botChat.id]);

	return null;
}
export default DeleteBotChat;
