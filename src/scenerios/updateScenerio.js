import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SCENERIO } from "../graphql/mutations";

function UpdateScenerio({ data }) {
	const [updateScenerio] = useMutation(UPDATE_SCENERIO);

	if (data) {
		updateScenerio({ variables: data });
		// window.location.reload(false);
	}
	return null;
}
export default UpdateScenerio;
