import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { TableSortContext } from "../contexts/sortByContext";
import { UpdateContext } from "../contexts/updateContext";
import { SelectedCategoryContext } from "../contexts/selectedCategoryContext";

import { DeleteIdsContext } from "../contexts/deleteIdsContext";
import Menu from "../modals/menu";

import { SelectedMenuContext } from "../contexts/selectedMenuContext";

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: "none",
		color: theme.palette.text.primary,
		"&:hover": {
			backgroundColor: "#ffebbaff",
		},
	},
	// table: {
	//     minWidth: 1000,
	// },
	submitTableActions: {
		margin: "5px",
	},
	showSubmitTableActions: {
		display: "none",
	},
	actionButton: {
		float: "right",
		margin: 5,
		borderRadius: 7,
		borderColor: "#3f51b5",
		backgroundColor: "#ffff",
	},
	tableRow: {
		background: "",
	},

	Table: {
		borderCollapse: "collapse",
		width: "100%",
		padding: 10,
	},
	tableTdTh: {
		// padding: "25px 25px 25px 25px  25px",
		// fontSize:"15px",

		// fontWeight: "normal",
		padding: "8px",
		textAlign: "center",
		borderBottom: "1px solid #ddd",
	},
	action: {
		width: 100,
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#ffebbaff",
		},
	},
}));

