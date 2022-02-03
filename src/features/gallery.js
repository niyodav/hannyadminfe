import React from "react";
import { useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";

import { TextField } from "@material-ui/core";
import { CreatedFileContext } from "../contexts/createdFileContext";

function Gallery() {
	const [fileData, setFileData] = useContext(CreatedFileContext);

	const [file, setFile] = useState({
		content: "",
		category: "",
		pk: "",
		uploadType: "",
		title: "",
		description: "",
	});
	const [textChange, setTextChange] = useState({
		title: "",
		description: "",
		url: "",
	});
	function handleTitleChange(e) {
		setTextChange({ ...textChange, title: e.target.value });
	}
	function handleDescriptionChange(e) {
		setTextChange({ ...textChange, description: e.target.value });
	}

	function handleUrlChange(e) {
		setTextChange({ ...textChange, url: e.target.value });
	}

	function handleFiles(e) {
		// addFile({...file,uploadType:'gallery',pk:uuid.v4(),content:e.target.files[0]})
		if (e.target.files[0]) {
			setFileData({
				formData: {
					uploadType: "gallery",
					pk: uuid.v4(),
					content: e.target.files[0],
					title: textChange.title,
					description: textChange.description,
				},
			});
		} else {
			alert("No files ");
		}
	}

	return (
		<div>
			<div
				style={{
					backgroundColor: "#FFF",
					width: 182,
					height: 300,
					borderRadius: 12,
					border: "1px solid #FFF",
					fontSize: 12,
				}}
			>
				<div
					style={{
						width: 182,
						height: 100,
						textAlign: "center",
						paddingTop: 50,
					}}
				>
					<input
						type="file"
						id="upload"
						hidden
						style={{ display: "none", cursor: "pointer" }}
						onChange={handleFiles}
					/>
					<label for="upload" style={{ cursor: "pointer" }}>
						<img src="https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/ic_camera.png" />
					</label>
					<label for="upload" style={{ cursor: "pointer" }}>
						<div>Upload image</div>
					</label>
				</div>
				<div>
					<div>
						<TextField
							variant="outlined"
							id="standard-multiline-flexible"
							type="text"
							placeholder="title"
							InputProps={{
								style: { fontFamily: "NanumSquare" },
							}}
							// className={classes.textInput}
							onChange={handleTitleChange}
						/>
					</div>
					<div>
						<TextField
							variant="outlined"
							id="standard-multiline-flexible"
							type="text"
							placeholder="description"
							// value ={item.name}
							InputProps={{
								style: { fontFamily: "NanumSquare" },
							}}
							// className={classes.textInput}
							onChange={handleDescriptionChange}
						/>
					</div>

					<div>
						{/* <TextField
                            variant="outlined"
                            id="standard-multiline-flexible"
                            type='text'
                            placeholder="url"
                            // value ={item.name}
                            InputProps={{ style: {height:20,marginTop:20} }} 
                            // className={classes.textInput}
                            onChange={handleUrlChange}  
                            // onBlur={handleOnBlur}                 
                            /> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Gallery;
