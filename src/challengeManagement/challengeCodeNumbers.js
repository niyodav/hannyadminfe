import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useQuery } from "@apollo/client";
import { CHALLENGE_ACCESSCODE } from "../graphql/queries";
import { TextField, Button, MenuItem } from "@material-ui/core";
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
function ChallengeAccessCodes({ challengeId }) {
	const classes = useStyles();
	const [search, setSearch] = useState({
		by: "email",
		content: "",
	});
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

	const { loading, error, data } = useQuery(CHALLENGE_ACCESSCODE, {
		variables: {
			challengeId: challengeId,
		},
	});

	function handleSearch() {
		setSearch(searchTextChange);
		if (!search.content) {
			setDatePicker(datePickerChange);
		}
	}

	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}></th>
				<th className={classes.tableColumn}>코드 번호</th>
				<th className={classes.tableColumn}>유효기간</th>
				<th className={classes.tableColumn}>인원수</th>
				<th className={classes.tableColumn}>사용처</th>
				<th className={classes.tableColumn}>생성일시</th>
			</thead>
			<tbody>
				{data.data.map((row) => {
					return (
						<tr key={row.node.codeNumber} id={row.node.codeNumber}>
							<td className={classes.tableColumn}></td>
							<td className={classes.tableColumn}>
								{row.node.codeNumber}
							</td>
							<td className={classes.tableColumn}>
								{row.node.startDate
									? row.node.startDate.slice(0, 10)
									: "~"}{" "}
								~{" "}
								{row.node.endDate
									? row.node.endDate.slice(0, 10)
									: "~"}
							</td>
							<td className={classes.tableColumn}>
								{row.node.maxUsers ? row.node.maxUsers : "~"}
							</td>
							<td className={classes.tableColumn}>
								{row.node.name ? row.node.name : "~"}
							</td>
							<td className={classes.tableColumn}>
								{row.node.createdAt
									? row.node.createdAt.slice(0, 10)
									: "~"}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	console.log(challengeId);
	console.log(data);

	return (
		<div style={{ marginLeft: 20, marginTop: 20 }}>
			<Table data={data.allAccessCodes.edges} />
		</div>
	);
}

export default ChallengeAccessCodes;
