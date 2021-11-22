import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { TS_BLOCKS } from "../graphql/queries";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CreateBlock from "../blocks/createBlock";
import DisplayBotChat from "./displayBotChat";
import UpdateBlock from "../blocks/updateBlock";

const useStyles = makeStyles((theme) => ({
	block: {
		//  display:"flex",

		flexBasis: "100%",
	},
	allBlocks: {
		display: "flex",
		justifyContent: "space-between",
		flexGrow: 1,
	},
	clickedBlock: {
		backgroundColor: "#FFF",
	},
	chats: {
		borderWidth: 1,
		borderStyle: "none none none solid",
		borderColor: "black",
		borderTopColor: "white",
		borderRadius: 1,
	},
	blockGrid: {
		display: "flex",

		flexDirection: "column",
		flexFlow: "wrap",
	},
	blockGridChild: {
		flex: "1 1 160px",
	},
}));

function DisplayBlocks({ search, addNewEditedValue }) {
	const classes = useStyles();
	const { fk } = useParams();
	const [add, setAdd] = useState(false);
	const [block, setBlock] = useState(false);
	const [edit, setEdit] = useState(false);
	const [newEditedValue, setNewEditedValue] = useState({
		name: "",
		prevName: "",
		id: "",
	});

	const [newBlockName, setNewBlockName] = useState({
		name: "",
		prevName: "",
		id: "",
	});

	const { loading, error, data } = useQuery(TS_BLOCKS, {
		variables: { scenerioId: fk },
	});

	function handleClick(e) {
		setAdd(true);
	}
	function handleEdit(e) {
		setEdit("edit");
	}

	function handleEditChanges(e, id, prevName) {
		setNewEditedValue({
			id: id,
			name: e.target.value,
			prevName: prevName,
		});
	}
	function submitEdits(e) {
		e.preventDefault();

		if (newEditedValue.name.trim()) {
			setNewBlockName(newEditedValue);
			setNewEditedValue({
				name: "",
				prevName: "",
				id: "",
			});
		}
	}
	function handleBlockClick(e, id, name) {
		setBlock({
			id: id,
			name: name,
		});
	}
	//add/ get  foreign key from clicked tab

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;
	if (!block && data.tsBlocks.edges.length > 0) {
		setBlock({
			id: data.tsBlocks.edges[0].node.blockId,
			name: data.tsBlocks.edges[0].node.name,
		});
	}

	return (
		<div className="wrapper">
			<div className={classes.allBlocks}>
				<form onSubmit={submitEdits}>
					<div>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleEdit}
						>
							Edit
						</Button>
					</div>
					<div className="display-component">
						<Grid
							container
							spacing={2}
							className={classes.blockGrid}
						>
							{data.tsBlocks.edges.map((row) => (
								<Grid item className={classes.blockGridChild}>
									{edit && block.id === row.node.blockId ? (
										<TextField
											defaultValue={row.node.name}
											className={classes.block}
											onChange={(e) => {
												handleEditChanges(
													e,
													row.node.blockId,
													row.node.name
												);
											}}
										/>
									) : (
										<Button
											variant="contained"
											className={classes.block}
											onClick={(e) => {
												handleBlockClick(
													e,
													row.node.blockId,
													row.node.name
												);
											}}
											key={row.node.blockId}
										>
											{row.node.name}
										</Button>
									)}
								</Grid>
							))}
						</Grid>
						<div>
							<CreateBlock blockFk={fk} />
						</div>
					</div>
				</form>
			</div>

			<div className="botcontainer-wrapper">
				{
					// chats printed right side
					data.tsBlocks.edges.length > 0 && (
						<div className={classes.chats}>
							<DisplayBotChat
								blockId={block.id}
								blockName={block.name}
							/>
						</div>
					)
				}
			</div>

			{newBlockName.name && newBlockName.prevName !== newBlockName.name && (
				<UpdateBlock
					data={{
						blockId: newBlockName.id,
						name: newBlockName.name,
					}}
				/>
			)}
		</div>
	);
}

export default DisplayBlocks;
