import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CHALLENGE_GROUPS } from "../graphql/mutations";

function DeleteChallengeGroup({ data }) {
	const [deleteChallengeGroup] = useMutation(DELETE_CHALLENGE_GROUPS);

	if (data) {
		deleteChallengeGroup({ variables: { challengeId: data.challengeId } });
	}
	return null;
}
export default DeleteChallengeGroup;
