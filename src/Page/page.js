// import Header from "./Header";
// import Footer from "./Footer";
import "./page.css";
// import Nav from "./Nav";
import { useHistory } from "react-router";
import { useCallback, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import { useMutation } from "@apollo/client";
import { VERIFY_TOKEN } from "../graphql/mutations";

const Page = ({ children, labels, links, needPermission }) => {
	const history = useHistory();
	const cookies = new Cookies();
	const [verify, setVerify] = useState(false);

	const [verifyToken] = useMutation(VERIFY_TOKEN, {
		onCompleted(data) {
			if (data) {
				setVerify(data);
			} else {
				history.replace("/login");
			}
		},
	});

	const checkLogin = useCallback(async () => {
		const token = cookies.get("loginToken");
		if (!token) {
			history.replace("/login");
		} else {
			verifyToken({
				variables: { token: token },
			});
		}
	}, []);

	useEffect(() => {
		checkLogin();
	}, [checkLogin]);

	return (
		<div className="page-container">
			<div className="page-header">
				{/* <Header labels={labels} /> */}
			</div>
			<div className="page-scroll">
				<div className="page-content">
					{/* <Nav labels={labels} links={links} /> */}
					{children}
				</div>
				{/* <Footer /> */}
			</div>
		</div>
	);
};

export default Page;
