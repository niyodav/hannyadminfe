import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BOTCHATS_RESPONSES } from "./graphql/queries";
import {
	CREATE_RESPONSES,
	CREATE_BOT_CHATS,
	UPDATE_BOT_CHATS,
} from "./graphql/mutations";
import Select from "react-select";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import CreateBotChat from "./createBotChat";
import CreateReply from "./createReply";
import CreateFeatures from "./createFeatures";
import { SelectedBlockContext } from "./contexts/selectedBlockContext";
import { SelectedFeatureContext } from "./contexts/featuresContext";
import { CreatedtextContext } from "./contexts/createdTextContext";
import { CreatedFileContext } from "./contexts/createdFileContext";
import { SelectedMenuContext } from "./contexts/selectedMenuContext";
import Menu from "./modals/menu";
import DeleteBotChat from "./deleteBotChat";
import UpdateBotChat from "./updateBotChat";
import UpdateBotGallery from "./updateBotGallery";

const useStyles = makeStyles((theme) => ({
	botChat: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 10,
	},
	BotGallery: {
		height: 300,
		width: 210,
		backgroundColor: "#FFF",
		marginTop: 20,
		marginBottom: 20,
		fontSize: 10,
	},

	BotImage: {
		// height:300,
		// width:300,
		// backgroundColor:"#FFF",
		marginTop: 20,
		marginBottom: 20,
		fontSize: 10,
	},

	replyContainer: {
		display: "grid",
		gridTemplateColumns: "100px 100px",
		gridGap: "5px",
		// maxWidth:200,
	},
	galleryContent: {
		color: "red",
		fontSize: 15,
		textAlign: "center",
	},
	replyCard: {
		border: "solid 1px #ffc842ff",
		borderRadius: 20,
		padding: 10,
		fontSize: 12,
		backgroundColor: "#ffc842ff",
		textAlign: "center",
		overflow: "auto",
	},
	features: {
		marginTop: 20,
	},
	textInputs: {
		background: "#FFF",
		fontSize: "9px",
		fontFamily: "NanumSquare",
		borderRadius: 10,
	},
	blockName: {
		background: "#ffebbaff",
	},
	deleteButton: {
		background: "#FFF",
	},
	redirect: {
		border: "solid 1px #ffc842ff",
		borderRadius: 7,
		backgroundColor: "#FFF",
		overflow: "auto",
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
function DisplayBotChat({ blockId, addModify }) {
	const [selectedBlock, setSelectedBlock] = useContext(SelectedBlockContext);
	const [selectedfeature, setSelectedfeature] = useContext(
		SelectedFeatureContext
	);
	const [deleteBlock, setDeleteBlock] = useState(false);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const [selectedOption, setSelectedOption] = useState(true);
	const [fileData, setFileData] = useContext(CreatedFileContext);

	const outerRef = useRef(null);

	const [createReply] = useMutation(CREATE_RESPONSES);
	const [createBotChat] = useMutation(CREATE_BOT_CHATS);

	const classes = useStyles();

	const [text, setText] = useContext(CreatedtextContext);

	useEffect(() => {
		if (text.reply && text.reply.content !== "") {
			createReply({
				variables: {
					responseId: text.reply.pk,
					response: text.reply.content,
					botId: text.reply.fk,
				},
			});
		} else if (text.content !== "" && text.content !== undefined) {
			createBotChat({
				variables: {
					botChatId: text.pk,
					botChat: text.content,
					blockId: blockId.id,
				},
			});
			// setText({...text,
			//     content:"",

			//     })
			return () => {
				setDeleteBlock(false);
			};
		} 
		else if (fileData.formData && fileData.formData.content) {
			const formData = new FormData();

			formData.append("upload", fileData.formData.content);
			formData.append("uploadId", fileData.formData.pk);
			formData.append("uploadType", String(fileData.formData.uploadType));
			formData.append("blockId", String(blockId.id));
			if (fileData.formData.title && fileData.formData.description) {
				formData.append("title", String(fileData.formData.title));
				formData.append(
					"description",
					String(fileData.formData.description)
				);
			}

			submitForm("multipart/form-data", formData, (msg) => {
				console.log(msg);
				// addFile(file)n
				// setFile({...file,content:false})
			});
		}

		refetch();

		return () => {
			setText({ ...text, content: "", pk: "", reply: false });
			setFileData({ formData: false });
		};
	}, [text.pk, text.content, text.reply, deleteBlock, fileData.formData]);
	console.log(fileData, "dfkjfkjjhfk");
	const [modify, setModify] = useState({
		delete: false,
		edit: false,
		add: false,
	});

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
	const [replyButton, setReplyButton] = useState("none");

	const [modifiedValues, setModifiedValues] = useState();
	const [editChat, setEditChat] = useState({
		id: "",
		edit: false,
	});
	const [newEditChat, setNewEditChat] = useState({
		id: "",
		prevContent: "",
		currentContent: "",
	});
	const [newBotChat, setNewBotChat] = useState(false);

	const [displays, setDisplays] = useState({
		text: false,
		file: false,
	});
	const { loading, error, data, refetch } = useQuery(BOTCHATS_RESPONSES, {
		variables: { blockId: blockId.id, orderBy: "last_updated" },
	});

	let filterBlock = "";
	function addDisplay(display) {
		setDisplays(display);
	}

	function addModifiedValues(item) {
		setModifiedValues(item);
	}
	function addModify(modify) {
		setModify(modify);
	}

	function handleEditsClick(e, id) {
		setEditChat({
			id: id,
			edit: true,
		});
	}
	function handleGalleryeEdits(e, id, editKey, nonEditkey, nonEditvalue) {
		setGalleryEditsChange({
			id: id,
			[editKey]: e.target.value,
			[nonEditkey]: nonEditvalue,
		});
	}

	function handleGalleryOnBlur(e) {
		e.preventDefault();
		if (galleyEditsChange.id) {
			setGalleryEdits(galleyEditsChange);
			setGalleryEditsChange({
				id: "",
			});
		}
	}

	function handleEditsChange(e, id, prevContent) {
		setNewEditChat({
			id: id,
			prevContent: prevContent,
			currentContent: e.target.value,
		});
	}

	function handleOnBlur(e) {
		e.preventDefault();
		if (newEditChat.currentContent.trim()) {
			setNewBotChat(newEditChat);
			setNewEditChat({
				id: "",
				prevContent: "",
				currentContent: "",
			});
		}
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	function handleReplyClick(e) {
		setReplyButton("block");
	}

	console.log(galleyEdits);

	const options = [
		{ value: "userInput", label: "user input" },
		{ value: "recommend", label: "추천" },
		{ value: "survey", label: "survey" },
		{
			label: "notification",

			options: [
				{
					label: "user input",
					value: "notificationUserInput",
				},
				{
					label: "default",
					value: "notificationDefault",
				},
			],
		},
		{
			label: "image",

			options: [
				{
					label: "user input",
					value: "imageUserInput",
				},
				{
					label: "default",
					value: "ImageDefault",
				},
			],
		},
	];
	const customStyles = {
		control: (base) => ({
			...base,
			width: 150,
			minHeight: 35,
		}),
	};
	const SelectActions = () => {
		return (
			<div>
				<Select
					value={selectedOption}
					options={options}
					onChange={(value) => setSelectedOption(value)}
					styles={customStyles}
				/>
			</div>
		);
	};
	// console.log(selectedOption)

	return (
		<div>
			<Menu outerRef={outerRef} contextKey={"botChat"} />

			<div>
				<Button variant="contained" className={classes.blockName}>
					{blockId ? blockId.name : ""}
				</Button>
			</div>

			{blockId.id && (
				<div ref={outerRef}>
					{data.botChats.edges.map(function (chats) {
						if (chats.node.botResponses.edges.length < 0) {
							return (
								<div
									key={chats.node.botChatId}
									id={chats.node.botChatId}
									className="context-menu"
								>
									{chats.node.uploadsBotChats.edges.length >
									0 ? (
										<div key={chats.node.botChatId}>
											{chats.node.uploadsBotChats.edges.map(
												function (row) {
													return (
														<div
															key={
																row.node
																	.uploadId
															}
														>
															{row.node
																.uploadType ===
															"gallery" ? (
																<div
																	style={{
																		display:
																			"flex",
																		justifyContent:
																			"space-around",
																	}}
																>
																	<div
																		className={
																			classes.BotGallery
																		}
																	>
																		<img
																			src={
																				"https://hanny-uploads.s3.amazonaws.com/" +
																				row
																					.node
																					.upload
																			}
																			alt="increment"
																			style={{
																				width: 200,
																				height: 200,
																			}}
																		/>
																		{/* <div>{row.node.title}</div>
                                                                    <div>{row.node.description}</div> */}
																		<TextField
																			variant="outlined"
																			id="standard-multiline-flexible"
																			multiline
																			type="text"
																			name="text"
																			size="small"
																			defaultValue={
																				row
																					.node
																					.title
																			}
																			className={
																				classes.textInputs
																			}
																			onBlur={
																				handleGalleryOnBlur
																			}
																			InputProps={{
																				style: {
																					fontSize: 12,
																					fontFamily:
																						"NanumSquare",
																					width: 205,
																				},
																			}}
																			onChange={(
																				e
																			) => {
																				handleGalleryeEdits(
																					e,
																					row
																						.node
																						.uploadId,
																					"title",
																					"description",
																					row
																						.node
																						.description
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
																			defaultValue={
																				row
																					.node
																					.description
																			}
																			className={
																				classes.textInputs
																			}
																			onBlur={
																				handleGalleryOnBlur
																			}
																			InputProps={{
																				style: {
																					fontSize: 12,
																					fontFamily:
																						"NanumSquare",
																					width: 205,
																				},
																			}}
																			onChange={(
																				e
																			) => {
																				handleGalleryeEdits(
																					e,
																					row
																						.node
																						.uploadId,
																					"description",
																					"title",
																					row
																						.node
																						.title
																				);
																			}}
																		/>
																	</div>
																	<div>
																		<div
																			style={{
																				backgroundColor:
																					"#FFF",
																				marginLeft: 20,
																				height: 300,
																				width: 182,
																				borderRadius: 12,
																				postion:
																					"relative",
																				top:
																					"50%",
																				left:
																					"50%",
																				border:
																					"1px solid #FFF",
																				cursor:
																					"pointer",
																			}}
																		>
																			<div
																				style={{
																					position:
																						"relative",
																					top:
																						"50%",
																					left:
																						"50%",
																				}}
																			>
																				+
																			</div>
																		</div>
																		{/* <Gallery/> */}
																	</div>
																</div>
															) : (
																<div
																	className={
																		classes.BotImage
																	}
																	key={
																		row.uploadId
																	}
																>
																	<img
																		src={
																			"https://hanny-uploads.s3.amazonaws.com/" +
																			row
																				.node
																				.upload
																		}
																		alt="increment"
																		style={{
																			width: 200,
																			height: 200,
																		}}
																	/>
																</div>
															)}
														</div>
													);
												}
											)}
										</div>
									) : (
										<div className={classes.botChat}>
											<TextField
												variant="outlined"
												id="standard-multiline-flexible"
												multiline
												type="text"
												name="text"
												size="small"
												defaultValue={
													chats.node.botChat
												}
												className={classes.textInputs}
												onBlur={handleOnBlur}
												InputProps={{
													style: {
														fontSize: 12,
														fontFamily:
															"NanumSquare",
														width: 205,
													},
												}}
												onChange={(e) => {
													handleEditsChange(
														e,
														chats.node.botChatId,
														chats.node.botChat
													);
												}}
											/>
										</div>
									)}
									<div className={classes.replyContainer}>
										<CreateReply
											fk={chats.node.botChatId}
											displays={displays}
										/>
									</div>
								</div>
							);
						} else {
							return (
								<div
									key={chats.node.botChatId}
									id={chats.node.botChatId}
									className="context-menu"
								>
									{chats.node.uploadsBotChats.edges.length >
									0 ? (
										<div className={classes.BotImage}>
											{/* {console.log(chats.node.uploadsBotChats.edges)} */}
											{chats.node.uploadsBotChats.edges.map(
												function (row) {
													return (
														<div
															style={{
																justifyContent:
																	"space-between",
															}}
														>
															<div
																className={
																	classes.BotGallery
																}
															>
																{row.node
																	.uploadType ===
																"gallery" ? (
																	<div>
																		<img
																			src={
																				"https://hanny-uploads.s3.amazonaws.com/" +
																				row
																					.node
																					.upload
																			}
																			alt="increment"
																			style={{
																				width: 200,
																				height: 200,
																			}}
																		/>
																		{/* <div>{row.node.title}</div>
                                                                    <div>{row.node.description}</div> */}
																		<TextField
																			variant="outlined"
																			id="standard-multiline-flexible"
																			multiline
																			type="text"
																			name="text"
																			size="small"
																			defaultValue={
																				row
																					.node
																					.title
																			}
																			placeholder="title ....."
																			className={
																				classes.textInputs
																			}
																			onBlur={
																				handleGalleryOnBlur
																			}
																			InputProps={{
																				style: {
																					fontSize: 12,
																					fontFamily:
																						"NanumSquare",
																					width: 205,
																				},
																			}}
																			onChange={(
																				e
																			) => {
																				handleGalleryeEdits(
																					e,
																					row
																						.node
																						.uploadId,
																					"title",
																					"description",
																					row
																						.node
																						.description
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
																			defaultValue={
																				row
																					.node
																					.description
																			}
																			placeholder="description ....."
																			className={
																				classes.textInputs
																			}
																			onBlur={
																				handleGalleryOnBlur
																			}
																			InputProps={{
																				style: {
																					fontSize: 12,
																					fontFamily:
																						"NanumSquare",
																					width: 205,
																				},
																			}}
																			onChange={(
																				e
																			) => {
																				handleGalleryeEdits(
																					e,
																					row
																						.node
																						.uploadId,
																					"description",
																					"title",
																					row
																						.node
																						.title
																				);
																			}}
																		/>
																	</div>
																) : (
																	<div
																		className={
																			classes.BotImage
																		}
																		ref={
																			outerRef
																		}
																	>
																		<div>
																			{
																				row
																					.node
																					.uploadType
																			}
																		</div>

																		<img
																			src={
																				"https://hanny-uploads.s3.amazonaws.com/" +
																				row
																					.node
																					.upload
																			}
																			alt="increment"
																			style={{
																				width: 200,
																				height: 200,
																			}}
																		/>
																	</div>
																)}
															</div>
														</div>
													);
												}
											)}
										</div>
									) : (
										<div className={classes.botChat}>
											<div>
												{
													<TextField
														variant="outlined"
														id="standard-multiline-flexible"
														multiline
														type="text"
														name="text"
														size="small"
														defaultValue={
															chats.node.botChat
														}
														className={
															classes.textInputs
														}
														onBlur={handleOnBlur}
														InputProps={{
															style: {
																fontSize: 12,
																fontFamily:
																	"NanumSquare",
																width: 205,
															},
														}}
														onChange={(e) => {
															handleEditsChange(
																e,
																chats.node
																	.botChatId,
																chats.node
																	.botChat
															);
														}}
													/>
												}
											</div>
										</div>
									)}
									{/* <div > 

                                            
                                                {
                                                    <Redirectmodal responseId={''} />
                                                
                                                }
                                            </div> */}

									<div className={classes.replyContainer}>
										{chats.node.botResponses.edges.map(
											function (row) {
												return (
													<div>
														<div
															className={
																classes.replyCard
															}
															key={
																row.node
																	.responseId
															}
														>
															{row.node.response}

															{row.node
																.redirect && (
																<div
																	style={{
																		paddingTop: 10,
																	}}
																	key={
																		row.responseId
																	}
																>
																	<button
																		className={
																			classes.redirect
																		}
																		key={
																			row.responseId
																		}
																	>
																		{
																			row
																				.node
																				.redirect
																		}
																	</button>
																</div>
															)}
														</div>
													</div>
												);
											}
										)}

										<div>
											<CreateReply
												fk={chats.node.botChatId}
												displays={displays}
											/>
										</div>
									</div>
								</div>
							);
						}
					})}

					<div className={classes.features}>
						{/* <DeleteBlock/> */}
						<CreateBotChat displays={displays} blockFk={blockId} />
						<CreateFeatures />

						{selectedMenu.botChat.action &&
							selectedMenu.botChat.action === "delete" && (
								<DeleteBotChat
									data={{
										botChatId: selectedMenu.botChat.id,
									}}
								/>
							)}
						{newEditChat.currentContent && (
							<UpdateBotChat
								data={{
									botChatId: newEditChat.id,
									botChat: newEditChat.currentContent,
								}}
							/>
						)}

						{galleyEdits.id && (
							<UpdateBotGallery
								data={{
									uploadId: galleyEdits.id,
									title: galleyEdits.title,
									description: galleyEdits.description,
								}}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
export default DisplayBotChat;
