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
import { CHALLENGE_ETAGS_SUMMERY } from "../../graphql/queries";
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
function ChallengeUserAnswers({ userId, status }) {
	const classes = useStyles();
	const [search, setSearch] = useState({
		by: "email",
		content: "",
	});
	const now = new Date();
	const prevDate = new Date();
	prevDate.setDate(prevDate.getDate());
	const { challengeId } = useParams();

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

	const { loading, error, data } = useQuery(CHALLENGE_ETAGS_SUMMERY, {
		variables: {
			challengeId: challengeId,
			email: search.by === "email" ? search.content : null,
			eTag: search.by === "etag" ? search.content : null,
			createdAtLte: !search.content ? datePicker.to : null,
			createdAtGte: !search.content ? datePicker.from : null,
		},
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
					<th className={classes.tableColumn}>마지막 대화 시간</th>

					{data.data.length > 0 &&
						JSON.parse(data.data[0]).etags.map((th) => (
							<th className={classes.tableColumn}>{th}</th>
						))}
				</thead>
				<tbody>
					{JSON.parse(data.data[0]).logs.length > 0 &&
						JSON.parse(data.data[0]).logs.map((row, index) => {
							return (
								<tr key={row.logId} id={row.logId}>
									<td className={classes.tableColumn}>
										{row.createdAt
											? row.createdAt.slice(0, 16)
											: "~"}
									</td>

									{JSON.parse(data.data[0]).etags.map(
										(td) => (
											<td className={classes.tableColumn}>
												{JSON.parse(data.data[0]).logs[
													index
												].etag === td
													? JSON.parse(data.data[0])
															.logs[index].value
													: "~"}
											</td>
										)
									)}
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
							<option value="etag">태그</option>
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
											label="대화 날짜 from"
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
											label="대화 날짜 to"
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
			<Table data={data.challengeEtagsSummery} />
		</div>
	);
}

export default ChallengeUserAnswers;