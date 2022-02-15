import React from "react";
import { useState, useEffect, useCallback } from "react";
import checked from "../assets/images/icon_checked.png";
import unchecked from "../assets/images/icon_unchecked.png";
import { makeStyles } from "@material-ui/core/styles";
import { DISABLE_ACCESS_CODE } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { CHALLENGE_ACCESSCODE } from "../graphql/queries";
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

	const [deleteList, setDeleteList] = useState([]);

	const now = new Date();
	const prevDate = new Date();
	prevDate.setDate(prevDate.getDate() - 7);

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

	const { loading, error, data, refetch } = useQuery(CHALLENGE_ACCESSCODE, {
		variables: {
			challengeId: challengeId,
			inactive: false,
		},
	});

	const [disableAccessCode] = useMutation(DISABLE_ACCESS_CODE);

	const onDeleteCheckChange = useCallback(
		(code) => {
			if (deleteList.length > 0) {
				const items = deleteList.filter((item) => item !== code);
				setDeleteList(items);
			} else {
				setDeleteList([...deleteList, code]);
			}
		},
		[deleteList, setDeleteList]
	);

	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}>선택</th>
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
							<td className={classes.tableColumn}>
								<img
									style={{ width: 20, height: 20 }}
									src={
										deleteList.find(
											(element) =>
												element === row.node.codeNumber
										) !== undefined
											? checked
											: unchecked
									}
									alt=""
									onClick={() =>
										onDeleteCheckChange(row.node.codeNumber)
									}
								/>
							</td>
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

	return (
		<div style={{ marginLeft: 20, marginTop: 20 }}>
			<Table data={data.allAccessCodes.edges} />
			<div
				style={{
					alignItems: "center",
					margin: "20px 0 20px 0",
				}}
			>
				<button
					style={{
						background: "green",
						width: 100,
						padding: 10,
						color: "white",
						fontWeight: "bold",
					}}
					onClick={() => {
						disableAccessCode({
							variables: {
								codeNumbers: deleteList,
								inactive: true,
							},
						});
						refetch();
					}}
				>
					코드 삭제하기
				</button>
			</div>
		</div>
	);
}

export default ChallengeAccessCodes;
