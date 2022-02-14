import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import "./components/styles.css";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import DisplayChallengesGroups from "./challenges/displayChallengesGroups";
import DisplayChallenges from "./challenges/displayChallenges";
import DisplayScenerios from "./scenerios/displayScenerios";
import DisplayBlocks from "./blocks/displayBlocks";
import DisplayBotChat from "./botchats/displayBotChat";
import { CategoryProvider } from "./contexts/categoriesContext";

import { TableSortProvider } from "./contexts/sortByContext";
import { UpdateContextProvider } from "./contexts/updateContext";
import { DeleteIdsContextProvider } from "./contexts/deleteIdsContext";
import { SelectedFeatureProvider } from "./contexts/featuresContext";
import { SelectedBlockContextProvider } from "./contexts/selectedBlockContext";
import { CreatedtextContextProvider } from "./contexts/createdTextContext";
import { LocationContextProvider } from "./contexts/locationContext";
import { SelectedCategoryContextProvider } from "./contexts/selectedCategoryContext";
import { CreatedFileContextProvider } from "./contexts/createdFileContext";
import { SelectedMenuContextProvider } from "./contexts/selectedMenuContext";
// import Login from "./components/login";
import Login from "./login/login";
import UserRegistration from "./Register/registerUser";

import ChallengeSettings from "./challenges/challengeSettings";
import Dashboard from "./dashboards/dashboard";
import { API_BASE_URL } from "./globalConstants";
import UploadBotChatMedia from "./botchats/uploadBotChatMedia";
import CustomerMonitoring from "./customers/customerMonitoring";
import CustomerDetails from "./customers/customerDetails";
import ChallengeSummery from "./challengeManagement/challengeSummery";
import UserChallengeLogSummery from "./challengeManagement/userChallengeLogSummery";
import ChallengeUserAnswers from "./customers/Logs/challengeUserAnswers";
import { CursorContextProvider } from "./contexts/cursorContext";

const client = new ApolloClient({
	uri: API_BASE_URL + "graphql/",
	cache: new InMemoryCache(),
});

// const useStateWithLocalStorage = (localStorageKey) => {
// 	const [value, setValue] = React.useState(
// 		localStorage.getItem(localStorageKey) || ""
// 	);

// 	useEffect(() => {
// 		localStorage.setItem(localStorageKey, value);
// 	}, [value]);

// 	return [value, setValue];
// };

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		display: "flex",

		background: "#FCE205",
	},
	drawerList: {
		paddingLeft: 20,
	},
	link: {
		textDecoration: "none",
		color: "black",
		"&:hover": {
			color: "#ff8000",
		},
	},
	paper: { minWidth: 200, maxHeight: 400 },
	Main: {
		marginLeft: 190,
	},
}));

