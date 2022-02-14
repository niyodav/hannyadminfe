import React, { useState, useEffect } from "react";
import "./login.css";
import checked from "../assets/images/icon_checked.png";
import unchecked from "../assets/images/icon_unchecked.png";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { TOKEN_AUTH, VERIFY_TOKEN } from "../graphql/mutations";

const Login = () => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [saveChecked, setSaveChecked] = useState(false);
	const [loged, setLoged] = useState(false);
	const cookies = new Cookies();

	useEffect(() => {
		const savedUsername = cookies.get("loginusername");
		if (savedUsername) {
			setUsername(savedUsername);
			setSaveChecked(true);
		}
	}, []);

	const [verifyToken, { loading, data: verifyData }] = useMutation(
		VERIFY_TOKEN
	);

	const [tokenAuth, { data }] = useMutation(TOKEN_AUTH);
	const toggleCheck = () => {
		setSaveChecked(!saveChecked);
	};

	const onLogin = async () => {
		let token = "";
		if (data) {
			token = data.tokenAuth.token;
			cookies.set("loginToken", token);
		}

		if (username.length === 0) {
			alert(" 아이디를 입력하세요");
			return;
		}
		if (password.length === 0) {
			alert("비밀번호를 입력하세요");
			return;
		}
		if (password && username) {
			tokenAuth({
				variables: { username: username, password: password },
			});
			if (token) {
				history.replace("/");
				// verifyToken({
				// 	variables: { token: token },
				// });
			}
		}

		// if (verifyData) {
		// 	history.replace("/");
		// }
	};

	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onLogin();
		}
	};

	return (
		<div className="login-container">
			<div className="login-white-box">
				<div className="login-logo"></div>
				<span className="login-title">관리자 로그인</span>
				<div>
					<input
						className="login-id-input"
						type="username"
						placeholder="아이디"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						className="login-pw-input"
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyPress={onKeyPress}
					/>
				</div>
				<div className="login-save-row">
					<img
						className="login-check-box"
						src={saveChecked ? checked : unchecked}
						onClick={toggleCheck}
						alt=""
					/>
					<span className="login-save-label">아이디 저장</span>
				</div>
				<div className="login-button-bg" onClick={onLogin}>
					<span className="login-button-text">로그인</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
