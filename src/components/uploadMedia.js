import React from "react";
import { useState } from "react";

function UploadMedia({ addFile, id, uploadType, title }) {
	const [file, setFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const changeHandler = (e) => {
		setFile(e.target.files[0]);
		setIsSelected(true);
	};
	function handleSubmission() {
		addFile({
			file: file,
			id: id,
			uploadType: uploadType,
			title: title,
		});
	}

	return (
		<div>
			<div>
				<input type="file" name="file" onChange={changeHandler} />

				<button
					onClick={handleSubmission}
					style={{
						width: 100,
						padding: 5,
						background: "blue",
						color: "white",
						margin: 10,
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default UploadMedia;
