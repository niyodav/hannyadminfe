import React from "react";
import { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useQuery } from "@apollo/client";
import { ALL_USERS, USER_COUNTS } from "../graphql/queries";
import { TextField, Button } from "@material-ui/core";
import Page from "../Page/page";
import Pagination from "../components/Pagination";
import { CursorContext } from "../contexts/cursorContext";

const useStyles = makeStyles((theme) => ({
	SearchContainer: {
		display: "flex",
		flexDirection: "column",
		marginBottom: 20,
	},
	SearchItems: {
		flexDirection: "column",
	},
	SearchItem: {
		marginRight: 8,
		justifyContent: "center",
	},
	searchButton: {
		width: 200,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	datePickerContainer: {
		marginBottom: 20,
		marginTop: 20,
		alignItems: "center",
		flexDirection: "row",
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
function CustomerMonitoring() {
	const classes = useStyles();
	const [search, setSearch] = useState({
		by: "email",
		content: "",
	});
	const [page, setPage] = useState("");
	const [cursor, setCursor] = useContext(CursorContext);

	const now = new Date();
	const prevDate = new Date();
	prevDate.setDate(prevDate.getDate() - 7);

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

	const {
		loading: loadingUserCounts,
		error: errorUserCounts,
		data: dataUserCounts,
	} = useQuery(USER_COUNTS);
	const { loading, error, data } = useQuery(ALL_USERS, {
		variables: {
			orderBy: "-date_joined",
			usernameContains: search.by === "sns" ? search.content : null,
			email: search.by === "email" ? search.content : null,
			dateJoinedGte: !search.content ? datePicker.from : null,
			dateJoinedLte: !search.content ? datePicker.to : null,
			first: !page ? 15 : page === "next" ? 15 : null,
			last: page === "prev" ? 15 : null,
			after:
				page === "next" && String(cursor.users)
					? String(cursor.users.endCursor)
					: null,
			before:
				page === "prev" && String(cursor.users)
					? String(cursor.users.startCursor)
					: null,
		},
	});

	function handleSearch() {
		setSearch(searchTextChange);
		if (!search.content) {
			setDatePicker(datePickerChange);
		}
	}

	const checkPage = (item) => {
		if (data && data.allUsers.pageInfo) {
			setCursor({
				users: {
					startCursor: data.allUsers.pageInfo.startCursor,
					endCursor: data.allUsers.pageInfo.endCursor,
				},
			});
		}
		setPage(item);
	};
	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}>?????????</th>
				<th className={classes.tableColumn}>??????SNS</th>
				<th className={classes.tableColumn}>?????????</th>
				<th className={classes.tableColumn}>?????????</th>
			</thead>
			<tbody>
				{data.data.map((row) => (
					<tr key={row.node.username} id={row.node.username}>
						<td className={classes.tableColumn}>
							<Link
								to={"/customerdetails/" + row.node.username}
								className={classes.link}
							>
								{row.node.email}
							</Link>
						</td>
						<td className={classes.tableColumn}>
							<Link
								to={"/customerdetails/" + row.node.username}
								className={classes.link}
							>
								{row.node.username.indexOf("KAKAO") > -1
									? "KAKAO"
									: row.node.username.indexOf("NAVER") > -1
									? "NAVER"
									: row.node.username.indexOf("APPLE") > -1
									? "APPLE"
									: "GMAIL"}
							</Link>
						</td>
						<td className={classes.tableColumn}>
							<Link
								to={"/customerdetails/" + row.node.username}
								className={classes.link}
							>
								{row.node.UserProfile
									? row.node.UserProfile.nickname
									: "~"}
							</Link>
						</td>
						<td className={classes.tableColumn}>
							{row.node.dateJoined.slice(0, 10)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	if (loadingUserCounts) return <p>Loading...</p>;
	if (errorUserCounts) return <p>there was an erroeer</p>;

	return (
		<Page>
			<div style={{ marginLeft: 20, marginTop: 20 }}>
				<div className={classes.SearchContainer}>
					<div style={{ flexDirection: "row" }}>
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
							<option value="sns">sns</option>
						</select>

						<TextField
							variant="outlined"
							id="standard-multiline-flexible"
							multiline
							type="text"
							name="text"
							size="small"
							// label="????????????"
							defaultValue={searchTextChange.content}
							className={classes.textInputs}
							// onBlur={handleOnBlur}
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
					</div>
					<div className={classes.SearchItems}>
						<div>
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
											label="????????? from"
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
											label="????????? to"
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

				<div style={{ marginBottom: 20 }}>
					<div>
						??? ?????? :{" "}
						{JSON.parse(dataUserCounts.userCounts).totalCount}{" "}
					</div>
					<div>
						?????? ?????? :{" "}
						{JSON.parse(dataUserCounts.userCounts).todayCount}{" "}
					</div>
					<div> ??? filter ????????? : {data.allUsers.totalCount} </div>
				</div>

				<Table data={data.allUsers.edges} />
				<div
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Pagination checkState={checkPage} />
				</div>
			</div>
		</Page>
	);
}

export default CustomerMonitoring;
