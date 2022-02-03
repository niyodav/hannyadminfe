import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import { v1 as uuid } from "uuid";

import { CreatedtextContext } from "../contexts/createdTextContext";

function CreateText({ addText, category, label, replyFk }) {
	const [textChange, setTextChange] = useState({
		content: "",
		category: "",
		pk: "",
	});

	const [text, setText] = useContext(CreatedtextContext);
	useEffect(() => {}, [text.reply]);

	function handleInputChange(e) {
		setTextChange({ ...textChange, content: e.target.value });
	}

	function handleOnBlur(e) {
		e.preventDefault();
		if (textChange.content.trim()) {
			if (replyFk) {
				setText({
					...text,
					reply: {
						content: textChange.content,
						pk: uuid.v4(),
						fk: replyFk,
					},
				});

				setTextChange({ ...textChange, pk: "", content: "" });
			} else {
				setText({
					...text,
					content: textChange.content,
					pk: uuid.v4(),
					category: category,
				});

				setTextChange({ ...textChange, pk: "", content: "" });
			}
		}
	}
	return (
		<div>
			<TextField
				variant="outlined"
				id="standard-multiline-flexible"
				multiline
				type="text"
				name="text"
				label={label}
				value={textChange.content}
				onBlur={handleOnBlur}
				style={{ background: "#FFF" }}
				onChange={handleInputChange}
			/>
		</div>
	);
}
export default CreateText;
