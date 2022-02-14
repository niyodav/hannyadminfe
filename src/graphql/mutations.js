import { gql } from "@apollo/client";

export const TOKEN_AUTH = gql`
	mutation($username: String!, $password: String!) {
		tokenAuth(username: $username, password: $password) {
			token
		}
	}
`;

export const VERIFY_TOKEN = gql`
	mutation($token: String!) {
		verifyToken(token: $token) {
			payload
		}
	}
`;

export const CREATE_CHALLENGE_GROUPS = gql`
	mutation($challengeId: String, $name: String) {
		createChallengeGroups(
			input: { challengeId: $challengeId, name: $name }
		) {
			challengeGroup {
				challengeId
				name
			}
		}
	}
`;

export const CREATE_CHALLENGES = gql`
	mutation($challengeId: String, $name: String, $challengegroupId: String) {
		createChallenges(
			input: {
				challengeId: $challengeId
				name: $name
				challengegroupId: $challengegroupId
			}
		) {
			challenge {
				name
			}
		}
	}
`;

export const CREATE_ACCESSCODE = gql`
	mutation(
		$codeNumber: String
		$challengeId: String
		$endDate: Date
		$startDate: Date
		$maxUsers: Int
		$name: String
	) {
		createAccessCode(
			input: {
				codeNumber: $codeNumber
				challengeId: $challengeId
				endDate: $endDate
				startDate: $startDate
				maxUsers: $maxUsers
				name: $name
			}
		) {
			accessCodes {
				codeNumber
			}
		}
	}
`;

export const CREATE_CHALLENGELIST = gql`
	mutation($challengeId: String, $listType: String, $listArray: [String]) {
		createChallengesLists(
			input: {
				challengeId: $challengeId
				listType: $listType
				listArray: $listArray
			}
		) {
			challengeLists {
				listArray
			}
		}
	}
`;
export const CREATE_SCENERIO = gql`
	mutation($scenerioId: String, $name: String, $challengeId: String) {
		createScenerio(
			input: {
				scenerioId: $scenerioId
				name: $name
				challengeId: $challengeId
			}
		) {
			scenerio {
				scenerioId
			}
		}
	}
`;

export const CREATE_TS_BLOCK = gql`
	mutation($blockId: String, $name: String, $scenerioId: String) {
		createTsBlock(
			input: { blockId: $blockId, name: $name, scenerioId: $scenerioId }
		) {
			block {
				name
			}
		}
	}
`;

export const CREATE_BOT_CHATS = gql`
	mutation($botChatId: String, $botChat: String, $blockId: String!) {
		createBotChats(
			input: {
				botChatId: $botChatId
				botChat: $botChat
				blockId: $blockId
			}
		) {
			bot {
				botChatId
			}
		}
	}
`;

export const CREATE_RESPONSES = gql`
	mutation($responseId: String!, $response: String!, $botId: String!) {
		createResponses(
			input: {
				responseId: $responseId
				response: $response
				botId: $botId
			}
		) {
			response {
				responseId
			}
		}
	}
`;

// Updates

export const UPDATE_USER_CHALLENGE_LOG_STATUS = gql`
	mutation($userId: String!, $status: String!) {
		updateUserChallengeLogs(
			filterInputs: { status: "inprogress", userId: $userId }
			input: { status: $status }
		) {
			msg
		}
	}
`;

export const UPDATE_CHALLENGE_GROUPS = gql`
	mutation($challengeId: String!, $name: String!) {
		updateChallengeGroup(
			challengeId: $challengeId
			input: { name: $name }
		) {
			challengeGroup {
				challengeId
				name
			}
		}
	}
`;

export const UPDATE_CHALLENGES = gql`
	mutation($challengeId: String!, $name: String!) {
		updateChallenge(challengeId: $challengeId, input: { name: $name }) {
			challenge {
				name
			}
		}
	}
`;

export const UPDATE_CHALLENGE_BASIC_SETTING = gql`
	mutation(
		$challengeId: String!
		$name: String
		$tags: [String]
		$nextDay: Boolean
		$startOn: Int
		$showOnScreen: Boolean
		$scheduleDays: [Int]
	) {
		updateChallenge(
			challengeId: $challengeId
			input: {
				name: $name
				tags: $tags
				nextDay: $nextDay
				startOn: $startOn
				showOnScreen: $showOnScreen
				scheduleDays: $scheduleDays
			}
		) {
			challenge {
				name
			}
		}
	}
`;

