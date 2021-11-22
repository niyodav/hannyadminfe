import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
	UPDATE_RESPONSE,
	UPDATE_RESPONSE_ACTION,
	UPDATE_RESPONSE_REDIRECTS,
	DELETE_RESPONSES,
} from "../graphql/mutations";

function UpdateReply({ addUpdated, responseId, response, redirect, action }) {
	const [textChange, setTextChange] = useState({
		content: "",
		category: "",
		response: "",
		redirect: "",
		action: "",
		actionChanged: false,
		redirectChanged: false,
	});

	const [updateResponse] = useMutation(UPDATE_RESPONSE);
	const [updateResponseAction] = useMutation(UPDATE_RESPONSE_ACTION);
	const [updateResponseRedirect] = useMutation(UPDATE_RESPONSE_REDIRECTS);
	const [deleteResponse] = useMutation(DELETE_RESPONSES);

	function handleInputChange(e, field) {
		if (field === "response") {
			setTextChange({ ...textChange, response: e.target.value });
		} else if (field === "action") {
			setTextChange({
				...textChange,
				action: e.target.value,
				actionChanged: true,
			});
		} else if (field === "redirect") {
			setTextChange({
				...textChange,
				redirect: e.target.value,
				redirectChanged: true,
			});
		}
	}
	function handleOnBlur(e) {
		e.preventDefault();
		if (textChange.response.trim()) {
			if (responseId) {
				updateResponse({
					variables: {
						responseId: responseId,
						response: textChange.response,
					},
				});

				setTextChange({ ...textChange, response: "" });
			}
		} else if (textChange.action.trim()) {
			if (responseId) {
				updateResponseAction({
					variables: {
						responseId: responseId,
						action: textChange.action,
					},
				});

				setTextChange({ ...textChange, action: "" });
			}
		} else if (textChange.redirect.trim()) {
			if (responseId) {
				updateResponseRedirect({
					variables: {
						responseId: responseId,
						redirect: textChange.redirect,
					},
				});
			}
			setTextChange({ ...textChange, redirect: "" });
		}

		if (!textChange.action.trim() && textChange.actionChanged) {
			if (responseId) {
				updateResponseAction({
					variables: {
						responseId: responseId,
						action: textChange.action,
					},
				});

				setTextChange({
					...textChange,
					action: "",
					actionChanged: false,
				});
			}
		} else if (!textChange.redirect.trim() && textChange.redirectChanged) {
			if (responseId) {
				updateResponseRedirect({
					variables: {
						responseId: responseId,
						redirect: textChange.redirect,
					},
				});
			}
			setTextChange({
				...textChange,
				redirect: "",
				redirectChanged: false,
			});
		}
	}
	return (
		<div>
			<img
				src={require("../images/delete-icon.jpeg")}
				alt="gallery"
				style={{
					width: 20,
					height: 20,
				}}
				onClick={() =>
					deleteResponse({
						variables: {
							responseId: [responseId],
						},
					})
				}
			/>

			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "flex-end",
				}}
			>
				<TextField
					variant="outlined"
					id="standard-multiline-flexible"
					multiline
					type="text"
					name="text"
					size="small"
					onBlur={handleOnBlur}
					defaultValue={response}
					InputProps={{
						style: {
							fontSize: 12,
							fontFamily: "NanumSquare",
							width: 100,
						},
					}}
					style={{ background: "#FFF" }}
					onChange={(e) => {
						handleInputChange(e, "response");
					}}
				/>
			</div>

			<div>
				<TextField
					variant="outlined"
					id="standard-multiline-flexible"
					multiline
					type="text"
					name="text"
					size="small"
					defaultValue={redirect ? redirect : "블록 이동 입력..."}
					InputProps={{
						style: {
							fontSize: 12,
							fontFamily: "NanumSquare",
							width: 100,
						},
					}}
					onBlur={handleOnBlur}
					style={{ background: "#FFF" }}
					onChange={(e) => {
						handleInputChange(e, "redirect");
					}}
				/>
			</div>
			<div>
				<TextField
					variant="outlined"
					id="standard-multiline-flexible"
					multiline
					type="text"
					name="text"
					size="small"
					defaultValue={action ? action : "기능 입력...."}
					onBlur={handleOnBlur}
					InputProps={{
						style: {
							fontSize: 12,
							fontFamily: "NanumSquare",
							width: 100,
						},
					}}
					style={{ background: "#FFF" }}
					onChange={(e) => {
						handleInputChange(e, "action");
					}}
				/>
			</div>
		</div>
	);
}
export default UpdateReply;
