import React from "react";
import { useState, useContext, useEffect, useCallback } from "react";
import { useQuery, ApolloConsumer } from "@apollo/client";
import { CHALLENGES } from "../graphql/queries";
import DisplayTable from "../components/displayTable";
import { useParams } from "react-router-dom";
import CreateChallenge from "./createChallenge";
import DeleteChallenge from "./deleteChallenge";
import UpdateChallenge from "./updateChallenge";

import { UpdateContext } from "../contexts/updateContext";
import { DeleteIdsContext } from "../contexts/deleteIdsContext";
import { TableSortContext } from "../contexts/sortByContext";
import { CategoryContext } from "../contexts/categoriesContext";
import { useLocation, useHistory, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { LocationContext } from "../contexts/locationContext";
import { SelectedCategoryContext } from "../contexts/selectedCategoryContext";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import ImportChallenge from "../features/importChallenge";
import Page from "../Page/page";
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

function DisplayChallenges({ addModify }) {
	const [locationContext, setLocationContext] = useContext(LocationContext);
	const [sortBy, setSortBy] = useContext(TableSortContext);

	const [updateCategory, setUpdateCategory] = useContext(UpdateContext);
	const [DeleteIdsCategory, setDeleteIdsCategory] = useContext(
		DeleteIdsContext
	);
	const [selectedCategoryContext, setSelectedCategoryContext] = useContext(
		SelectedCategoryContext
	);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const deleteIds = Object.keys(DeleteIdsCategory.challenge);
	const classes = useStyles();

	const { fk } = useParams();
	const location = useLocation();
	const [newCategory, setNewCategory] = useContext(CategoryContext);
	const [page, setPage] = useState("");
	const [cursor, setCursor] = useContext(CursorContext);

	const checkPage = (item) => {
		if (data && data.challenges.pageInfo) {
			setCursor({
				challenge: {
					startCursor: data.challenges.pageInfo.startCursor,
					endCursor: data.challenges.pageInfo.endCursor,
				},
			});
		}
		setPage(item);
	};

	useEffect(() => {
		setLocationContext({
			...locationContext,
			challenge: location.pathname,
		});
		return () => {
			setNewCategory({
				...newCategory,
				challenge: false,
			});
			setUpdateCategory({
				...updateCategory,
				challenge: false,
			});
			setSortBy("-idx");
		};
	}, [
		newCategory.challenge,
		updateCategory.challenge,
		selectedMenu.challenge.id,
	]);

	const { loading, error, data, refetch } = useQuery(CHALLENGES, {
		variables: {
			orderBy: sortBy.sortBy,
			first: !page ? 10 : page === "next" ? 10 : null,
			last: page === "prev" ? 10 : null,
			after:
				page === "next" && String(cursor.challenge)
					? String(cursor.challenge.endCursor)
					: null,
			before:
				page === "prev" && String(cursor.challenge)
					? String(cursor.challenge.startCursor)
					: null,
		},
	});

	let challengeGroup = selectedCategoryContext.challengeGroup
		? selectedCategoryContext.challengeGroup
		: false;

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<Page>
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
							대화관리
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
						<Link
							to={
								challengeGroup
									? "/challenge/" + challengeGroup.id
									: locationContext.challenge
							}
							className={classes.upperLinks}
						>
							{challengeGroup
								? challengeGroup.name
								: "해피 챌린지"}
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
					</h1>
				</div>
				<div className="display-table">
					<ImportChallenge challengeGroupId={fk} />
					<DisplayTable
						data={data.challenges.edges}
						fields={{
							id: "challengeId",
							name: "name",
							title: "시나리오 그룹명 ",
							nextTableTitle: "차시",
							path: "/scenerio",
							nextTotalCount: "challengeScenerio",
							setting: "세부설정",
							media: "미디어",
						}}
						contextKey={"challenge"}
					/>

					<CreateChallenge challengeFk={fk} />
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

				{updateCategory.challenge && (
					<UpdateChallenge
						data={{
							challengeId: updateCategory.challenge.id,
							name: updateCategory.challenge.content,
						}}
					/>
				)}
				{selectedMenu.challenge.action &&
					selectedMenu.challenge.action === "delete" && (
						// deleteIds.length>0 &&
						<DeleteChallenge
							data={{ challengeId: selectedMenu.challenge.id }}
						/>
					)}
			</div>
		</Page>
	);
}

export default DisplayChallenges;
