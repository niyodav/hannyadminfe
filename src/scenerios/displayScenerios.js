import React from "react";
import { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TS_SCENERIO } from "../graphql/queries";
import DisplayTable from "../components/displayTable";
import { useParams, useLocation, Link } from "react-router-dom";
import CreateScenerio from "./createScenerios";
import UpdateScenerio from "./updateScenerio";
import DeleteScenerio from "./deleteScenerio";

import { UpdateContext } from "../contexts/updateContext";
import { DeleteIdsContext } from "../contexts/deleteIdsContext";
import { TableSortContext } from "../contexts/sortByContext";
import { CategoryContext } from "../contexts/categoriesContext";

import { makeStyles } from "@material-ui/core/styles";

import { LocationContext } from "../contexts/locationContext";
import { SelectedCategoryContext } from "../contexts/selectedCategoryContext";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import ImportChallenge from "../features/importChallenge";
import Pagination from "../components/Pagination";
import { CursorContext } from "../contexts/cursorContext";

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
}));

function DisplayScenerios({ search }) {
	const classes = useStyles();

	const [updateCategory, setUpdateCategory] = useContext(UpdateContext);
	const [DeleteIdsCategory, setDeleteIdsCategory] = useContext(
		DeleteIdsContext
	);
	const deleteIds = Object.keys(DeleteIdsCategory.scenerio);
	const [locationContext, setLocationContext] = useContext(LocationContext);

	const [sortBy, setSortBy] = useContext(TableSortContext);
	const location = useLocation();

	const { fk } = useParams();
	const [selectedCategoryContext, setSelectedCategoryContext] = useContext(
		SelectedCategoryContext
	);

	const [newCategory, setNewCategory] = useContext(CategoryContext);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);
	const [cursor, setCursor] = useContext(CursorContext);

	const [page, setPage] = useState("");

	const checkPage = (item) => {
		if (data && data.tsScenerio.pageInfo) {
			setCursor({
				scenerio: {
					startCursor: data.tsScenerio.pageInfo.startCursor,
					endCursor: data.tsScenerio.pageInfo.endCursor,
				},
			});
		}
		setPage(item);
	};

	useEffect(() => {
		setLocationContext({ ...locationContext, scenerio: location.pathname });

		// refetch();
		return () => {
			setNewCategory({
				...newCategory,
				scenerio: false,
			});
			setUpdateCategory({
				...updateCategory,
				scenerio: false,
			});
		};
	}, [
		newCategory.scenerio,
		updateCategory.scenerio,
		selectedMenu.scenerio.id,
	]);
	const { loading, error, data, refetch } = useQuery(TS_SCENERIO, {
		// variables: { challengeId: fk, orderBy: sortBy.sortBy },

		variables: {
			challengeId: fk,
			orderBy: "idx",
			first: !page ? 10 : page === "next" ? 10 : null,
			last: page === "prev" ? 10 : null,
			after:
				page === "next" && String(cursor.scenerio)
					? String(cursor.scenerio.endCursor)
					: null,
			before:
				page === "prev" && String(cursor.scenerio)
					? String(cursor.scenerio.startCursor)
					: null,
		},
		// pollInterval: 600000,
	});
	let prevChallengeGroupName = selectedCategoryContext.challengeGroup
		? selectedCategoryContext.challengeGroup
		: false;
	let prevChallengeName = selectedCategoryContext.challenge
		? selectedCategoryContext.challenge
		: false;

	//add/ get  foreign key from clicked tab
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<div className="wrapper">
			<div>
				<h1>
					<img
						src={
							"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"
						}
						alt="increment"
						style={{
							width: 20,
							height: 20,
							marginRight: 10,
							marginLeft: 10,
						}}
					/>
					<Link
						to={locationContext.challengeGroup}
						className={classes.upperLinks}
					>
						????????????
					</Link>
					<img
						src={
							"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/next.png"
						}
						alt="increment"
						style={{
							width: 20,
							height: 15,
							marginRight: 5,
							marginLeft: 5,
						}}
					/>
					{/* <Link to={locationContext.challenge} className={classes.upperLinks}> */}
					<Link
						to={
							prevChallengeGroupName
								? prevChallengeGroupName.id
								: locationContext.challenge
						}
						className={classes.upperLinks}
					>
						{prevChallengeGroupName
							? prevChallengeGroupName.name
							: "?????? ?????????"}
					</Link>
					<img
						src={
							"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/next.png"
						}
						alt="increment"
						style={{
							width: 20,
							height: 15,
							marginRight: 5,
							marginLeft: 5,
						}}
					/>
					{/* <Link to={locationContext.scenerio} className={classes.upperLinks}> */}
					<Link
						to={
							prevChallengeName
								? "/scenerio/" + prevChallengeName.id
								: locationContext.scenerio
						}
						className={classes.upperLinks}
					>
						{prevChallengeName ? prevChallengeName.name : "??????"}
					</Link>
				</h1>
			</div>
			<div className="display-table">
				<ImportChallenge challengeId={fk} />
				<DisplayTable
					data={data.tsScenerio.edges}
					fields={{
						id: "scenerioId",
						name: "name",
						title: "??????",
						nextTableTitle: "?????? ???",
						path: "/block",
						nextTotalCount: "scenerioBlocks",
					}}
					contextKey={"scenerio"}
				/>
				<CreateScenerio scenerioFk={fk} />
			</div>

			<div
				style={{
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Pagination checkState={checkPage} />
			</div>

			{updateCategory.scenerio && (
				<UpdateScenerio
					data={{
						scenerioId: updateCategory.scenerio.id,
						name: updateCategory.scenerio.content,
					}}
				/>
			)}
			{selectedMenu.scenerio.action &&
				selectedMenu.scenerio.action === "delete" && (
					// deleteIds.length>0 &&
					<DeleteScenerio
						data={{ scenerioId: selectedMenu.scenerio.id }}
					/>
				)}
		</div>
	);
}

export default DisplayScenerios;
