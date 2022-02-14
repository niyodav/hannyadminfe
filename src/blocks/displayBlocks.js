import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { TS_BLOCKS } from "../graphql/queries";
import { Button, TextField } from "@material-ui/core";
import { useParams, useLocation, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CreateBlock from "./createBlock";
import { SelectedBlockContext } from "../contexts/selectedBlockContext";
import { UpdateContext } from "../contexts/updateContext";
import { CategoryContext } from "../contexts/categoriesContext";

import DisplayBotChat from "../botchats/displayBotChat";
import UpdateBlock from "./updateBlock";
import { LocationContext } from "../contexts/locationContext";

import { SelectedCategoryContext } from "../contexts/selectedCategoryContext";
import Menu from "../modals/menu";
import { SelectedMenuContext } from "../contexts/selectedMenuContext";
import DeleteBlock from "./deleteBlock";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		display: "flex",
		flexDirection: "row",
		overflow: "auto",
		// flex: "1 1 100%",

		// position: "relative",
		// gridTemplateColumns: "100px 100px",
	},
	blockContainer: {
		display: "grid",
		// display:"flex",
		// flexWrap: "wrap",

		gridTemplateColumns: "100px 100px 100px",
		gridAutoRows: "40px",
		gridGap: "5px",
		// gridColumnGap: "10px",
		//  gridRowGap: "2px",

		marginRight: 50,
		marginLeft: 10,
		width: 300,
		margin: 0,
		// height:300,
		position: "relative",
	},
	block: {
		background: "#FFF",
		// width:100,
		// height:40,
		fontSize: 12,
		textAlign: "center",
		overflow: "auto",

		"&:hover": {
			backgroundColor: "#ffebbaff",
		},
	},
	editBlock: {
		gridColumn: "1/2/2/3",
		background: "#00B2E2",
		"&:hover": {
			backgroundColor: "#ffebbaff",
		},
	},
	upperLinks: {
		textDecoration: "none",
		color: "black",
		fontSize: 20,
		fontFamily: "Nanum Square Regular",
		"&:hover": {
			color: "#ff8000",
		},
	},
	blockMenu: {
		zIndex: 10000,
		color: "red",
	},
}));

