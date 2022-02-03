import React, { useState, useEffect } from "react";
import "./register.css";
import checked from "../assets/images/icon_checked.png";
import unchecked from "../assets/images/icon_unchecked.png";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

const UserRegistration = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [superUser, setSuperUser] = useState(false);
	const [isStaff, setIsStaff] = useState(false);

	useEffect(() => {
		const cookies = new Cookies();
		const savedEmail = cookies.get("loginEmail");
		if (savedEmail) {
			setEmail(savedEmail);
			// setSaveChecked(true);
		}
	}, []);
	const toggleCheckStaff = () => {
		setIsStaff(!isStaff);
	};
	const toggleCheckSupperUser = () => {
		setSuperUser(!superUser);
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
		history.replace("/");
	};

	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onLogin();
		}
	};

	return (
		<div className="login-container">
			<div className="login-white-box">
				<span className="login-title">가입하기</span>
				<input
					className="login-id-input"
					type="name"
					placeholder="이름"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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
						src={isStaff ? checked : unchecked}
						onClick={toggleCheckStaff}
						alt=""
					/>
					<span className="login-save-label">staff</span>
					<img
						className="login-check-box"
						src={superUser ? checked : unchecked}
						onClick={toggleCheckSupperUser}
						alt=""
					/>
					<span className="login-save-label">super user</span>
				</div>
				<div className="login-button-bg" onClick={onLogin}>
					<span className="login-button-text">가입하기</span>
				</div>
			</div>
		</div>
	);
};

export default UserRegistration;
