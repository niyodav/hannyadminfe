import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";

import { API_BASE_URL, S3_BASE_URL } from "../globalConstants";
import UploadMedia from "../components/uploadMedia";
import { useQuery } from "@apollo/client";
import { BOTCHAT_UPLOADS } from "../graphql/queries";
const useStyles = makeStyles((theme) => ({
	tableColumn: {
		padding: "8px",
		textAlign: "center",
		borderBottom: "1px solid #ddd",
	},
}));
function UploadBotChatMedia() {
	const classes = useStyles();
	const { challengeId } = useParams();
	const [selected, setSelected] = useState("{{IMAGE}}");

	const { loading, error, data } = useQuery(BOTCHAT_UPLOADS, {
		variables: {
			challengeId: challengeId,
			botChatIcontains: selected,
		},
	});
	const handleSubmission = (item) => {
		const formData = new FormData();
		formData.append("botChatId", item.id);
		formData.append("upload", item.file);
		formData.append("uploadType", item.uploadType);

		axios
			.post(API_BASE_URL + "api/v1/botchats/upload/", formData)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	};

	function addFile(item) {
		handleSubmission(item);
	}

	useEffect(() => {
		return () => {
			setFile("");
		};
	}, []);

	const [file, setFile] = useState();

	const Table = (data) => (
		<table>
			<thead>
				<th className={classes.tableColumn}>차시</th>
				<th className={classes.tableColumn}>태그명</th>
				<th className={classes.tableColumn}>미디어 업로드</th>
				<th className={classes.tableColumn}>마지막 업데이트 일시</th>
			</thead>
			<tbody>
				{data.data.map((row) => (
					<tr key={row.node.botChatId} id={row.node.botChatId}>
						<td className={classes.tableColumn}>
							{row.node.block.name}
						</td>
						<td className={classes.tableColumn}>
							{row.node.uploadsBotChats.edges.length > 0 ? (
								<div>
									{row.node.uploadsBotChats.edges.map(
										(media) => (
											<div>
												<a
													href={
														S3_BASE_URL +
														media.node.upload
													}
												>
													{media.node.upload}
												</a>
											</div>
										)
									)}
								</div>
							) : (
								row.node.botChat
							)}
						</td>
						<td className={classes.tableColumn}>
							<UploadMedia
								addFile={addFile}
								id={row.node.botChatId}
								uploadType={"IMAGE"}
							/>
						</td>
						<td className={classes.tableColumn}>
							{row.node.uploadsBotChats.edges.length > 0
								? row.node.uploadsBotChats.edges[0].node
										.createdAt
								: "~"}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;

	return (
		<div style={{ marginLeft: 20, marginTop: 20 }}>
			<select onChange={(e) => setSelected(e.target.value)}>
				<option>{"{{IMAGE}}"}</option>
				<option>{"{{AUDIO}}"}</option>
				<option>{"{{VIDEO}}"}</option>
				<option>{"GALLERY"}</option>
				<option>{"PDF"}</option>
			</select>
			<Table data={data.botChats.edges} />
		</div>
	);
}

export default UploadBotChatMedia;
