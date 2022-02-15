import "./SBCalender.css";
import Calendar from "react-calendar";
import moment from "moment";

const SBCalender = ({ date, onChange }) => {
	return (
		<Calendar
			value={date}
			onChange={onChange}
			formatDay={(locale, date) => moment(date).format("D")}
			calendarType="Hebrew"
		/>
	);
};

export default SBCalender;