function DisplayBlocks({ search, addNewEditedValue }) {
	const [selectedBlock, setSelectedBlock] = useContext(SelectedBlockContext);
	const [updateCategory, setUpdateCategory] = useContext(UpdateContext);
	const [locationContext, setLocationContext] = useContext(LocationContext);
	const outerRef = useRef(null);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const [clicked, setClicked] = useState(false);
	const [modifiedvalue, setModifiedValue] = useState({
		id: "",
		name: "",
	});
	const [edit, setEdit] = useState(false);

	const classes = useStyles();
	const { fk } = useParams();
	// const [block, setBlock] = useState(false)
	const location = useLocation();
	const [selectedCategoryContext, setSelectedCategoryContext] = useContext(
		SelectedCategoryContext
	);
	const [block, setBlock] = useState(false);

	const [newCategory, setNewCategory] = useContext(CategoryContext);
	useEffect(() => {
		refetch();
		setLocationContext({ ...locationContext, block: location.pathname });
		return () => {
			setNewCategory({
				...newCategory,
				block: false,
			});
			setUpdateCategory({
				...updateCategory,
				block: false,
			});
			// setEdit(false)
		};
	}, [
		newCategory.block,
		updateCategory.block,
		selectedMenu.block,
		selectedBlock.id,
	]);

	const { loading, error, data, refetch } = useQuery(TS_BLOCKS, {
		variables: {
			scenerioId: selectedCategoryContext.scenerio
				? selectedCategoryContext.scenerio.id
				: fk,
			orderBy: "name",
		},
	});

	function handleBlockClick(e, id, name) {
		setBlock({
			id: id,
			name: name,
		});
		setSelectedBlock(block);
	}

	function handleOnChange(e, id) {
		setModifiedValue({
			id: id,
			name: e.target.value,
		});
	}
	function handleOnBlur(e) {
		e.preventDefault();
		if (modifiedvalue.name) {
			setBlock({
				id: modifiedvalue.id,
				name: modifiedvalue.name,
			});

			setUpdateCategory({ ...updateCategory, block: modifiedvalue });
		}
		setSelectedMenu({
			...setSelectedMenu,
			block: { id: false, action: false },
		});
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;
	if (!block && data.tsBlocks.edges.length > 0) {
		setBlock({
			id: data.tsBlocks.edges[0].node.blockId,
			name: data.tsBlocks.edges[0].node.name,
		});
	}

	let prevChallengeGroupName = selectedCategoryContext.challengeGroup
		? selectedCategoryContext.challengeGroup
		: false;
	let prevChallengeName = selectedCategoryContext.challenge
		? selectedCategoryContext.challenge
		: false;
	let prevScenerioeName = selectedCategoryContext.scenerio
		? selectedCategoryContext.scenerio
		: false;

	return (
		<div>
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
					{/* <Link to={locationContext.challenge} className={classes.upperLinks}> */}
					<Link
						to={
							prevChallengeGroupName
								? "/challenge/" + prevChallengeGroupName.id
								: locationContext.challenge
						}
						className={classes.upperLinks}
					>
						{prevChallengeGroupName
							? prevChallengeGroupName.name
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
					{/* <Link to={locationContext.scenerio} className={classes.upperLinks}> */}
					<Link
						to={
							prevChallengeName
								? "/scenerio/" + prevChallengeName.id
								: locationContext.scenerio
						}
						className={classes.upperLinks}
					>
						{prevChallengeName ? prevChallengeName.name : "차시"}
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
							prevScenerioeName
								? "/block/" + prevScenerioeName.id
								: locationContext.block
						}
						className={classes.upperLinks}
					>
						{prevScenerioeName.name}
					</Link>
				</h1>
			</div>
			{/* <div>
                <h1>
                <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"} alt="increment" style={{width:20,height:20,marginRight:10, marginLeft:10}}/>    
                <Link to={locationContext.challengeGroup} className={classes.upperLinks}>대화관리</Link>
                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/next.png"} alt="increment" style={{width:20,height:15,marginRight:5, marginLeft:5}}/>    
                    <Link to={locationContext.challenge} className={classes.upperLinks}>
                        해피 챌린지
                    </Link>
                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/next.png"} alt="increment" style={{width:20,height:15,marginRight:5, marginLeft:5}}/>    
                    <Link to={locationContext.scenerio} className={classes.upperLinks}>
                        차시
                    </Link>
                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/next.png"} alt="increment" style={{width:20,height:15,marginRight:5, marginLeft:5}}/>    
                    <Link to={locationContext.block} className={classes.upperLinks}>
                     블록

                    </Link>
                </h1>
                </div> */}

			<Menu outerRef={outerRef} contextKey={"block"} />

			<div className={classes.mainContainer}>
				<div className={classes.blockContainer} ref={outerRef}>
					{/* <Button className={classes.editBlock} onClick={handleEdit}>Edit</Button> */}

					{data.tsBlocks.edges.map((row) =>
						selectedMenu.block.action &&
						selectedMenu.block.action === "edit" &&
						selectedMenu.block.id === row.node.blockId ? (
							<form>
								<TextField
									placeholder={row.node.name}
									className={classes.block}
									onChange={(e) => {
										handleOnChange(e, row.node.blockId);
									}}
									value={
										modifiedvalue.id === row.node.id
											? modifiedvalue.name
											: null
									}
									onBlur={handleOnBlur}
									onSubmit={handleOnBlur}
									key={row.node.blockId}
									// ref={outerRef}
								/>
							</form>
						) : (
							<Button
								className={classes.block}
								onClick={(e) => {
									handleBlockClick(
										e,
										row.node.blockId,
										row.node.name
									);
								}}
								key={row.node.blockId}
								id={row.node.blockId}
								// onMouseDown={}
								// ref={outerRef}
								style={
									block.id === row.node.blockId
										? { background: "#ffebbaff" }
										: null
								}
							>
								{/* <div style={{float:'right'}}>
                                ...
                                </div> */}
								{/* <div> */}
								{row.node.name}
								{/* </div> */}
								{/* 
                                <div className={classes.blockMenu}>
                                    <div>edit</div>
                                    <div>delete</div>
                                    <div>copy</div>
                                </div> */}
							</Button>
						)
					)}

					<div>
						<CreateBlock blockFk={fk} />
					</div>
				</div>

				<div>
					<DisplayBotChat blockId={block} />
				</div>
				{selectedMenu.block.action &&
					selectedMenu.block.action === "edit" &&
					updateCategory.block.name && (
						// updateCategory.block.name && edit &&
						<UpdateBlock
							data={{
								blockId: updateCategory.block.id,
								name: updateCategory.block.name,
							}}
						/>
					)}

				{selectedMenu.block.action &&
					selectedMenu.block.action === "delete" && (
						// updateCategory.block.name && edit &&

						<DeleteBlock
							data={{ blockId: selectedMenu.block.id }}
						/>
					)}
			</div>
		</div>
	);
}

export default DisplayBlocks;