function DisplayTable({
	data,
	fields,
	addFk,
	addModify,
	addModifiedValues,
	addSortBy,
	contextKey,
}) {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [currentAction, setCurrentAction] = useState("");

	const [sortBy, setSortBy] = useContext(TableSortContext);
	const [updateCategory, setUpdateCategory] = useContext(UpdateContext);
	const [deleteIdsCategory, setDeleteIdsCategory] = useContext(
		DeleteIdsContext
	);
	const [selectedCategory, setSelectedCategory] = useContext(
		SelectedCategoryContext
	);
	const [selectedMenu, setSelectedMenu] = useContext(SelectedMenuContext);

	const [modifiedvalue, setModifiedValue] = useState({
		action: "",
		id: "",
		content: "",
	});
	const wrapperRef = useRef(null);
	const outerRef = useRef(null);

	function handleOnChange(e, id, fieldName) {
		setModifiedValue({
			action: currentAction,
			id: id,
			content: e.target.value,
			fieldName: fieldName ? fieldName : false,
		});
	}
	function handleOnBlur(e) {
		if (modifiedvalue.content) {
			setUpdateCategory({
				...updateCategory,
				[contextKey]: modifiedvalue,
			});
			setChecked(false);
			setCurrentAction(false);
			setIsOpen(false);
			setSelectedMenu({
				...selectedMenu,
				[contextKey]: { id: false, action: false },
			});
		}
	}

	function handleSorting(e, field) {
		if (sortBy.sortBy !== field) {
			setSortBy({
				sortBy: field,
			});
		} else {
			setSortBy({
				sortBy: "-" + field,
			});
		}
	}

	function handleClickedLinks(e, id, name) {
		setSelectedCategory({
			...selectedCategory,
			[contextKey]: { id: id, name: name },
		});
	}

	let lastCheked = checked ? Object.keys(checked) : null;

	if (lastCheked !== null) {
		lastCheked = lastCheked[lastCheked.length - 1];
	}
	let index = 0;

	return (
		<div classes="wrapper">
			<div>
				<Menu outerRef={outerRef} contextKey={contextKey} />

				<table
					style={{ width: "80%" }}
					className={classes.Table}
					ref={outerRef}
				>
					<thead>
						<tr>
							<th className={classes.tableTdTh}></th>
							<th className={classes.tableTdTh}> 구분 </th>
							<th
								onClick={(e) => {
									handleSorting(e, "name");
								}}
								style={{ cursor: "pointer" }}
								className={classes.tableTdTh}
							>
								{/* <button onClick={(e)=>{handleSorting(e,"name")}}> */}

								{fields["title"]}
								{sortBy.sortBy && sortBy.sortBy[0] === "-" ? (
									<img
										src={
											"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/up-arrow.png"
										}
										alt="increment"
										style={{
											width: 20,
											height: 15,
											marginLeft: 5,
										}}
									/>
								) : (
									<img
										src={
											"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/down-arrow.png"
										}
										alt="decrement"
										style={{
											width: 20,
											height: 15,
											marginLeft: 5,
										}}
									/>
								)}
							</th>
							<th className={classes.tableTdTh}>
								{fields["nextTableTitle"]}
							</th>
							<th
								onClick={(e) => {
									handleSorting(e, "last_updated");
								}}
								style={{ cursor: "pointer" }}
								className={classes.tableTdTh}
							>
								{/* <button onClick={(e)=>{handleSorting(e,"last_updated")}}> */}
								마지막 업데이트 일시
								{sortBy.sortBy && sortBy.sortBy[0] === "-" ? (
									<img
										src={
											"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/up-arrow.png"
										}
										alt="increment"
										style={{
											width: 20,
											height: 15,
											marginLeft: 5,
										}}
									/>
								) : (
									<img
										src={
											"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/down-arrow.png"
										}
										alt="decrement"
										style={{
											width: 20,
											height: 15,
											marginLeft: 5,
										}}
									/>
								)}
								{/* </button> */}
							</th>
							{fields["media"] && (
								<th className={classes.tableTdTh}>
									{fields["media"]}
								</th>
							)}
							{fields["setting"] && (
								<th className={classes.tableTdTh}>
									{fields["setting"]}
								</th>
							)}
						</tr>
					</thead>
					<tbody ref={outerRef}>
						{data.map((row) => (
							<tr
								key={row.node[fields.id]}
								id={row.node[fields.id]}
								style={
									checked[row.node[fields.id]]
										? { background: "#BEBEBE" }
										: null
								}
							>
								<td className={classes.tableTdTh}>
									{/* <input type="checkbox" name="checkbox"  value={checked}  onChange={(e)=>{checkedBox(e,row.node[fields.id])}}  checked={checked&&checked[row.node[fields.id]]?true:false} 
                                    />*/}
								</td>
								<td
									className={classes.tableTdTh}
									onClick={(e) => {
										checked
											? setIsOpen(true)
											: setIsOpen(false);
									}}
								>
									{(index += 1)}
								</td>

								<td
									className={classes.tableTdTh}
									onClick={(e) => {
										checked
											? setIsOpen(true)
											: setIsOpen(false);
									}}
								>
									{selectedMenu[contextKey].id ===
										row.node[fields.id] &&
									selectedMenu[contextKey].action ===
										"edit" ? (
										// checked[row.node[fields.id]] && currentAction==="edit" ?
										<TextField
											placeholder={row.node[fields.name]}
											onChange={(e) => {
												handleOnChange(
													e,
													row.node[fields.id],
													currentAction,
													fields.name
												);
											}}
											value={
												modifiedvalue.id ===
												row.node[fields.id]
													? modifiedvalue.content
													: ""
											}
											onBlur={handleOnBlur}
											onSubmit={handleOnBlur}
											onMouseOut={handleOnBlur}
										/>
									) : (
										<Link
											to={
												fields.path +
												"/" +
												row.node[fields.id]
											}
											className={classes.link}
											onClick={(e) => {
												handleClickedLinks(
													e,
													row.node[fields.id],
													row.node[fields.name]
												);
											}}
										>
											{row.node[fields.name]}
										</Link>
									)}
								</td>
								<td
									className={classes.tableTdTh}
									onClick={(e) => {
										checked
											? setIsOpen(true)
											: setIsOpen(false);
									}}
								>
									{row.node[fields.nextTotalCount].totalCount}
								</td>
								<td
									key={row.node[fields.id]}
									className={classes.tableTdTh}
									onClick={(e) => {
										checked
											? setIsOpen(true)
											: setIsOpen(false);
									}}
								>
									<Link
										to={
											fields.path +
											"/" +
											row.node[fields.id]
										}
										className={classes.link}
										onClick={(e) => {
											handleClickedLinks(
												e,
												row.node[fields.id],
												row.node[fields.name]
											);
										}}
									>
										{row.node.lastUpdated
											? row.node.lastUpdated
													.slice(0, 16)
													.replace("T", " ")
											: null}
									</Link>
								</td>

								{fields.media && (
									<td
										key={row.node[fields.id]}
										className={classes.tableTdTh}
									>
										<Link
											to={
												"/botchatimages/" +
												row.node[fields.id]
											}
											className={classes.link}
											// onClick={(e) => {
											// 	handleClickedLinks(
											// 		e,
											// 		row.node[fields.id],
											// 		row.node[fields.name]
											// 	);
											// }}
										>
											상세보기
										</Link>
									</td>
								)}
								{fields.setting && (
									<td
										key={row.node[fields.id]}
										className={classes.tableTdTh}
									>
										<Link
											to={
												"/setting/" +
												row.node[fields.id]
											}
											// to={
											// 	fields.path +
											// 	"/" +
											// 	row.node[fields.id]
											// }
											className={classes.link}
											onClick={(e) => {
												handleClickedLinks(
													e,
													row.node[fields.id],
													row.node[fields.name]
												);
											}}
										>
											설정하기
										</Link>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default DisplayTable;
