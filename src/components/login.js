import React from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import { TextField, Button } from "@material-ui/core";
const useStateWithLocalStorage = (localStorageKey) => {
	const [value, setValue] = React.useState(
		localStorage.getItem(localStorageKey) || ""
	);

	React.useEffect(() => {
		localStorage.setItem(localStorageKey, value);
	}, [value]);

	return [value, setValue];
};
const clientId =
	"389602098327-ilkau7lqoiigc5022klfolcfij39ld18.apps.googleusercontent.com";
function Login() {
	const [value, setValue] = useStateWithLocalStorage("myValueInLocalStorage");
	const onSuccess = (res) => {
		setValue(res.profileObj);

		refreshTokenSetup(res);
	};

	const onFailure = (res) => {
		console.log("[login failed : ", res);
		setValue("res.profileObj");
	};

	return (
		<div
			style={{
				position: "relative",
				paddingTop: "20%",
				paddingLeft: "40%",
				background: "#ff8000",
				height: "700px",
			}}
		>
			<img
				src={
					"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/hannybanner1.png"
				}
				alt="decrement"
				style={{ width: "auto", height: 60 }}
			/>

			<div style={{ marginTop: 10 }}>
				<TextField
					variant="outlined"
					type="text"
					placeholder={"admin Id"}
					InputProps={{
						style: {
							fontFamily: "NanumSquare",
							background: "#fff",
						},
					}}

				/>
			</div>
			<div style={{ marginTop: 10 }}>
				<TextField
					variant="outlined"
					placeholder={"admin PW"}
					hintText="Password"
					floatingLabelText="Password"
					type="password"
					InputProps={{ style: { background: "#fff" } }}

		
				/>
			</div>
			<div style={{ marginTop: 10 }}>
				<Button style={{ background: "#009E09", width: 190 }}>
					Log in
				</Button>
			</div>
			<label style={{ marginTop: 10, marginLeft: 70 }}>OR</label>
			<div style={{ marginTop: 10, marginLeft: 40 }}>
				<GoogleLogin
					clientId={clientId}
					buttonText="Login"
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy="single_host_origin"
					style={{ marginTop: "100px" }}
					isSignedIn={true}
				/>
			</div>
		</div>
	);
}

export default Login;
