import {
	Button,
	Drawer,
	Typography,
	List,
	ListItem,
	ListItemText,
	Container,
	Paper,
} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	useLocation,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import "./components/styles.css";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import TsControl from "./components/TsControl";
import CreateCategory from "./components/createCategory";
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
import Login from "./components/login";

import ChallengeSettings from "./challenges/challengeSettings";
import Dashboard from "./dashboards/dashboard";
import { API_BASE_URL } from "./globalConstants";
import UploadBotChatMedia from "./botchats/uploadBotChatMedia";
import CustomerMonitoring from "./customers/customerMonitoring";
import CustomerDetails from "./customers/customerDetails";
import UserAnswers from "./customers/Logs/userAnswers";
import ChallengeSummery from "./challengeManagement/challengeSummery";
import UserChallengeLogSummery from "./challengeManagement/userChallengeLogSummery";
import ChallengeUserAnswers from "./customers/Logs/challengeUserAnswers";

const client = new ApolloClient({
	uri: API_BASE_URL + "graphql/",
	cache: new InMemoryCache(),
});

const useStateWithLocalStorage = (localStorageKey) => {
	const [value, setValue] = React.useState(
		localStorage.getItem(localStorageKey) || ""
	);

	React.useEffect(() => {
		localStorage.setItem(localStorageKey, value);
	}, [value]);

	return [value, setValue];
};

const useStyles = makeStyles((theme) => ({
	drawerPaper: {
		// width:"inherit",
		display: "flex",

		background: "#FCE205",
	},
	drawerList: {
		paddingLeft: 20,
	},
	link: {
		textDecoration: "none",
		// color: "#d9d9d9",
		color: "black",
		"&:hover": {
			color: "#ff8000",
		},
		// color: theme.palette.text.primary,
		// background: "#434343",
	},
	paper: {
		// backgroundColor: "#434343",
		minWidth: 200,
		maxHeight: 400,
	},
	Main: {
		marginLeft: 190,
	},
}));

function App() {
	const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");

	const [items, setItems] = useState("");
	const [clicked, setClicked] = useState(false);

	const classes = useStyles();

	return (
		<ApolloProvider client={client}>
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
															{/* style={{background:"red",width:"100%"}} */}
															{/* <div className={classes.root}>  */}

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
																	open={true}
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
																		button
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
																		<Link
																			to="/dashboard"
																			className={
																				classes.link
																			}
																		>
																			<ListItem
																				button
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
																				{/* <img
																					src={
																						"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3_PmThK5Y.png"
																					}
																					alt="increment"
																					style={{
																						width: 20,
																						height: 20,
																						marginRight: 10,
																					}}
																				/> */}

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
																				button
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
																				{/* <img
																					src={
																						"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"
																					}
																					alt="increment"
																					style={{
																						width: 20,
																						height: 20,
																						marginRight: 10,
																					}}
																				/> */}
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
																				button
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
																				{/* <img
																					src={
																						"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/HC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5_4ne7sV4.png"
																					}
																					alt="decrement"
																					style={{
																						width: 20,
																						height: 20,
																						marginRight: 10,
																					}}
																				/> */}

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
																				button
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
																				{/* <img
																					src={
																						"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%8E%E1%85%B5%E1%86%AB%E1%84%80%E1%85%AE%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"
																					}
																					alt="increment"
																					style={{
																						width: 20,
																						height: 20,
																						marginRight: 10,
																					}}
																				/> */}
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
																				button
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
																				{/* <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3_PmThK5Y.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>     */}

																				<ListItemText
																					primary={
																						"챌린지 통계"
																					}
																				/>
																			</ListItem>
																		</Link>
																		{/* <Link
																			to="/controlcenter"
																			className={
																				classes.link
																			}
																		>
																			<ListItem
																				button
																				onClick={() =>
																					setClicked(
																						"controlcenter"
																					)
																				}
																				style={
																					clicked ===
																					"controlcenter"
																						? {
																								color:
																									"#ff8000",
																						  }
																						: null
																				}
																			>

																				<ListItemText
																					primary={
																						"App control center"
																					}
																				/>
																			</ListItem>
																		</Link> */}
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
																			<div>
																				{/* <VistedLinks/> */}

																				{value ? (
																					<DisplayChallenges />
																				) : (
																					<Login />
																				)}
																			</div>
																		</Route>
																		<Route
																			exact
																			path="/dashboard"
																		>
																			<Dashboard />
																		</Route>
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
		</ApolloProvider>
	);
}

export default App;
