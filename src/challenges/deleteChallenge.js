import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CHALLENGES } from "../graphql/mutations";

function DeleteChallenge({ data }) {
	const [deleteChallenges] = useMutation(DELETE_CHALLENGES);

	if (data) {
		deleteChallenges({ variables: { challengeId: data.challengeId } });
	}
	return null;
}
export default DeleteChallenge;
