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
		console.log("[login success] currentUser:", res.profileObj);
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

					// onChange={(e)=>{handleOnChange(e,row.node[fields.id],currentAction,fields.name)}}
					// value={modifiedvalue.id===row.node[fields.id] ? modifiedvalue.content : ''}
					// onBlur={handleOnBlur}
					// onSubmit={handleOnBlur}
					// onMouseOut={handleOnBlur}
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

					// onChange={(e)=>{handleOnChange(e,row.node[fields.id],currentAction,fields.name)}}
					// value={modifiedvalue.id===row.node[fields.id] ? modifiedvalue.content : ''}
					// onBlur={handleOnBlur}
					// onSubmit={handleOnBlur}
					// onMouseOut={handleOnBlur}
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

// import React from 'react';

// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };

// const App = () => {
//   const [value, setValue] = useStateWithLocalStorage(
//     'myValueInLocalStorage'
//   );

//   const onChange = event => setValue(event.target.value);

//   return (
//     <div>
//       <h1>Hello React with Local Storage!</h1>

//       <input value={value} type="text" onChange={onChange} />

//       <p>{value}</p>
//     </div>
//   );
// };

// export default App;
