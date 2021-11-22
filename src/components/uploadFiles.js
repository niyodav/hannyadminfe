import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API_BASE_URL } from "../globalConstants";

function UploadBotChatImages({ Botchatd }) {
	const changeHandler = (e) => {
		setFile(e.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();
		formData.append("botChatId", Botchatd);
		formData.append("upload", file);

		console.log(file);
		axios
			.post(API_BASE_URL + "api/v1/botchats/upload/", formData)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	};

	const [file, setFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {file.name}</p>
					<p>Filetype: {file.type}</p>
					<p>Size in bytes: {file.size}</p>
					<p>
						lastModifiedDate:{" "}
						{file.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	);
}

export default UploadBotChatImages;
