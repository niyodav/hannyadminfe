import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SCENERIO } from "../graphql/mutations";

function DeleteScenerio({ data }) {
	const [deleteScenerio] = useMutation(DELETE_SCENERIO);

	if (data) {
		deleteScenerio({ variables: { scenerioId: data.scenerioId } });

		// window.location.reload(false);
	}
	return null;
}
export default DeleteScenerio;
