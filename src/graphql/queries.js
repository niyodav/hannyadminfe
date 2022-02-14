import { gql } from "@apollo/client";

export const CHALLENGE_GROUPS = gql`
	query($orderBy: String!) {
		challengeGroups(orderBy: $orderBy) {
			edges {
				node {
					challengeId
					name
					lastUpdated
					groupChallenge {
						totalCount
					}
				}
			}
		}
	}
`;

export const ALL_USERS = gql`
	query(
		$orderBy: String
		$email: String
		$usernameContains: String
		$dateJoinedLte: String
		$dateJoinedGte: String
		$first: Int
		$last: Int
		$after: String
		$before: String
	) {
		allUsers(
			orderBy: $orderBy
			usernameContains: $usernameContains
			email: $email
			dateJoinedLte: $dateJoinedLte
			dateJoinedGte: $dateJoinedGte
			first: $first
			last: $last
			before: $before
			after: $after
		) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				node {
					email
					dateJoined
					username
					UserProfile {
						nickname
					}
				}
			}
		}
	}
`;

export const USER_INFO = gql`
	query($username: String) {
		allUsers(username: $username) {
			edges {
				node {
					username
					email
					dateJoined
					UserProfile {
						nickname
						lastMessageTime
					}
					UserDeviceInfo {
						totalCount
						edges {
							node {
								os
							}
						}
					}
					userSetting {
						marketingAlarm
					}
				}
			}
		}
	}
`;

export const USER_TOTAL_POINTS = gql`
	query($userId: String!) {
		userTotalPoints(userId: $userId)
	}
`;

export const USER_CHALLENGE_LOG = gql`
	query($userId: String!, $challengeType: String, $status: String) {
		userChallengeLogs(
			orderBy: "-createdAt"
			userId: $userId
			challengeType: $challengeType
			status: $status
		) {
			edges {
				node {
					logId
					createdAt
					status
					startDate
					endDate
					notificationTime
					challenge {
						name
					}
					accesscode {
						codeNumber
					}
				}
			}
		}
	}
`;

export const CHALLENGES = gql`
	query(
		$orderBy: String
		$first: Int
		$last: Int
		$after: String
		$before: String
	) {
		challenges(
			orderBy: $orderBy
			first: $first
			last: $last
			before: $before
			after: $after
		) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				cursor
				node {
					name
					challengeId
					lastUpdated
					challengeScenerio {
						totalCount
					}
				}
			}
		}
	}
`;

export const TS_SCENERIO_NAMES = gql`
	query($challengeId: String!) {
		tsScenerio(challengeId: $challengeId) {
			edges {
				node {
					name
					scenerioId
				}
			}
		}
	}
`;

export const TS_SCENERIO = gql`
	query(
		$challengeId: String!
		$orderBy: String
		$first: Int
		$last: Int
		$after: String
		$before: String
	) {
		tsScenerio(
			challengeId: $challengeId
			orderBy: $orderBy
			first: $first
			last: $last
			before: $before
			after: $after
		) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				node {
					name
					scenerioId
					lastUpdated
					scenerioBlocks {
						totalCount
					}
				}
			}
		}
	}
`;

export const ONE_CHALLENGES = gql`
	query($challengeId: String!) {
		challenges(challengeId: $challengeId) {
			edges {
				node {
					name
					challengeId
					startOn
					showOnScreen
					nextDay
					scheduleDays
					lists
					period
					price
					description
					descriptionTitle
					tags

					ChallengeListslists {
						edges {
							node {
								listId
								listArray
								listType
							}
						}
					}
				}
			}
		}
	}
`;

export const ALL_CHALLENGES = gql`
	query {
		challenges {
			edges {
				node {
					name
					challengeId
					period
					percentage
					colors

					description
					price
				}
			}
		}
	}
`;
export const CHALLENGES_MANAGEMENT = gql`
	query {
		challenges {
			edges {
				node {
					name
					challengeId
					lastUpdated
				}
			}
		}
	}
`;

export const CHALLENGES_ORDERBY = gql`
	query($orderBy: String!) {
		challenges(orderBy: $orderBy) {
			edges {
				node {
					name
					challengeId
					lastUpdated
					challengeScenerio {
						totalCount
					}
				}
			}
		}
	}
`;

