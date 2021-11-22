import React from "react";
import { API_BASE_URL } from "../globalConstants";
import { useState, useRef, useContext, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function UploadMedia({ addFile, id, uploadType, title }) {
	const [file, setFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const changeHandler = (e) => {
		setFile(e.target.files[0]);
		setIsSelected(true);
	};
	function handleSubmission() {
		addFile({
			file: file,
			id: id,
			uploadType: uploadType,
			title: title,
		});
	}

	return (
		<div>
			<div>
				<input type="file" name="file" onChange={changeHandler} />

				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	);
}

export default UploadMedia;
