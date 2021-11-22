import React from "react";
import { S3_BASE_URL } from "../globalConstants";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useState, useContext, useEffect, useRef } from "react";
import UpdateBotGallery from "./updateBotGallery";
import {
	UPDATE_BOTUPLOADS_TITLE,
	UPDATE_BOTUPLOADS_DESCRIPTION,
} from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
	container: {
		// margin: "20px auto",
		maxWidth: "300px",
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
	},
	subContainer: {
		margin: "20px 20px 10px auto",
		border: "1px solid #aaaaaa",
		borderRadius: 20,
		textAlign: "center",
		padding: "12px",
	},
}));

export default function DisplayImages({ images }) {
	const classes = useStyles();
	const [galleyEdits, setGalleryEdits] = useState({
		id: false,
		title: false,
		description: false,
	});
	const [galleyEditsChange, setGalleryEditsChange] = useState({
		id: false,
		title: false,
		description: false,
	});

	const [updateGalleryTitle] = useMutation(UPDATE_BOTUPLOADS_TITLE);

	const [updateGalleryDescription] = useMutation(
		UPDATE_BOTUPLOADS_DESCRIPTION
	);
	function handleGalleryeEdits(e, id, field) {
		setGalleryEditsChange({
			id: id,
			value: e.target.value,
			field: field,
		});
	}

	function handleGalleryOnBlur(e) {
		e.preventDefault();

		if (galleyEditsChange.id && galleyEditsChange.field === "title") {
			updateGalleryTitle({
				variables: {
					uploadId: galleyEditsChange.id,
					title: galleyEditsChange.value,
				},
			});
			setGalleryEditsChange({
				id: "",
			});
		} else if (
			galleyEditsChange.id &&
			galleyEditsChange.field === "description"
		) {
			updateGalleryDescription({
				variables: {
					uploadId: galleyEditsChange.id,
					description: galleyEditsChange.value,
				},
			});
			setGalleryEditsChange({
				id: "",
			});
		}
	}

	return (
		<div className={classes.container}>
			{images.map(function (image) {
				return (
					<div className={classes.subContainer}>
						<img
							src={S3_BASE_URL + image.node.upload}
							alt="gallery"
							style={{
								width: 200,
								height: 200,
							}}
						/>

						<div>
							<TextField
								variant="outlined"
								id="standard-multiline-flexible"
								multiline
								type="text"
								name="text"
								size="small"
								defaultValue={image.node.title}
								placeholder="title ....."
								className={classes.textInputs}
								onBlur={handleGalleryOnBlur}
								InputProps={{
									style: {
										fontSize: 12,
										fontFamily: "NanumSquare",
										width: 205,
									},
								}}
								onChange={(e) => {
									handleGalleryeEdits(
										e,
										image.node.uploadId,
										"title"
									);
								}}
							/>
							<TextField
								variant="outlined"
								id="standard-multiline-flexible"
								multiline
								type="text"
								name="text"
								size="small"
								defaultValue={image.node.description}
								placeholder="description ....."
								className={classes.textInputs}
								onBlur={handleGalleryOnBlur}
								InputProps={{
									style: {
										fontSize: 12,
										fontFamily: "NanumSquare",
										width: 205,
									},
								}}
								onChange={(e) => {
									handleGalleryeEdits(
										e,
										image.node.uploadId,
										"description"
									);
								}}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
