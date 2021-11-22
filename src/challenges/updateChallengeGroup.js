import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHALLENGE_GROUPS } from "../graphql/mutations";

function UpdateChallengeGroup({ data }) {
	const [updateChallengeGroup] = useMutation(UPDATE_CHALLENGE_GROUPS);

	if (data) {
		updateChallengeGroup({ variables: data });
		// window.location.reload(false);
	}
	return <div>updated</div>;
}
export default UpdateChallengeGroup;
