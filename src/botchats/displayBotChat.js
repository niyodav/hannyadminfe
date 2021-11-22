import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BOTCHATS_RESPONSES } from "../graphql/queries";
import { CREATE_RESPONSES, CREATE_BOT_CHATS } from "../graphql/mutations";

import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateBotChat from "./createBotChat";
import CreateReply from "./createReply";
import CreateFeatures from "../components/createFeatures";
import { CreatedtextContext } from "../contexts/createdTextContext";
import { CreatedFileContext } from "../contexts/createdFileContext";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import Menu from "../modals/menu";
import DeleteBotChat from "./deleteBotChat";
import UpdateBotChat from "./updateBotChat";
import DisplayImages from "../components/displayImages";
import UpdateReply from "./updateReply";

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
		marginTop: 20,
		marginBottom: 20,
		fontSize: 10,
	},

	replyContainer: {
		display: "grid",
		gridTemplateColumns: "100px 100px",
		gridGap: "5px",
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
		marginBottom: 40,
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
	action: {
		border: "solid 1px #ffc842ff",
		borderRadius: 7,
		backgroundColor: "#FFF",
		overflow: "auto",
		fontSize: 8,
	},
}));

function DisplayBotChat({ blockId, addModify }) {
	const [deleteBlock, setDeleteBlock] = useState(false);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);
	const [replyClicked, setReplyClicked] = useState(false);

	const [fileData, setFileData] = useContext(CreatedFileContext);

	const outerRef = useRef(null);

	const [createReply] = useMutation(CREATE_RESPONSES);
	const [createBotChat] = useMutation(CREATE_BOT_CHATS);

	const classes = useStyles();

	const [text, setText] = useContext(CreatedtextContext);
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

			return () => {
				setDeleteBlock(false);
			};
		} else if (fileData.formData && fileData.formData.content) {
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
		}

		refetch();

		return () => {
			setText({ ...text, content: "", pk: "", reply: false });
			setFileData({ formData: false });
		};
	}, [text.pk, text.content, text.reply, deleteBlock, fileData.formData]);

	function handleReplyClick(e, id) {
		setReplyClicked(id);
	}

	const { loading, error, data, refetch } = useQuery(BOTCHATS_RESPONSES, {
		variables: { blockId: blockId.id, orderBy: "idx" },
	});

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
														<DisplayImages
															images={
																row.node
																	.uploadsBotChats
																	.edges
															}
														/>
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
										<DisplayImages
											images={
												chats.node.uploadsBotChats.edges
											}
										/>
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

									<div className={classes.replyContainer}>
										{chats.node.botResponses.edges.map(
											function (row) {
												return (
													<div>
														{replyClicked &&
														replyClicked ===
															row.node
																.responseId ? (
															<UpdateReply
																responseId={
																	row.node
																		.responseId
																}
																response={
																	row.node
																		.response
																}
																action={
																	row.node
																		.action
																}
																redirect={
																	row.node
																		.redirect
																}
															/>
														) : (
															<div
																className={
																	classes.replyCard
																}
																key={
																	row.node
																		.responseId
																}
																onClick={() =>
																	setReplyClicked(
																		row.node
																			.responseId
																	)
																}
															>
																{
																	row.node
																		.response
																}

																{row.node
																	.redirect && (
																	<div
																		key={
																			row
																				.node
																				.responseId
																		}
																	>
																		<button
																			className={
																				classes.redirect
																			}
																			key={
																				row
																					.node
																					.responseId
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
																{row.node
																	.action && (
																	<div
																		key={
																			row.responseId
																		}
																	>
																		<button
																			className={
																				classes.action
																			}
																			key={
																				row.responseId
																			}
																		>
																			{
																				row
																					.node
																					.action
																			}
																		</button>
																	</div>
																)}
															</div>
														)}
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
						<CreateBotChat displays={displays} blockFk={blockId} />
						{/* <CreateFeatures /> */}

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
					</div>
				</div>
			)}
		</div>
	);
}
export default DisplayBotChat;
