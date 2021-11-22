import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHALLENGES } from "../graphql/mutations";

function UpdateChallenge({ data }) {
	const [updateChallenges] = useMutation(UPDATE_CHALLENGES);

	if (data) {
		updateChallenges({ variables: data });
		window.location.reload(false);
	}

	return null;
}
export default UpdateChallenge;