export const UPDATE_CHALLENGE_MAINPAGE_SETTING = gql`
	mutation(
		$challengeId: String!
		$description: String
		$descriptionTitle: String
		$period: Int
		$price: Int
	) {
		updateChallenge(
			challengeId: $challengeId
			input: {
				description: $description
				descriptionTitle: $descriptionTitle
				period: $period
				price: $price
			}
		) {
			challenge {
				name
			}
		}
	}
`;
export const UPDATE_CHALLENGES_APP_DATA = gql`
	mutation(
		$challengeId: String!
		$name: String
		$percentage: Int
		$price: Int
		$colors: String
		$description: String
		$period: Int
	) {
		updateChallenge(
			challengeId: $challengeId
			input: {
				name: $name
				percentage: $percentage
				colors: $colors
				description: $description
				period: $period
				price: $price
			}
		) {
			challenge {
				name
			}
		}
	}
`;

export const UPDATE_SCENERIO = gql`
	mutation($scenerioId: String!, $name: String!) {
		updateScenerio(scenerioId: $scenerioId, input: { name: $name }) {
			scenerio {
				scenerioId
			}
		}
	}
`;

export const UPDATE_TS_BLOCK = gql`
	mutation($blockId: String!, $name: String!) {
		updateBlock(blockId: $blockId, input: { name: $name }) {
			block {
				name
			}
		}
	}
`;

export const UPDATE_BOT_CHATS = gql`
	mutation($botChatId: String!, $botChat: String!) {
		updateBotChats(botChatId: $botChatId, input: { botChat: $botChat }) {
			botChat {
				botChatId
			}
		}
	}
`;
export const UPDATE_BOTUPLOADS_TITLE = gql`
	mutation($uploadId: String!, $title: String) {
		updateBotUploads(uploadId: $uploadId, input: { title: $title }) {
			uploads {
				title
				description
			}
		}
	}
`;

export const UPDATE_BOTUPLOADS_DESCRIPTION = gql`
	mutation($uploadId: String!, $description: String) {
		updateBotUploads(
			uploadId: $uploadId
			input: { description: $description }
		) {
			uploads {
				title
				description
			}
		}
	}
`;

export const UPDATE_RESPONSE = gql`
	mutation($responseId: String, $response: String) {
		updateResponses(
			responseId: $responseId
			input: { response: $response }
		) {
			response {
				responseId
			}
		}
	}
`;

export const UPDATE_CHALLENGELIST = gql`
	mutation($listId: String, $listArray: [String]) {
		updateChallengeList(listId: $listId, input: { listArray: $listArray }) {
			challengeList {
				listArray
			}
		}
	}
`;

export const UPDATE_RESPONSE_REDIRECTS = gql`
	mutation($responseId: String, $redirect: String) {
		updateResponses(
			responseId: $responseId
			input: { redirect: $redirect }
		) {
			response {
				responseId
			}
		}
	}
`;

export const UPDATE_RESPONSE_ACTION = gql`
	mutation($responseId: String, $action: String) {
		updateResponses(responseId: $responseId, input: { action: $action }) {
			response {
				responseId
			}
		}
	}
`;

// delete mutations

export const DELETE_CHALLENGE_GROUPS = gql`
	mutation($challengeId: [String]!) {
		deleteChallengeGroup(challengeId: $challengeId) {
			challengeGroup {
				challengeId
			}
		}
	}
`;

export const DELETE_CHALLENGES = gql`
	mutation($challengeId: [String]!) {
		deleteChallenge(challengeId: $challengeId) {
			challenge {
				name
			}
		}
	}
`;

export const DELETE_SCENERIO = gql`
	mutation($scenerioId: [String]!) {
		deleteScenerio(scenerioId: $scenerioId) {
			scenerio {
				scenerioId
			}
		}
	}
`;

export const DELETE_TS_BLOCK = gql`
	mutation($blockId: [String]!) {
		deleteBlock(blockId: $blockId) {
			block {
				blockId
			}
		}
	}
`;

export const DELETE_BOT_CHATS = gql`
	mutation($botChatId: [String]!) {
		deleteBotChats(botChatId: $botChatId) {
			botChat {
				botChatId
			}
		}
	}
`;

export const DELETE_RESPONSES = gql`
	mutation($responseId: [String]) {
		deleteResponses(responseId: $responseId) {
			response {
				response
			}
		}
	}
`;
