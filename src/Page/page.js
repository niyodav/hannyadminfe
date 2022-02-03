// import Header from "./Header";
// import Footer from "./Footer";
import "./Page.css";
// import Nav from "./Nav";
import { useHistory } from "react-router";
import { useCallback, useEffect } from "react";
import { useStores } from "../../../stores";

const Page = ({ children, labels, links, needPermission }) => {
	const { userStore } = useStores();
	const history = useHistory();
	const checkLogin = useCallback(async () => {
		const res = await userStore.fetchMyInfo();
		if (!res.ok) {
			history.replace("/login");
		} else {
			if (!!needPermission) {
				let granted = true;
				needPermission.forEach((permission) => {
					if (!userStore.getMyInfo[permission]) {
						granted = false;
					}
				});
				if (!granted) {
					alert("권한이 없습니다");
					history.goBack();
				}
			}
		}
	}, [userStore, history, needPermission]);

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
