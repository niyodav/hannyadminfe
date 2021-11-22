import React from "react";
import { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import UploadFiles from "../features/createFiles";
import CreateText from "../features/createText";
import { SelectedFeatureContext } from "../contexts/featuresContext";

function CreateBotChat({ blockFk, displays }) {
	const [selectedfeature, setSelectedfeature] = useContext(
		SelectedFeatureContext
	);

	const [items, setItems] = useState({
		content: "",
		category: "",
		pk: "",
	});
	const [files, setFiles] = useState({
		content: "",
		category: "",
		pk: "",
		uploadType: "",
	});
	const [botButton, setBotButton] = useState("none");

	function addItem(item) {
		setItems(item);
	}

	function addFile(file) {
		setFiles(file);
	}
	function handleBotClick(e) {
		setBotButton("block");
	}

	return (
		<div>
			<div>
				<div>
					{selectedfeature && selectedfeature !== "text" ? (
						<UploadFiles
							addFile={addFile}
							uploadType={selectedfeature}
							blockId={blockFk}
						/>
					) : (
						<CreateText addText={addItem} label={"bot chat"} />
					)}
				</div>
			</div>
		</div>
	);
}
export default CreateBotChat;
