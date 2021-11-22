import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { POINTS_MAXIMUM } from "../../graphql/queries";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import DisplayAHnnyAppTable from "../displayTable";

const useStyles = makeStyles((theme) => ({
	upperLinks: {
		textDecoration: "none",
		color: "black",
		fontSize: 20,
		fontFamily: "Nanum Square Regular",
		"&:hover": {
			color: "#ff8000",
		},
	},
	extend: {
		marginLeft: 50,
		// background: 'red'
	},
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		// height: 400,
		marginLeft: 20,
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
	field: {
		marginTop: 30,
	},
}));

function PointsMaximum({ search, addModify }) {
	const classes = useStyles();

	const { fk } = useParams();

	const [item, setItem] = useState(false);

	function addItem(item) {
		setItem(item);
	}

	useEffect(() => {
		// console.log(item)
		refetch();
		return () => setItem(false);
	}, [item]);

	const { loading, error, data, refetch } = useQuery(POINTS_MAXIMUM);

	console.log(data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;
	if (item) {
		console.log({ [item.name]: item.content });
	}

	return (
		<div className="wrapper">
			<DisplayAHnnyAppTable
				data={data.pointsMaximum.edges}
				fields={{ id: "pointsId" }}
			/>
		</div>
	);
}

export default PointsMaximum;
