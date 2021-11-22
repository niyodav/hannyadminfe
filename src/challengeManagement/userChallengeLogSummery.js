import React from "react";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useQuery } from "@apollo/client";
import { USER_SCENERIO_LOG_SUMMERY } from "../graphql/queries";
import { TextField, Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	SearchContainer: {
		display: "flex",
	},
	SearchItems: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	SearchItem: {
		marginRight: 8,
		justifyContent: "center",
	},
	datePickerContainer: {
		display: "flex",
		marginTop: 20,
		marginBottom: 20,
	},
	datePicker: {
		flexDirection: "row",
	},
	tableColumn: {
		padding: "8px",
		textAlign: "center",
		borderBottom: "1px solid #ddd",
	},

	link: {
		textDecoration: "none",
		color: theme.palette.text.primary,
		"&:hover": {
			backgroundColor: "#ffebbaff",
		},
	},
}));
function UserChallengeLogSummery({ userId, status }) {
	const classes = useStyles();
	const [search, setSearch] = useState({
		by: "email",
		content: "",
	});
	const now = new Date();
	const prevDate = new Date();
	prevDate.setDate(prevDate.getDate() - 7);

	const {
		challengeId,
		challengers,
		openpercentage,
		completedpercentage,
	} = useParams();

	const [searchTextChange, setSearchTextChange] = useState({
		by: "email",
		content: "",
	});

	const [datePickerChange, setDatePickerChange] = useState({
		from:
			prevDate.getFullYear() +
			"-" +
			(String(prevDate.getMonth() + 1).length > 1
				? prevDate.getMonth() + 1
				: "0" + String(prevDate.getMonth() + 1)) +
			"-" +
			(String(prevDate.getDate()).length > 1
				? prevDate.getDate()
				: "0" + String(prevDate.getDate())),
		to:
			now.getFullYear() +
			"-" +
			(String(now.getMonth() + 1).length > 1
				? now.getMonth() + 1
				: "0" + String(now.getMonth() + 1)) +
			"-" +
			(String(now.getDate()).length > 1
				? now.getDate()
				: "0" + String(now.getDate())),
	});

	const [datePicker, setDatePicker] = useState({
		from:
			prevDate.getFullYear() +
			"-" +
			(String(prevDate.getMonth() + 1).length > 1
				? prevDate.getMonth() + 1
				: "0" + String(prevDate.getMonth() + 1)) +
			"-" +
			(String(prevDate.getDate()).length > 1
				? prevDate.getDate()
				: "0" + String(prevDate.getDate())),
		to:
			now.getFullYear() +
			"-" +
			(String(now.getMonth() + 1).length > 1
				? now.getMonth() + 1
				: "0" + String(now.getMonth() + 1)) +
			"-" +
			(String(now.getDate()).length > 1
				? now.getDate()
				: "0" + String(now.getDate())),
	});

	const getVariables = () => {
		if (userId && status) {
			return {
				userId: userId,
				status: status,
				accesscode:
					search.by === "accesscode" && search.content
						? search.content
						: null,
				startDateLte: !search.content ? datePicker.to : null,
				startDateGte: !search.content ? datePicker.from : null,
			};
		} else {
			return {
				challengeId: challengeId,
				email: search.by === "email" ? search.content : null,
				accesscode: search.by === "accesscode" ? search.content : null,
				startDateLte: !search.content ? datePicker.to : null,
				startDateGte: !search.content ? datePicker.from : null,
			};
		}
	};
	const { loading, error, data } = useQuery(USER_SCENERIO_LOG_SUMMERY, {
		variables: getVariables(),
	});

	function handleSearch() {
		setSearch(searchTextChange);
		if (!search.content) {
			setDatePicker(datePickerChange);
		}
	}

	const Table = (data) => (
		<div>
			<table
				style={{
					display: "block",
					overflowX: "scroll",
					whiteSpace: "nowrap",
				}}
			>
				<thead>
					<th className={classes.tableColumn}>코드번호</th>
					<th className={classes.tableColumn}>
						{userId ? "챌린지명" : "이메일"}
					</th>
					<th className={classes.tableColumn}>진행상태</th>
					<th className={classes.tableColumn}>성공/실패</th>
					<th className={classes.tableColumn}>오픈율</th>
					<th className={classes.tableColumn}>참여율</th>
					<th className={classes.tableColumn}>수행율</th>
					<th className={classes.tableColumn}>체크인 시간</th>
					<th className={classes.tableColumn}>시작일시</th>
					<th className={classes.tableColumn}>마지막일시</th>
					<th className={classes.tableColumn}>마지막 접속</th>
					<th className={classes.tableColumn}>메시지 받는시간</th>
					<th className={classes.tableColumn}>획득한 포인트</th>

					{data.data.length > 0 &&
						!userId &&
						!status &&
						JSON.parse(data.data[0]).scenerios.map((th) => (
							<th className={classes.tableColumn}>{th}</th>
						))}
				</thead>
				<tbody>
					{data.data.length > 0 &&
						data.data.map((row, index) => {
							let obj = JSON.parse(row);
							return (
								<tr key={obj.challengeId} id={obj.challengeId}>
									<td className={classes.tableColumn}>
										{obj.codeNumber ? obj.codeNumber : "~"}
									</td>
									<td className={classes.tableColumn}>
										{userId ? obj.name : obj.email}
									</td>
									<td className={classes.tableColumn}>
										{obj.ratio}
									</td>
									<td className={classes.tableColumn}>
										{obj.completed_percentage * 100 > 90
											? "성공"
											: "실패"}
									</td>
									<td className={classes.tableColumn}>
										{"~"}
									</td>
									<td className={classes.tableColumn}>
										{Math.round(obj.open_percentage * 100) +
											" %"}
									</td>
									<td className={classes.tableColumn}>
										{Math.round(
											obj.completed_percentage * 100
										) + " %"}
									</td>
									<td className={classes.tableColumn}>
										{obj.createdAt
											? obj.createdAt.slice(0, 16)
											: "~"}
									</td>
									<td className={classes.tableColumn}>
										{obj.startDate}
									</td>
									<td className={classes.tableColumn}>
										{obj.endDate}
									</td>
									<td className={classes.tableColumn}>
										{obj.lastMessageTime.slice(0, 10)}
									</td>
									<td className={classes.tableColumn}>
										{obj.notificationTime &&
										obj.notificationTime !== "None"
											? obj.notificationTime.slice(0, 5)
											: "~"}
									</td>
									<td className={classes.tableColumn}>
										{obj.challengePoints}
									</td>
									{!userId &&
										!status &&
										JSON.parse(
											data.data[0]
										).scenerios.map((td) => (
											<td className={classes.tableColumn}>
												{JSON.parse(
													data.data[index]
												).scenerioLogs.filter(
													(item) => item === td
												).length > 0
													? "O"
													: "X"}
											</td>
										))}
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<div style={{ marginLeft: 20, marginTop: 20 }}>
			{!userId && !status && (
				<div className={classes.SearchContainer}>
					<div>
						<select
							className={classes.SearchItem}
							onChange={(e) =>
								setSearchTextChange({
									...searchTextChange,
									by: e.target.value,
								})
							}
						>
							<option value="email">email</option>
							<option value="accesscode">코드번호</option>
						</select>
					</div>
					<div className={classes.SearchItems}>
						<div>
							<TextField
								variant="outlined"
								id="standard-multiline-flexible"
								multiline
								type="text"
								name="text"
								size="small"
								defaultValue={searchTextChange.content}
								className={classes.textInputs}
								InputProps={{
									style: {
										fontSize: 12,
										fontFamily: "NanumSquare",
										width: 400,
									},
								}}
								onChange={(e) => {
									const { value } = e.target;
									setSearchTextChange({
										...searchTextChange,
										content: value,
									});
								}}
							/>

							<div className={classes.datePickerContainer}>
								<MuiPickersUtilsProvider
									utils={DateFnsUtils}
									style={{
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<div className={classes.datePicker}>
										<KeyboardDatePicker
											autoOk
											variant="standard"
											inputVariant="outlined"
											label="시작날짜 from"
											format="yyyy-MM-dd"
											value={datePickerChange.from}
											InputAdornmentProps={{
												position: "start",
											}}
											style={{
												width: 200,
											}}
											onChange={(date) =>
												setDatePickerChange({
													...datePickerChange,
													from:
														date.getFullYear() +
														"-" +
														(String(
															date.getMonth() + 1
														).length > 1
															? date.getMonth() +
															  1
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
									</div>

									<div
										style={{
											marginLeft: 10,
											marginRight: 10,
										}}
									>
										~
									</div>
									<div className={classes.datePicker}>
										<KeyboardDatePicker
											autoOk
											variant="inline"
											inputVariant="outlined"
											label="시작날짜 to"
											format="yyyy-MM-dd"
											value={datePickerChange.to}
											InputAdornmentProps={{
												position: "start",
											}}
											style={{
												width: 200,
											}}
											onChange={(date) =>
												setDatePickerChange({
													...datePickerChange,
													to:
														date.getFullYear() +
														"-" +
														(String(
															date.getMonth() + 1
														).length > 1
															? date.getMonth() +
															  1
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
									</div>
								</MuiPickersUtilsProvider>
							</div>
						</div>

						<div className={classes.searchButton}>
							<Button
								color="primary"
								variant="outlined"
								className={classes.SearchItem}
								onClick={handleSearch}
							>
								search
							</Button>
						</div>
					</div>
				</div>
			)}
			{!status && !userId && (
				<div style={{ marginBottom: 20, display: "flex" }}>
					<h4 style={{ marginLeft: 20 }}>
						{" "}
						전체 참여자: {challengers}
					</h4>
					<h4 style={{ marginLeft: 20 }}>
						전체 오픈율:
						{Math.round(openpercentage * 100) + "%"}
					</h4>
					<h4 style={{ marginLeft: 20 }}>
						전체 수행율:
						{Math.round(completedpercentage * 100) + "%"}
					</h4>
				</div>
			)}

			<Table data={data.userScenerioLogSummery} />
		</div>
	);
}

export default UserChallengeLogSummery;
