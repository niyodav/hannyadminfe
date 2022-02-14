import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
// import {
// 	DatePicker,
// 	TimePicker,
// 	DateTimePicker,
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import Pagination from "../components/Pagination";

import { useQuery } from "@apollo/client";
import { USER_CHALLENGE_LOG_SUMMERY } from "../graphql/queries";
import Page from "../Page/page";
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
function ChallengeSummery({ percentages = true }) {
	const classes = useStyles();
	const [search, setSearch] = useState({
		by: "email",
		content: "",
	});
	const [page, setPage] = useState("");
	const [lastIndex, setLastIndex] = useState("");

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

	const { loading, error, data, refetch } = useQuery(
		USER_CHALLENGE_LOG_SUMMERY,
		{
			variables: {
				percentages: percentages,
				lastIndex: page && lastIndex ? lastIndex : null,
				page: page && lastIndex ? page : null,
			},
		}
	);

	const checkPage = (item) => {
		setPage(item);
		if (data && JSON.parse(data.userChallengeLogSummery).data.length > 0) {
			setLastIndex(
				JSON.parse(JSON.parse(data.userChallengeLogSummery).lastIndex)
			);
		}
	};

	function handleSearch() {
		setSearch(searchTextChange);
		if (!search.content) {
			setDatePicker(datePickerChange);
		}
	}

	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}>구분</th>
				<th className={classes.tableColumn}>시나리오 그룹명</th>
				<th className={classes.tableColumn}>챌린저</th>
				{percentages ? (
					<>
						<th className={classes.tableColumn}>오픈율</th>
						<th className={classes.tableColumn}>참여율</th>
						<th className={classes.tableColumn}>달성율</th>
						<th className={classes.tableColumn}>코드번호 유무</th>
						<th className={classes.tableColumn}>
							마지막 대화 일시
						</th>
					</>
				) : (
					<>
						<th className={classes.tableColumn}> 누적 대화 시간</th>
						<th className={classes.tableColumn}>
							{" "}
							마지막 대화 일시
						</th>
					</>
				)}
			</thead>
			<tbody>
				{data.data.map((row) => {
					// let obj = JSON.parse(row);
					return (
						<tr key={row.challengeId} id={row.challengeId}>
							<td className={classes.tableColumn}>
								{/* {row.challengeType} */}
								<Link
									to={
										percentages
											? "/userchallengelogstats/" +
											  row.challengeId +
											  "/" +
											  row.userCount +
											  "/" +
											  row.open_percentage +
											  "/" +
											  row.completed_percentage
											: "/challengeuseranswers/" +
											  row.challengeId
									}
									className={classes.link}
								>
									마음 챌린지
								</Link>
							</td>
							<td className={classes.tableColumn}>
								<Link
									to={
										percentages
											? "/userchallengelogstats/" +
											  row.challengeId +
											  "/" +
											  row.userCount +
											  "/" +
											  row.open_percentage +
											  "/" +
											  row.completed_percentage
											: "/challengeuseranswers/" +
											  row.challengeId
									}
									className={classes.link}
								>
									{row.name}
								</Link>
							</td>
							<td className={classes.tableColumn}>
								<Link
									to={
										percentages
											? "/userchallengelogstats/" +
											  row.challengeId +
											  "/" +
											  row.userCount +
											  "/" +
											  row.open_percentage +
											  "/" +
											  row.completed_percentage
											: "/challengeuseranswers/" +
											  row.challengeId
									}
									className={classes.link}
								>
									{row.userCount}
								</Link>
							</td>
							<td className={classes.tableColumn}>
								{/* {row} */}
							</td>

							{percentages ? (
								<>
									<td className={classes.tableColumn}>
										<Link
											to={
												percentages
													? "/userchallengelogstats/" +
													  row.challengeId +
													  "/" +
													  row.userCount +
													  "/" +
													  row.open_percentage +
													  "/" +
													  row.completed_percentage
													: "/challengeuseranswers/" +
													  row.challengeId
											}
											className={classes.link}
										>
											{Math.round(
												row.open_percentage * 100
											) + " %"}
										</Link>
									</td>
									<td className={classes.tableColumn}>
										<Link
											to={
												percentages
													? "/userchallengelogstats/" +
													  row.challengeId +
													  "/" +
													  row.userCount +
													  "/" +
													  row.open_percentage +
													  "/" +
													  row.completed_percentage
													: "/challengeuseranswers/" +
													  row.challengeId
											}
											className={classes.link}
										>
											{Math.round(
												row.completed_percentage * 100
											) + " %"}
										</Link>
									</td>
									<td className={classes.tableColumn}>
										<Link
											to={
												percentages
													? "/userchallengelogstats/" +
													  row.challengeId +
													  "/" +
													  row.userCount +
													  "/" +
													  row.open_percentage +
													  "/" +
													  row.completed_percentage
													: "/challengeuseranswers/" +
													  row.challengeId
											}
											className={classes.link}
										>
											{row.codeNumber ? "O" : "X"}
										</Link>
									</td>
									<td className={classes.tableColumn}>
										{/* {row.iosCount} */}
									</td>
								</>
							) : (
								<>
									<td className={classes.tableColumn}>
										{/* {row.androidCount + row.iosCount} */}
									</td>
									<td className={classes.tableColumn}>
										{/* {row.androidCount + row.iosCount} */}
									</td>
								</>
							)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<Page>
			<div style={{ marginLeft: 20, marginTop: 20 }}>
				<div
					style={{
						marginBottom: 20,
						marginTop: 20,
						display: "flex",
					}}
				>
					<h4 style={{ marginLeft: 20 }}>
						총 챌린저 :
						{
							JSON.parse(data.userChallengeLogSummery)
								.totalChallengers
						}{" "}
					</h4>
					<h4 style={{ marginLeft: 20 }}>
						오늘 챌린저:
						{
							JSON.parse(data.userChallengeLogSummery)
								.todayChallenges
						}
					</h4>
				</div>

				<Table data={JSON.parse(data.userChallengeLogSummery).data} />
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

export default ChallengeSummery;
