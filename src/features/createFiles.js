import React from "react";
import { useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Gallery from "./gallery";
import { SelectedBlockContext } from "../contexts/selectedBlockContext";
import { CreatedFileContext } from "../contexts/createdFileContext";

const useStyles = makeStyles((theme) => ({
	uploadFile: {
		weight: 40,
		height: 40,
		background: "#FFF",
		padding: 40,
		borderRadius: 15,
	},
}));
const API_BASE =
	"https://gmmhpn143g.execute-api.ap-northeast-2.amazonaws.com/dev/";
// const API_BASE = "http://127.0.0.1:8000";

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
function UploadFiles({ addFile, category, uploadType, blockId }) {
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
	const [fileData, setFileData] = useContext(CreatedFileContext);

	const [showUpload, setShowUpload] = useState(false);
	const [addGallery, setAddGallery] = useState(false);
	const [selectedBlock, setSelectedBlock] = useContext(SelectedBlockContext);

	function handleFiles(e) {
		setFile({
			...file,
			uploadType: uploadType,
			pk: uuid.v4(),
			content: e.target.files[0],
			uploadType: uploadType,
		});

		setFileData({
			formData: {
				uploadType: uploadType,
				pk: uuid.v4(),
				content: e.target.files[0],
				uploadType: uploadType,
			},
		});
	}
	function handleInputChange(e) {}
	function handleOnBlur(e) {}

	return (
		<div>
			<form>
				{/* <div> */}
				{/* <input type="file" className={classes.uploadFile} onChange={(e) => setFile({...file,uploadType:uploadType,pk:uuid.v4(),content:e.target.files[0]})} />  */}

				{/* <input type="button" value="Upload" onClick={handleFiles} /> */}
				{/* </div> */}

				{/* <div style={{  width: 182, height: 100,textAlign: 'center' ,paddingTop:50,}}>
                        <input type="file" id="upload" hidden style={{display:"none",cursor:"pointer"}}  onChange={handleFiles}/>
                        <label for="upload" style={{cursor:"pointer"}} ><img src="https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/ic_camera.png"/></label>
                        <label for="upload" style={{cursor:"pointer"}}><div>Upload image</div></label>
                        
                    </div>   */}

				{uploadType != "gallery" ? (
					<div
						style={{
							backgroundColor: "#FFF",
							cursor: "pointer",
							width: 182,
							height: 182,
							textAlign: "center",
							paddingTop: 40,
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
							<img src="https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/ic_camera.png" />
						</label>
						<label for="upload" style={{ cursor: "pointer" }}>
							Upload {uploadType}
						</label>

						<div>
							<TextField
								variant="outlined"
								id="standard-multiline-flexible"
								type="text"
								placeholder={
									"OR insert " + uploadType + " url here "
								}
								// value ={item.name}
								// onBlur={handleOnBlur}
								InputProps={{
									style: { height: 20, marginTop: 20 },
								}}
								// className={classes.textInput}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				) : (
					<div style={{ display: "flex" }}>
						<div>
							<Gallery />
						</div>

						{/* {
                        !addGallery? 
                        
                        <div style={{ backgroundColor: '#FFF', marginLeft:20, height: 300,width:182, borderRadius:12,postion:"relative", top:"50%",left:"50%" ,border:"1px solid #FFF",cursor:"pointer"}} onClick={(e)=>{setAddGallery(true)}}>
                   
                        <div style={{position:"relative",top:"50%",left:"50%"}}>+</div>
                        </div>
                        :
                        <div style={{marginLeft:20}}>
                            <Gallery/>
                        </div>
                    } */}
					</div>
				)}

				{/* {
                    img&&<div style={{ backgroundColor: '#FFF', width: 182, height: 182, textAlign: 'center' ,padding:10, borderRadius:12,border:"1px solid #FFF",fontSize:12}} >
                        <img src={img} style={{backgroundColor: '#FFF', width: 182, height: 182, textAlign: 'center'}}/>
                    </div>
                } */}
			</form>
		</div>
	);
}
export default UploadFiles;
