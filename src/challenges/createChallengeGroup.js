import React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHALLENGE_GROUPS } from "../graphql/mutations";
import CreateCategory from "../components/createCategory";

function CreateChallengeGroup({ addAdded }) {
	const [added, setAdded] = useState(false);

	const [items, setItems] = useState({
		id: "",
		name: "",
	});

	const [createChallengeGroup, { data, error }] = useMutation(
		CREATE_CHALLENGE_GROUPS
	);

	useEffect(() => {
		if (items.name) {
			createChallengeGroup({
				variables: { challengeId: items.id, name: items.name },
			});

			setAdded(true);
			addAdded(added);
			setItems({ ...items, name: "" });
		}
	}, [items.name]);

	function addItem(item) {
		setItems(item);
	}

	function addAdded(add) {
		setAdded(add);
	}

	return (
		<div>
			<CreateCategory
				addItem={addItem}
				addAdded={addAdded}
				label="해피 챌린지 그룹명"
				category={"challengeGroup"}
			/>
		</div>
	);
}
export default CreateChallengeGroup;