function App() {
	// const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");

	const [clicked, setClicked] = useState(false);

	const classes = useStyles();

	return (
		<ApolloProvider client={client}>
			<CursorContextProvider>
				<TableSortProvider>
					<CategoryProvider>
						<UpdateContextProvider>
							<DeleteIdsContextProvider>
								<SelectedFeatureProvider>
									<SelectedBlockContextProvider>
										<CreatedtextContextProvider>
											<LocationContextProvider>
												<SelectedCategoryContextProvider>
													<CreatedFileContextProvider>
														<SelectedMenuContextProvider>
															<Router>
																<div
																	className={
																		classes.root
																	}
																	style={{
																		height: 1000,
																		background:
																			"#f3f3f3",
																		overflow:
																			"scroll",
																	}}
																>
																	<Drawer
																		variant="persistent"
																		open={
																			true
																		}
																		classes={{
																			paper:
																				classes.drawerPaper,
																		}}
																		className={
																			classes.drawerPaper
																		}
																	>
																		<Link
																			to="/"
																			className={
																				classes.link
																			}
																			button={
																				true
																			}
																			onClick={() =>
																				setClicked(
																					"banner"
																				)
																			}
																			style={
																				clicked ===
																				"banner"
																					? {
																							color:
																								"#ff8000",
																					  }
																					: null
																			}
																		>
																			<img
																				src={
																					"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/hannybanner1.png"
																				}
																				alt="decrement"
																				style={{
																					width:
																						"auto",
																					height: 60,
																				}}
																			/>
																		</Link>

																		<List
																			className={
																				classes.drawerList
																			}
																		>
																			{/* <Link
																			to="/registeruser"
																			className={
																				classes.link
																			}
																		>
																			<ListItem
																					button={true}
																				onClick={() =>
																					setClicked(
																						"registeruser"
																					)
																				}
																				style={
																					clicked ===
																					"registeruser"
																						? {
																								color:
																									"#ff8000",
																						  }
																						: null
																				}
																			>
																				<ListItemText
																					primary={
																						"가입 시키기"
																					}
																				/>
																			</ListItem>
																		</Link> */}
																			<Link
																				to="/dashboard"
																				className={
																					classes.link
																				}
																			>
																				<ListItem
																					button={
																						true
																					}
																					onClick={() =>
																						setClicked(
																							"dashboard"
																						)
																					}
																					style={
																						clicked ===
																						"dashboard"
																							? {
																									color:
																										"#ff8000",
																							  }
																							: null
																					}
																				>
																					<ListItemText
																						primary={
																							"대시보드"
																						}
																					/>
																				</ListItem>
																			</Link>
																			<Link
																				to="/"
																				className={
																					classes.link
																				}
																			>
																				<ListItem
																					button={
																						true
																					}
																					onClick={() =>
																						setClicked(
																							"home"
																						)
																					}
																					style={
																						clicked ===
																						"home"
																							? {
																									color:
																										"#ff8000",
																							  }
																							: null
																					}
																				>
																					<ListItemText
																						primary={
																							"대화관리"
																						}
																					/>
																				</ListItem>
																			</Link>
																			<Link
																				to="/customers"
																				className={
																					classes.link
																				}
																			>
																				<ListItem
																					button={
																						true
																					}
																					onClick={() =>
																						setClicked(
																							"customers"
																						)
																					}
																					style={
																						clicked ===
																						"customers"
																							? {
																									color:
																										"#ff8000",
																							  }
																							: null
																					}
																				>
																					<ListItemText
																						primary={
																							"친구관리"
																						}
																					/>
																				</ListItem>
																			</Link>
																			<Link
																				to="/useranswers"
																				className={
																					classes.link
																				}
																			>
																				<ListItem
																					button={
																						true
																					}
																					onClick={() =>
																						setClicked(
																							"useranswers"
																						)
																					}
																					style={
																						clicked ===
																						"useranswers"
																							? {
																									color:
																										"#ff8000",
																							  }
																							: null
																					}
																				>
																					<ListItemText
																						primary={
																							"답변 모니터링"
																						}
																					/>
																				</ListItem>
																			</Link>

																			<Link
																				to="/challenge-stats"
																				className={
																					classes.link
																				}
																			>
																				<ListItem
																					button={
																						true
																					}
																					onClick={() =>
																						setClicked(
																							"challenge-stats"
																						)
																					}
																					style={
																						clicked ===
																						"challenge-stats"
																							? {
																									color:
																										"#ff8000",
																							  }
																							: null
																					}
																				>
																					<ListItemText
																						primary={
																							"챌린지 통계"
																						}
																					/>
																				</ListItem>
																			</Link>
																		</List>
																	</Drawer>
																	<div
																		className={
																			classes.Main
																		}
																	>
																		<Switch>
																			<Route
																				exact
																				path="/"
																			>
																				<DisplayChallenges />
																			</Route>
																			<Route
																				exact
																				path="/login"
																			>
																				<Login />
																			</Route>

																			<Route
																				exact
																				path="/dashboard"
																			>
																				<Dashboard />
																			</Route>
																			{/* <Route
																			exact
																			path="/registeruser"
																		>
																			<UserRegistration />
																		</Route> */}
																			<Route
																				exact
																				path="/customers"
																			>
																				<CustomerMonitoring />
																			</Route>
																			<Route
																				exact
																				path="/useranswers"
																			>
																				<ChallengeSummery
																					percentages={
																						false
																					}
																				/>
																			</Route>

																			<Route
																				exact
																				path="/challenge-group/:fk"
																			>
																				<DisplayChallengesGroups />
																			</Route>
																			<Route
																				exact
																				path="/challenge/:fk"
																			>
																				<DisplayChallenges />
																			</Route>
																			<Route
																				exact
																				path="/scenerio/:fk"
																			>
																				<DisplayScenerios />
																			</Route>
																			<Route
																				exact
																				path="/block/:fk"
																			>
																				<DisplayBlocks />
																			</Route>
																			<Route
																				exact
																				path="/chat/:fk"
																			>
																				<DisplayBotChat />
																			</Route>

																			<Route
																				exact
																				path="/setting/:challengeId"
																			>
																				<ChallengeSettings />
																			</Route>

																			<Route
																				exact
																				path="/customerdetails/:userId"
																			>
																				<CustomerDetails />
																			</Route>
																			<Route
																				exact
																				path="/challengeuseranswers/:challengeId"
																			>
																				<ChallengeUserAnswers />
																			</Route>

																			<Route
																				exact
																				path="/botchatimages/:challengeId"
																			>
																				<UploadBotChatMedia />
																			</Route>

																			<Route
																				exact
																				path="/challenge-stats"
																			>
																				<ChallengeSummery />
																			</Route>

																			<Route
																				exact
																				path="/userchallengelogstats/:challengeId?/:challengers?/:openpercentage?/:completedpercentage?"
																			>
																				<UserChallengeLogSummery
																					percentages={
																						true
																					}
																				/>
																			</Route>

																			{/* <Route
																			exact
																			path="/controlcenter"
																		>
																			<ControlApp />
																		</Route> */}
																		</Switch>
																	</div>
																</div>
															</Router>
														</SelectedMenuContextProvider>
													</CreatedFileContextProvider>
												</SelectedCategoryContextProvider>
											</LocationContextProvider>
										</CreatedtextContextProvider>
									</SelectedBlockContextProvider>
								</SelectedFeatureProvider>
							</DeleteIdsContextProvider>
						</UpdateContextProvider>
					</CategoryProvider>
				</TableSortProvider>
			</CursorContextProvider>
		</ApolloProvider>
	);
}

export default App;
