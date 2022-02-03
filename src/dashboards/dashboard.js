import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

import { API_BASE_URL, S3_BASE_URL } from "../globalConstants";
// import UploadImage from "../components/uploadImage";
import { useQuery } from "@apollo/client";
import { DAILYDEVICEINFO } from "../graphql/queries";
const useStyles = makeStyles((theme) => ({
	tableColumn: {
		// padding: "25px 25px 25px 25px  25px",
		// fontSize:"15px",

		// fontWeight: "normal",
		padding: "8px",
		textAlign: "center",
		borderBottom: "1px solid #ddd",
	},
}));

function Dashboard() {
	const classes = useStyles();
	const { challengeId } = useParams();

	const { loading, error, data, refetch } = useQuery(DAILYDEVICEINFO);

	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}>날짜</th>
				<th className={classes.tableColumn}>안드로이드</th>
				<th className={classes.tableColumn}>IOS</th>
				<th className={classes.tableColumn}>기타</th>
				<th className={classes.tableColumn}>합계</th>
			</thead>
			<tbody>
				{data.data.dailyDevices.map((row) => {
					return (
						<tr key={row.createdAt} id={row.createdAt}>
							<td className={classes.tableColumn}>
								{row.createdAt}
								{console.log(row)}
							</td>
							<td className={classes.tableColumn}>
								{row.androidCount}
							</td>
							<td className={classes.tableColumn}>
								{row.iosCount}
							</td>
							<td className={classes.tableColumn}>
								{row.otherCount}
							</td>
							<td className={classes.tableColumn}>
								{row.androidCount + row.iosCount}
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
			<h4>
				총 합계:{" "}
				{JSON.parse(data.dailyDeviceInfo[0]).androidTotal +
					JSON.parse(data.dailyDeviceInfo[0]).otherTotal +
					JSON.parse(data.dailyDeviceInfo[0]).iosTotal}{" "}
				{JSON.parse(data.dailyDeviceInfo[0]).total}
			</h4>
			<div>
				{" "}
				안드로이드 합계:{" "}
				{JSON.parse(data.dailyDeviceInfo[0]).androidTotal}
			</div>
			<div> IOS 합계:{JSON.parse(data.dailyDeviceInfo[0]).iosTotal} </div>
			<div>
				{" "}
				기타 합계:{JSON.parse(data.dailyDeviceInfo[0]).otherTotal}{" "}
			</div>

			<Table data={JSON.parse(data.dailyDeviceInfo[0])} />
		</div>
	);
}

export default Dashboard;
