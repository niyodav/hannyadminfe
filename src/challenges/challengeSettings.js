import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../globalConstants";
import UploadMedia from "../components/uploadMedia";
import { useQuery, useMutation } from "@apollo/client";
import { ONE_CHALLENGES } from "../graphql/queries";
import { useState, useRef, useContext, useEffect, Fragment } from "react";
import {
	UPDATE_CHALLENGE_BASIC_SETTING,
	UPDATE_CHALLENGE_MAINPAGE_SETTING,
	CREATE_ACCESSCODE,
	CREATE_CHALLENGELIST,
	UPDATE_CHALLENGELIST,
} from "../graphql/mutations";
import ChallengeAccessCodes from "../challengeManagement/challengeCodeNumbers";

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 20,
	},
	basicSetting: {
		display: "grid",
		gridTemplateColumns: "300px 300px",
		gridGap: "5px",
	},
	challengeName: {
		display: "flex",
		fontSize: 12,
		fontFamily: "NanumSquare",
	},
	challengeNameTitle: {
		margin: 10,
	},
}));
function ChallengeSettings() {
	const classes = useStyles();
	const { challengeId } = useParams();
	const [nextDay, setNextDay] = useState("");

	const [challengeBasics, setChallengeBasics] = useState({
		challengeId: null,
		name: null,
		nextDay: null,
		tags: null,
		showOnScreen: null,
		startOn: null,
	});

	const [challengeMainPage, setChallengeMainPage] = useState({
		challengeId: null,
		description: null,
		period: null,
		price: null,
		descriptionTitle: null,
		recommandation: null,
	});

	const [showOnScreen, setShowOnScreen] = useState("off");
	const now = new Date();
	const [accessCode, setAccessCode] = useState({
		challengeId: challengeId,
		codeNumber: null,
		maxUsers: null,
		startDate:
			now.getFullYear() +
			"-" +
			(String(now.getMonth() + 1).length > 1
				? now.getMonth() + 1
				: "0" + String(now.getMonth() + 1)) +
			"-" +
			(String(now.getDate()).length > 1
				? now.getDate()
				: "0" + String(now.getDate())),
		endDate:
			now.getFullYear() +
			"-" +
			(String(now.getMonth() + 1).length > 1
				? now.getMonth() + 1
				: "0" + String(now.getMonth() + 1)) +
			"-" +
			(String(now.getDate()).length > 1
				? now.getDate()
				: "0" + String(now.getDate())),
		name: null,
	});
	const [selectedDate, handleDateChange] = useState(new Date());

	const [startOn, setStartOn] = useState("");
	const { loading, error, data, refetch } = useQuery(ONE_CHALLENGES, {
		variables: {
			challengeId: challengeId,
		},
		onCompleted(data) {
			if (data.challenges.edges) {
				setChallengeBasics({
					challengeId: data.challenges.edges[0].node.challengeId,
					name: data.challenges.edges[0].node.name,
					nextDay: data.challenges.edges[0].node.nextDay,
					tags: data.challenges.edges[0].node.tags
						? data.challenges.edges[0].node.tags.toString()
						: data.challenges.edges[0].node.tags,
					showOnScreen: data.challenges.edges[0].node.showOnScreen,
					startOn: data.challenges.edges[0].node.startOn,
					scheduleDays: data.challenges.edges[0].node.scheduleDays
						? data.challenges.edges[0].node.scheduleDays.toString()
						: data.challenges.edges[0].node.scheduleDays,
				});

				setChallengeMainPage({
					challengeId: data.challenges.edges[0].node.challengeId,
					description: data.challenges.edges[0].node.description,
					period: data.challenges.edges[0].node.period,
					price: data.challenges.edges[0].node.price,
					descriptionTitle:
						data.challenges.edges[0].node.descriptionTitle,
				});
			}
		},
	});

	const [updateChallengesBasicSetting] = useMutation(
		UPDATE_CHALLENGE_BASIC_SETTING
	);
	const [updateChallengeMainPageSetting] = useMutation(
		UPDATE_CHALLENGE_MAINPAGE_SETTING
	);
	const [createAccessCode] = useMutation(CREATE_ACCESSCODE);
	const [createChallengeList] = useMutation(CREATE_CHALLENGELIST);
	const [updateChallengeList] = useMutation(UPDATE_CHALLENGELIST);

	const handleSubmission = (item) => {
		const formData = new FormData();
		formData.append("challengeId", item.id);
		formData.append("title", item.title);
		formData.append("upload", item.file);

		axios
			.post(API_BASE_URL + "api/v1/challenge/upload/", formData)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	};
	function submitBasics() {
		if (data.challenges && data.challenges.edges) {
			console.log();
			updateChallengesBasicSetting({
				variables: {
					challengeId: challengeBasics.challengeId,
					name: challengeBasics.name,
					nextDay: challengeBasics.nextDay,
					tags: challengeBasics.tags
						? challengeBasics.tags.split(",")
						: null,
					showOnScreen: challengeBasics.showOnScreen,
					startOn: challengeBasics.startOn,
					scheduleDays: challengeBasics.scheduleDays
						? challengeBasics.scheduleDays.toString().split(",")
						: null,
				},
			});
			// window.location.reload(true);
		}
	}

	function submitMainPage() {
		if (data.challenges && data.challenges.edges) {
			updateChallengeMainPageSetting({
				variables: {
					challengeId: challengeMainPage.challengeId,
					description: challengeMainPage.description,
					period: challengeMainPage.period,
					price: challengeMainPage.price,
					descriptionTitle: challengeMainPage.descriptionTitle,
				},
			});

			if (challengeMainPage.recommandation) {
				if (
					data.challenges.edges[0].node.ChallengeListslists.edges
						.length > 1 &&
					data.challenges.edges[0].node.ChallengeListslists.edges.filter(
						(item) =>
							item.node.listType.toUpperCase() !==
							"recommandation"
					)[0]
				) {
					updateChallengeList({
						variables: {
							listId: data.challenges.edges[0].node.ChallengeListslists.edges.filter(
								(item) =>
									item.node.listType.toUpperCase() !==
									"recommandation"
							)[0].node.listId,
							listArray: challengeMainPage.recommandation
								? challengeMainPage.recommandation.split(",")
								: "",
						},
					});
				} else {
					createChallengeList({
						variables: {
							challengeId:
								data.challenges.edges[0].node.challengeId,
							listType: "recommandation",
							listArray: challengeMainPage.recommandation
								? challengeMainPage.recommandation.split(",")
								: null,
						},
					});
				}
			}
			// window.location.reload(true);
		}
	}

	function submitAccessCode() {
		if (accessCode.codeNumber) {
			createAccessCode({
				variables: accessCode,
			});
			console.log(accessCode);
			// window.location.reload(true);
		}
	}

	function addFile(item) {
		handleSubmission(item);
		console.log(item);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<div className="wrapper" style={{ marginLeft: 20, marginTop: 20 }}>
			{data.challenges && data.challenges.edges && (
				<div className={classes.container}>
					<div className={classes.challenge}>기본설정</div>
					<div className={classes.basicSetting}>
						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								썸네일 (square)
							</div>
							<div>
								<UploadMedia
									addFile={addFile}
									id={challengeId}
									title={"square"}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								썸네일 (rectangle)
							</div>
							<div>
								<UploadMedia
									addFile={addFile}
									id={challengeId}
									title={"rectangle"}
								/>
							</div>
						</div>
						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								챌린지명
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node.name
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											name: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								#HASHTAGS
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node.tags
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											tags: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								show on screen{" "}
								<input
									type="checkbox"
									defaultChecked={
										challengeBasics.showOnScreen
									}
									// onChange={(e) => {
									// 	setShowOnScreen(
									// 		!challengeBasics.showOnScreen
									// 	);
									// }}

									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											showOnScreen: !challengeBasics.showOnScreen,
										})
									}
								/>
							</div>

							{/* <div>
								
								<select
									// onChange={(e) =>
									// 	setChallengeBasics({
									// 		...challengeBasics,
									// 		showOnScreen:
									// 			e.target.value === 1
									// 				? true
									// 				: e.target.value === 0
									// 				? false
									// 				: challengeBasics.showOnScreen,
									// 	})
									// }

									onChange={(e) =>
										setShowOnScreen(
											e.target.value === 1
												? true
												: e.target.value === 0
												? false
												: "not selected"
										)
									}
								>
									<option
										value={
											data.challenges.edges[0].node
												.showOnScreen
										}
									>
										선택하세요
									</option>
									<option value={0}>false</option>
									<option value={1}>true</option>
								</select> 
							</div> */}
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								start on
							</div>
							<div>
								<select
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											startOn: +e.target.value,
										})
									}
								>
									<option
										value={
											data.challenges.edges[0].node
												.startOn
										}
									>
										선택하세요
									</option>
									<option value="1">월</option>
									<option value="2">화</option>
									<option value="3">수</option>
									<option value="4">목</option>
									<option value="5">금</option>
									<option value="6">토</option>
									<option value="7">일</option>
								</select>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								start tomorrow
								<input
									type="checkbox"
									defaultChecked={challengeBasics.nextDay}
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											nextDay: !challengeBasics.nextDay,
										})
									}
								/>
							</div>
							{/* <div>
								<select
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											nextDay: e.target.value,
										})
									}
								>
									<option
										value={
											data.challenges.edges[0].node
												.nextDay
										}
									>
										선택하세요
									</option>
									<option
										value={
											data.challenges.edges[0].node
												.nextDay
										}
									>
										{String(
											data.challenges.edges[0].node
												.nextDay
										)}
									</option>
									<option
										value={
											!data.challenges.edges[0].node
												.nextDay
										}
									>
										{String(
											!data.challenges.edges[0].node
												.nextDay
										)}
									</option>
								</select>
							</div> */}
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								schedule days
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node
											.scheduleDays
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeBasics({
											...challengeBasics,
											scheduleDays: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={submitBasics}
						>
							SUBMIT
						</Button>
					</div>
				</div>
			)}

			<div className={classes.container}>
				<div>코드번호</div>
				<div>
					<div>
						<TextField
							variant="standard"
							id="standard-multiline-flexible"
							multiline
							type="text"
							name="text"
							size="small"
							label="코드번호"
							// defaultValue={
							// 	chats.node.botChat
							// }
							className={classes.textInputs}
							// onBlur={handleOnBlur}
							InputProps={{
								style: {
									fontSize: 12,
									fontFamily: "NanumSquare",
									width: 150,
								},
							}}
							onChange={(e) =>
								setAccessCode({
									...accessCode,
									codeNumber: e.target.value,
								})
							}
						/>
					</div>
					{/* <div>
						<TextField
							variant="standard"
							id="standard-multiline-flexible"
							multiline
							type="text"
							name="text"
							size="small"
							label="시작날짜"
							// defaultValue={
							// 	chats.node.botChat
							// }
							className={classes.textInputs}
							// onBlur={handleOnBlur}
							InputProps={{
								style: {
									fontSize: 12,
									fontFamily: "NanumSquare",
									width: 150,
								},
							}}
							onChange={(e) =>
								setAccessCode({
									...accessCode,
									startDate: e.target.value,
								})
							}
						/>
					</div> */}
					<div>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<div>
								<KeyboardDatePicker
									autoOk
									variant="standard"
									inputVariant="standard"
									label="시작날짜"
									format="yyyy-MM-dd"
									value={accessCode.startDate}
									InputAdornmentProps={{ position: "start" }}
									onChange={(date) =>
										setAccessCode({
											...accessCode,
											startDate:
												date.getFullYear() +
												"-" +
												(String(date.getMonth() + 1)
													.length > 1
													? date.getMonth() + 1
													: "0" +
													  String(
															date.getMonth() + 1
													  )) +
												"-" +
												(String(date.getDate()).length >
												1
													? date.getDate()
													: "0" +
													  String(date.getDate())),
										})
									}
								/>
							</div>
							<div>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										autoOk
										variant="standard"
										inputVariant="standard"
										label="마감날짜"
										format="yyyy-MM-dd"
										value={accessCode.endDate}
										InputAdornmentProps={{
											position: "start",
										}}
										onChange={(date) =>
											setAccessCode({
												...accessCode,
												endDate:
													date.getFullYear() +
													"-" +
													(String(date.getMonth() + 1)
														.length > 1
														? date.getMonth() + 1
														: "0" +
														  String(
																date.getMonth() +
																	1
														  )) +
													"-" +
													(String(date.getDate())
														.length > 1
														? date.getDate()
														: "0" +
														  String(
																date.getDate()
														  )),
											})
										}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</MuiPickersUtilsProvider>
						{/* <TextField
							variant="standard"
							id="standard-multiline-flexible"
							multiline
							type="text"
							name="text"
							size="small"
							label="마감날짜"
							// defaultValue={
							// 	chats.node.botChat
							// }
							className={classes.textInputs}
							// onBlur={handleOnBlur}
							InputProps={{
								style: {
									fontSize: 12,
									fontFamily: "NanumSquare",
									width: 150,
								},
							}}
							onChange={(e) =>
								setAccessCode({
									...accessCode,
									endDate: e.target.value,
								})
							}
						/> */}
					</div>
					<div>
						<TextField
							variant="standard"
							id="standard-multiline-flexible"
							// multiline
							type="number"
							// name="number"
							size="small"
							label="인원수"
							// defaultValue={
							// 	chats.node.botChat
							// }
							className={classes.textInputs}
							InputLabelProps={{
								shrink: true,
							}}
							// onBlur={handleOnBlur}
							InputProps={{
								style: {
									fontSize: 12,
									fontFamily: "NanumSquare",
									width: 150,
								},
							}}
							onChange={(e) =>
								setAccessCode({
									...accessCode,
									maxUsers: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<TextField
							variant="standard"
							id="standard-multiline-flexible"
							multiline
							type="text"
							name="text"
							size="small"
							label="사용처"
							// defaultValue={
							// 	chats.node.botChat
							// }
							className={classes.textInputs}
							// onBlur={handleOnBlur}
							InputProps={{
								style: {
									fontSize: 12,
									fontFamily: "NanumSquare",
									width: 150,
								},
							}}
							onChange={(e) =>
								setAccessCode({
									...accessCode,
									name: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={submitAccessCode}
						>
							SUBMIT
						</Button>
					</div>
				</div>

				<ChallengeAccessCodes challengeId={challengeId} />
			</div>
			{data.challenges && data.challenges.edges && (
				<div className={classes.container}>
					<div>상세페이지</div>
					<div className={classes.basicSetting}>
						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								부제목
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node
											.descriptionTitle
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeMainPage({
											...challengeMainPage,
											descriptionTitle: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								설명
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node
											.description
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeMainPage({
											...challengeMainPage,
											description: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								기간
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node.period
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeMainPage({
											...challengeMainPage,
											period: e.target.value,
										})
									}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								추천대상
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node
											.ChallengeListslists.edges.length >
										1
											? data.challenges.edges[0].node.ChallengeListslists.edges[0].node.listArray.toString()
											: ""
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeMainPage({
											...challengeMainPage,
											recommandation: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								성공
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node.price * 20
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									// onChange={(e) => {
									// 	handleEditsChange(
									// 		e,
									// 		chats.node.botChatId,
									// 		chats.node.botChat
									// 	);
									// }}
								/>
							</div>
						</div>

						<div className={classes.challengeName}>
							<div className={classes.challengeNameTitle}>
								이용금액
							</div>
							<div>
								<TextField
									variant="outlined"
									id="standard-multiline-flexible"
									multiline
									type="text"
									name="text"
									size="small"
									defaultValue={
										data.challenges.edges[0].node.price
									}
									className={classes.textInputs}
									// onBlur={handleOnBlur}
									InputProps={{
										style: {
											fontSize: 12,
											fontFamily: "NanumSquare",
											width: 205,
										},
									}}
									onChange={(e) =>
										setChallengeMainPage({
											...challengeMainPage,
											price: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
					<div>
						<Button
							variant="contained"
							color="primary"
							onClick={submitMainPage}
						>
							SUBMIT
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default ChallengeSettings;
