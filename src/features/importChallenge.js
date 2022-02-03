import React from "react";
import { useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	uploadFile: {
		weight: 40,
		height: 40,
		background: "#FFF",
		padding: 40,
		borderRadius: 15,
	},
}));
// const API_BASE = "https://gmmhpn143g.execute-api.ap-northeast-2.amazonaws.com/dev/";
const API_BASE = "http://127.0.0.1:8000";

function submitForm(contentType, data, setResponse) {
	axios({
		url: `${API_BASE}/api/v1/botchats/upload/`,
		method: "POST",
		data: data,
		headers: {
			"Content-Type": contentType,
		},
	})
		.then((response) => {
			setResponse(response.data);
		})
		.catch((error) => {
			setResponse("error");
		});
}
function ImportChallenge({ addFile, category, uploadType, challengeId }) {
	const classes = useStyles();
	const [img, setImg] = useState(false);

	const [file, setFile] = useState({
		content: "",
		category: "",
		pk: "",
		uploadType: "",
		title: "",
		description: "",
	});
	const [textChange, setTextChange] = useState(false);
	// const [fileData , setFileData] = useContext(CreatedFileContext);

	const [showUpload, setShowUpload] = useState(false);
	const [addGallery, setAddGallery] = useState(false);
	// const [selectedBlock , setSelectedBlock] = useContext(SelectedBlockContext);

	function handleFiles(e) {
		setFile({
			...file,
			uploadType: uploadType,
			pk: uuid.v4(),
			content: e.target.files[0],
			uploadType: uploadType,
		});

		// setFileData({formData:{uploadType:uploadType,pk:uuid.v4()
		//     ,content:e.target.files[0],uploadType:uploadType}})
	}
	function handleInputChange(e) {}
	function handleOnBlur(e) {}
	if (file.content) {
		const formData = new FormData();

		formData.append("upload", file.content);
		formData.append("uploadId", file.pk);
		formData.append("uploadType", String("file"));
		formData.append("challengeId", challengeId);

		if (uploadType === "gallery" && textChange) {
			formData.append("title", String(textChange.title));
			formData.append("description", String(textChange.description));
			formData.append("url", String(textChange.url));
		}

		submitForm("multipart/form-data", formData, (msg) => {
			console.log(msg);
		});
	}

	return (
		<div>
			<form>
				<div
					style={{
						backgroundColor: "#ff8000",
						cursor: "poi nter",
						width: 100,
						height: 40,
						paddingTop: 20,
						textAlign: "center",
						borderRadius: 12,
						border: "1px solid #FFF",
						fontSize: 12,
						display: img ? "none" : "block",
					}}
					onClick={(e) => {
						setShowUpload("block");
					}}
				>
					<input
						type="file"
						id="upload"
						hidden
						style={{ display: "none" }}
						onChange={handleFiles}
					/>
					<label for="upload" style={{ cursor: "pointer" }}>
						Import Challenge
					</label>
					<div></div>
				</div>
			</form>
		</div>
	);
}
export default ImportChallenge;
