// import React from "react";
// import { useState, useEffect } from "react";

// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { USER_CHALLENGE_LOG_SUMMERY } from "../../graphql/queries";
// const useStyles = makeStyles((theme) => ({
// 	SearchContainer: {
// 		display: "flex",
// 	},
// 	SearchItems: {
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	SearchItem: {
// 		marginRight: 8,
// 		justifyContent: "center",
// 	},
// 	datePickerContainer: {
// 		display: "flex",
// 		marginTop: 20,
// 		marginBottom: 20,
// 	},
// 	datePicker: {
// 		flexDirection: "row",
// 	},
// 	tableColumn: {
// 		padding: "8px",
// 		textAlign: "center",
// 		borderBottom: "1px solid #ddd",
// 	},

// 	link: {
// 		textDecoration: "none",
// 		color: theme.palette.text.primary,
// 		"&:hover": {
// 			backgroundColor: "#ffebbaff",
// 		},
// 	},
// }));
// function UserAnswers() {
// 	const classes = useStyles();
// 	const [search, setSearch] = useState({
// 		by: "email",
// 		content: "",
// 	});
// 	const now = new Date();
// 	const prevDate = new Date();
// 	prevDate.setDate(prevDate.getDate() - 21);

// 	const [searchTextChange, setSearchTextChange] = useState({
// 		by: "email",
// 		content: "",
// 	});
// 	const [datePickerChange, setDatePickerChange] = useState({
// 		from:
// 			prevDate.getFullYear() +
// 			"-" +
// 			(String(prevDate.getMonth() + 1).length > 1
// 				? prevDate.getMonth() + 1
// 				: "0" + String(prevDate.getMonth() + 1)) +
// 			"-" +
// 			(String(prevDate.getDate()).length > 1
// 				? prevDate.getDate()
// 				: "0" + String(prevDate.getDate())),
// 		to:
// 			now.getFullYear() +
// 			"-" +
// 			(String(now.getMonth() + 1).length > 1
// 				? now.getMonth() + 1
// 				: "0" + String(now.getMonth() + 1)) +
// 			"-" +
// 			(String(now.getDate()).length > 1
// 				? now.getDate()
// 				: "0" + String(now.getDate())),
// 	});

// 	const [datePicker, setDatePicker] = useState({
// 		from:
// 			prevDate.getFullYear() +
// 			"-" +
// 			(String(prevDate.getMonth() + 1).length > 1
// 				? prevDate.getMonth() + 1
// 				: "0" + String(prevDate.getMonth() + 1)) +
// 			"-" +
// 			(String(prevDate.getDate()).length > 1
// 				? prevDate.getDate()
// 				: "0" + String(prevDate.getDate())),
// 		to:
// 			now.getFullYear() +
// 			"-" +
// 			(String(now.getMonth() + 1).length > 1
// 				? now.getMonth() + 1
// 				: "0" + String(now.getMonth() + 1)) +
// 			"-" +
// 			(String(now.getDate()).length > 1
// 				? now.getDate()
// 				: "0" + String(now.getDate())),
// 	});

// 	const { loading, error, data, refetch } = useQuery(
// 		USER_CHALLENGE_LOG_SUMMERY,
// 		{
// 			variables: {
// 				percentages: false,
// 			},
// 		}
// 	);

// 	function handleSearch() {
// 		setSearch(searchTextChange);
// 		if (!search.content) {
// 			setDatePicker(datePickerChange);
// 		}
// 	}

// 	const Table = (data) => (
// 		<table>
// 			<thead>
// 				<th className={classes.tableColumn}>구분</th>
// 				<th className={classes.tableColumn}>시나리오 그룹명</th>
// 				<th className={classes.tableColumn}>누적 시나리오 참여자</th>
// 				<th className={classes.tableColumn}> 누적 대화 시간</th>
// 				<th className={classes.tableColumn}> 마지막 대화 일시</th>
// 			</thead>
// 			<tbody>
// 				{data.data.map((row) => {
// 					let obj = JSON.parse(row);
// 					return (
// 						<tr key={obj.challengeId} id={obj.challengeId}>
// 							<td className={classes.tableColumn}>
// 								<Link
// 									to={
// 										"/challengeuseranswers/" +
// 										obj.challengeId
// 									}
// 									className={classes.link}
// 								>
// 									{obj.challengeType}
// 								</Link>
// 							</td>
// 							<td className={classes.tableColumn}>
// 								<Link
// 									to={
// 										"/challengeuseranswers/" +
// 										obj.challengeId
// 									}
// 									className={classes.link}
// 								>
// 									{obj.name}
// 								</Link>
// 							</td>
// 							<td className={classes.tableColumn}>
// 								<Link
// 									to={
// 										"/challengeuseranswers/" +
// 										obj.challengeId
// 									}
// 									className={classes.link}
// 								>
// 									{obj.userCount}
// 								</Link>
// 							</td>
// 							<td className={classes.tableColumn}>
// 								{/* {obj.androidCount + obj.iosCount} */}
// 							</td>
// 							<td className={classes.tableColumn}>
// 								{/* {obj.androidCount + obj.iosCount} */}
// 							</td>
// 						</tr>
// 					);
// 				})}
// 			</tbody>
// 		</table>
// 	);
// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>there was an error</p>;

// 	return (
// 		<div style={{ marginLeft: 20, marginTop: 20 }}>
// 			<Table data={data.userChallengeLogSummery} />
// 		</div>
// 	);
// }

// export default UserAnswers;
