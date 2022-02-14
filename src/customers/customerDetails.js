import React from "react";
import { useState, useRef, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useParams, useLocation, Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_CHALLENGE_LOG_STATUS } from "../graphql/mutations";

import {
	USER_TOTAL_POINTS,
	USER_INFO,
	USER_CHALLENGE_LOG,
} from "../graphql/queries";
import UserChallengeLogSummery from "../challengeManagement/userChallengeLogSummery";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	tableColumn: {
		padding: "8px",
		textAlign: "center",
		borderBottom: "1px solid #ddd",
		fontSize: 14,
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "250px 250px",
		gridGap: "5px",
		fontSize: 12,
		fontFamily: "NanumSquare",
	},
	infoContainer: {
		display: "flex",
	},
	info: {
		marginLeft: 20,
	},
	button: {
		height: 30,
		width: 80,
	},
}));
function CustomerDetails() {
	const classes = useStyles();
	const { userId } = useParams();
	const [updateUserChallengeLog] = useMutation(
		UPDATE_USER_CHALLENGE_LOG_STATUS
	);

	const { loading, error, data, refetch } = useQuery(USER_INFO, {
		variables: {
			username: userId,
		},
	});

	const { loading: logLoading, error: errorlog, data: logData } = useQuery(
		USER_CHALLENGE_LOG,
		{
			variables: {
				userId: userId,
				challengeType: "mind_challenge",
				status: "inprogress",
			},
		}
	);

	const {
		loading: totaPointlLoading,
		error: errorTotaPoint,
		data: dataTotaPoint,
	} = useQuery(USER_TOTAL_POINTS, {
		variables: {
			userId: userId,
		},
	});

	const challengeInprogres = [
		"챌린지명",
		"체크인 완료 ",
		"시작일",
		"종료일",
		" 메시지 받는 시간 ",
		"참여횟수",
		" 마지막 대화 시간",
		"코드번호",
	];
	const completedChallenges = [
		"챌린지명",
		"기간",
		"오픈 횟수",
		"오픈율",
		"참여 횟수",
		"참여율",
		"획득한 포인트",
	];

	useEffect(() => {
		return () => {
			setFile("");
		};
	}, []);

	const [file, setFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const handleUserRank = () => {
		if (dataTotaPoint && dataTotaPoint.userTotalPoints.length > 0) {
			if (parseInt(dataTotaPoint.userTotalPoints[0]) < 5000) {
				return "어색한 친구";
			} else if (
				dataTotaPoint.userTotalPoints[0] >= 5000 &&
				dataTotaPoint.userTotalPoints[0] < 20000
			) {
				return "가벼운 친구";
			} else if (
				dataTotaPoint.userTotalPoints[0] >= 20000 &&
				dataTotaPoint.userTotalPoints[0] < 100000
			) {
				return "편한 친구";
			} else return "절친한 친구";
		} else return "어색한 친구";
	};

	const CustomerInfos = () => (
		<div style={{ marginLeft: 20, marginTop: 20 }}>
			<h4>기본 정보</h4>
			<div className={classes.grid}>
				<div className={classes.infoContainer}>
					<div>이메일 : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.email}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>가입일 : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.dateJoined.slice(0, 10)}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>가입SNS : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.username.indexOf("KAKAO") >
						-1
							? "KAKAO"
							: data.allUsers.edges[0].node.username.indexOf(
									"NAVER"
							  ) > -1
							? "NAVER"
							: data.allUsers.edges[0].node.username.indexOf(
									"APPLE"
							  ) > -1
							? "APPLE"
							: "GMAIL"}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>닉네임 : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.UserProfile
							? data.allUsers.edges[0].node.UserProfile.nickname
							: ""}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>친구등급 : </div>
					<div className={classes.info}>{handleUserRank()}</div>
				</div>
				<div className={classes.infoContainer}>
					<div>현재 해니포인트 : </div>
					<div className={classes.info}>
						{dataTotaPoint.userTotalPoints.length > 0
							? dataTotaPoint.userTotalPoints[0]
							: 0}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>Token 있음 : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.UserDeviceInfo.totalCount >
						0
							? "O"
							: "X"}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>운영체제: </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.UserDeviceInfo.total > 0
							? data.allUsers.edges[0].node.UserDeviceInfo
									.edges[0].node.os
							: "X"}
					</div>
				</div>
				<div className={classes.infoContainer}>
					<div>마케팅 수신 동의 : </div>
					<div className={classes.info}>
						{data.allUsers.edges[0].node.userSetting.marketingAlarm
							? "O"
							: "X"}
					</div>
				</div>

				<div className={classes.infoContainer}>
					<div>
						마지막 접속일 :{" "}
						{data.allUsers.edges[0].node.UserProfile.lastMessageTime.slice(
							0,
							10
						)}
					</div>
					<div className={classes.info}>{}</div>
				</div>
				<div className={classes.infoContainer}>
					<div>타임존 : </div>
					<div className={classes.info}>{}</div>
				</div>

				<div>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							if (window.confirm("챌린지 종료하겠습니까?")) {
								updateUserChallengeLog({
									variables: {
										status: "completed",
										userId: userId,
									},
								});
							}
						}}
					>
						챌랜지 종료
					</Button>
				</div>
			</div>
		</div>
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>there was an error</p>;
	if (totaPointlLoading) return <p>Loading...</p>;
	if (errorTotaPoint) return <p>there was an error</p>;

	if (logLoading) return <p>Loading...</p>;
	if (errorlog) return <p>there was an error</p>;

	return (
		<div>
			<CustomerInfos />
			<h4 style={{ marginLeft: 20, marginTop: 20 }}>
				진행중인 마음 챌린지
			</h4>
			<UserChallengeLogSummery userId={userId} status="inprogress" />

			<h4 style={{ marginLeft: 20, marginTop: 20 }}>
				완료한 마음 챌린지
			</h4>
			<UserChallengeLogSummery userId={userId} status="completed" />
		</div>
	);
}

export default CustomerDetails;
