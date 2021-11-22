import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TS_BLOCK } from "../graphql/mutations";

function UpdateBlock({ data }) {
	const [updateTsBlock] = useMutation(UPDATE_TS_BLOCK);

	if (data) {
		updateTsBlock({ variables: data });
		// window.location.reload(false);
	}
	return null;
}
export default UpdateBlock;