export const CHALLENGES_FILTER_CHALLENGEID = gql`
	query($challengeId: String!) {
		challenges(challengeId: $challengeId) {
			edges {
				node {
					challengeId
					challengeScenerio {
						totalCount
						edges {
							node {
								scenerioId
								name
								scenerioBlocks {
									totalCount
									edges {
										node {
											blockId
											name
											botBlock {
												edges {
													node {
														botChatId
														botChat
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const CHALLENGES_TO_BLOCK = gql`
	query($challengeId: String!) {
		challenges(challengeId: $challengeId) {
			edges {
				node {
					challengeScenerio {
						edges {
							node {
								scenerioId
								name
								scenerioBlocks {
									edges {
										node {
											blockId
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const TS_BLOCKS = gql`
	query($scenerioId: String!, $orderBy: String!) {
		tsBlocks(scenerioId: $scenerioId, orderBy: $orderBy) {
			edges {
				node {
					name
					blockId
				}
			}
		}
	}
`;
export const BLOCK_PER_CHALLENGE = gql`
	query {
		tsBlocks {
			edges {
				node {
					name
					blockId
					lastUpdated
				}
			}
		}
	}
`;

export const BLOCKS_BOTCHAT = gql`
	query($scenerioId: String!) {
		tsBlocks(scenerioId: $scenerioId) {
			edges {
				node {
					name
					blockId
					lastUpdated
				}
			}
		}
	}
`;
export const BLOCKS_TO_CHALLENGE = gql`
	query($challengeIdFilter: String!) {
		tsBlocks(challengeIdFilter: $challengeIdFilter) {
			edges {
				node {
					blockId
					name
					botBlock {
						edges {
							node {
								botChat
							}
						}
					}
					scenerio {
						scenerioId
						name
						challenge {
							challengeId
						}
					}
				}
			}
		}
	}
`;

export const BOT_CHATS = gql`
	{
		botChats {
			edges {
				node {
					botChatId
					botChat
					category
					options
					lastUpdated
				}
			}
		}
	}
`;
export const RESPONSES = gql`
	{
		responses {
			edges {
				node {
					response
					category
					options
					lastUpdated
					bot {
						botId
					}
					block {
						blockId
					}
				}
			}
		}
	}
`;
export const BOTCHATS_RESPONSES = gql`
	query($blockId: String!, $orderBy: String!) {
		botChats(blockId: $blockId, orderBy: $orderBy) {
			edges {
				node {
					botChat
					botChatId
					uploadsBotChats {
						edges {
							node {
								uploadType
								uploadId
								upload
								title
								description
							}
						}
					}
					botResponses {
						edges {
							node {
								response
								responseId
								redirect
								action
								redirectToBot
								redirectToBlock
								redirectToScenerio
							}
						}
					}
				}
			}
		}
	}
`;

export const ALL_MESSAGES = gql`
	query {
		allMessages(orderBy: "messageId", last: 10) {
			edges {
				node {
					createdAt
					messageId
					message
					lastIdx
					user {
						username
					}
					room {
						roomId
					}
				}
			}
		}
	}
`;

export const POINT_DISTRIBUTION = gql`
	query {
		pointDistribution {
			edges {
				node {
					pointId
					action
					points
					percentage
					add
					createdAt
				}
			}
		}
	}
`;

export const POINT_TO_CASH = gql`
	query {
		pointsToCash {
			edges {
				node {
					pointId
					points
					cash
					createdAt
				}
			}
		}
	}
`;

export const POINTS_MAXIMUM = gql`
	query {
		pointsMaximum {
			edges {
				node {
					pointId
					day
					month
					year
					points
					createdAt
				}
			}
		}
	}
`;

export const POINT_MANAGEMENT = gql`
	query {
		pointManagement {
			edges {
				node {
					pointId
					action
					points
					add
					user {
						username
					}
					createdAt
				}
			}
		}
	}
`;

export const BOTCHAT_UPLOADS = gql`
	query($challengeId: String, $botChatIcontains: String) {
		botChats(
			challengeId: $challengeId
			botChatIcontains: $botChatIcontains
		) {
			edges {
				node {
					botChat
					botChatId
					block {
						name
					}
					uploadsBotChats {
						edges {
							node {
								upload
								createdAt
							}
						}
					}
				}
			}
		}
	}
`;

export const DAILYDEVICEINFO = gql`
	query {
		dailyDeviceInfo
	}
`;

export const USER_COUNTS = gql`
	query {
		userCounts
	}
`;

export const CHALLENGE_ETAGS_SUMMERY = gql`
	query(
		$challengeId: String
		$email: String
		$scenerioId: String
		$eTag: String
		$createdAtGte: String
		$createdAtLte: String
	) {
		challengeEtagsSummery(
			challengeId: $challengeId
			email: $email
			eTag: $eTag
			scenerioId: $scenerioId
			createdAtGte: $createdAtGte
			createdAtLte: $createdAtLte
		)
	}
`;

export const USER_SCENERIO_LOG_SUMMERY = gql`
	query(
		$challengeId: String
		$userId: String
		$status: String
		$email: String
		$accesscode: String
		$startDateLte: String
		$startDateGte: String
		$lastIndex: String
		$page: String
	) {
		userScenerioLogSummery(
			challengeId: $challengeId
			userId: $userId
			status: $status
			email: $email
			accesscode: $accesscode
			startDateLte: $startDateLte
			startDateGte: $startDateGte
			lastIndex: $lastIndex
			page: $page
		)
	}
`;

export const USER_CHALLENGE_LOG_SUMMERY = gql`
	query($percentages: Boolean, $lastIndex: String, $page: String) {
		userChallengeLogSummery(
			percentages: $percentages
			lastIndex: $lastIndex
			page: $page
		)
	}
`;
export const CHALLENGE_ACCESSCODE = gql`
	query($challengeId: String) {
		allAccessCodes(challengeId: $challengeId) {
			edges {
				node {
					codeNumber
					name
					maxUsers
					startDate
					endDate
					createdAt
				}
			}
		}
	}
`;
