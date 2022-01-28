import React, { useState, useEffect } from "react";
import "./Login.css";
import checked from "../../../assets/images/icon_checked.png";
import unchecked from "../../../assets/images/icon_unchecked.png";
// import apis from '../../../apis';
import Cookies from "universal-cookie/es6";
import { useHistory } from "react-router";
// import { useStores } from '../../../stores';

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [saveChecked, setSaveChecked] = useState(false);
	// const {userStore} = useStores();

	useEffect(() => {
		const cookies = new Cookies();
		const savedEmail = cookies.get("loginEmail");
		if (savedEmail) {
			setEmail(savedEmail);
			setSaveChecked(true);
		}
	}, []);
	const toggleCheck = () => {
		setSaveChecked(!saveChecked);
	};

	const onLogin = async () => {
		if (email.length === 0) {
			alert("이메일 아이디를 입력하세요");
			return;
		}
		if (password.length === 0) {
			alert("비밀번호를 입력하세요");
			return;
		}
		// const res = await apis.userApi.login({email, password});
		// if(res.status === 200) {
		//     const cookies = new Cookies();
		//     if(saveChecked) {
		//         cookies.set('loginEmail', email);
		//     } else {
		//         cookies.remove('loginEmail');
		//     }
		//     // userStore.fetchMyInfo();
		//     history.replace('/admin');
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
				<input
					className="login-id-input"
					type="email"
					placeholder="이메일 아이디"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="login-pw-input"
					type="password"
					placeholder="비밀번호"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyPress={onKeyPress}
				/>
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
