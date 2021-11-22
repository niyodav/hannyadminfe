export const S3_BASE_URL =
	"https://hanny-upload.s3.ap-northeast-2.amazonaws.com/";
export const API_BASE_URL =
	"https://2nrpbffin8.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const ConfirmAlert = () => {
	if (window.confirm("삭체하시겠습니까")) {
		return true;
	} else {
		return false;
	}
};
