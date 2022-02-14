import React from "react";
import { useState, useContext, useEffect, useCallback } from "react";

function Pagination({ checkState }) {
	// const getPages = function (pages = []) {
	// 	for (var i = 1; i <= 20; i++) {
	// 		pages.push(
	// 			<div
	// 				key={i}
	// 				style={{
	// 					width: 20,
	// 					height: 20,
	// 					margin: "10px 0 0 10px",
	// 					border: "1px solid black",
	// 				}}
	// 			>
	// 				{i}
	// 			</div>
	// 		);
	// 	}
	// 	return pages;
	// };
	useEffect(() => {}, []);
	return (
		<div style={{ flexDirection: "row", margin: "10px 0 10px 0" }}>
			<div
				style={{
					width: 50,
					height: 20,
					cursor: "pointer",
					background: "orange",
					alignItems: "center",
					margin: "10px 0 0 10px",
					padding: 10,
				}}
				onClick={() => checkState("prev")}
			>
				<span style={{ color: "#ffffff" }}>PREV</span>
			</div>
			<div
				style={{
					width: 50,
					height: 20,
					alignItems: "center",
					cursor: "pointer",
					margin: "10px 0 0 10px",
					padding: 10,
				}}
			>
				<span>PAGES</span>
			</div>
			<div
				style={{
					width: 50,
					height: 20,
					background: "orange",
					alignItems: "center",
					margin: "10px 0 0 10px",
					cursor: "pointer",
					padding: 10,
				}}
				onClick={() => checkState("next")}
			>
				<span style={{ color: "#ffffff" }}>NEXT</span>
			</div>
		</div>
	);
}
export default Pagination;
