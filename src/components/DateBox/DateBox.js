import { useEffect, useRef, useState } from "react";
import "./DateBox.css";
import calendarIcon from "../../assets/images/calendar2.png";
import SBCalender from "./SBCalender/SBCalender";
import moment from "moment";

const DateBox = ({ date, setDate, small }) => {
	const [calDate, setCalDate] = useState("");
	const [dateText, setDateText] = useState(date?.substring(2) || "");
	const [openCalendar, setOpenCalendar] = useState(false);
	const divRef = useRef(null);

	const onDateSelected = (date) => {
		setCalDate(date);
		setDateText(moment(date).format("YY-MM-DD"));
		setDate(moment(date).format("YYYY-MM-DD"));
		setOpenCalendar(false);
	};

	const onDateTextChange = (dateString) => {
		setDateText(dateString);
		if (dateString.length === 0) {
			setDate(undefined);
			setCalDate(undefined);
			return;
		}

		if (dateString.length === 8) {
			const dateMoment = moment(dateString, "YY-MM-DD");
			if (dateMoment.isValid()) {
				setDate(dateMoment.format("YYYY-MM-DD"));
				setCalDate(dateMoment.toDate());
			} else {
				setDate(undefined);
				setCalDate(undefined);
			}
		} else {
			setDate(undefined);
			setCalDate(undefined);
		}
	};

	useEffect(() => {
		const onClick = (e) => {
			if (divRef.current && !divRef.current.contains(e.target)) {
				setOpenCalendar(false);
			}
		};

		document.addEventListener("click", onClick);

		return () => {
			document.removeEventListener("click", onClick);
		};
	});

	useEffect(() => {
		setDateText(date?.substring(2) || "");
	}, [date]);

	return (
		<div className="date-box-container" ref={divRef}>
			<div className="date-box-column">
				<div
					className={small ? "date-box-date-small" : "date-box-date"}
				>
					<input
						className="date-box-input"
						type="text"
						value={dateText}
						onChange={(e) => onDateTextChange(e.target.value)}
						placeholder="YY-MM-DD"
					/>
					<img
						// style={{ width: 30, height: 30 }}
						className="date-box-icon"
						src={calendarIcon}
						alt=""
						onClick={() => {
							setOpenCalendar(!openCalendar);
						}}
					/>
				</div>
				{openCalendar && (
					<div className="date-box-calendar-container">
						<SBCalender date={calDate} onChange={onDateSelected} />
					</div>
				)}
			</div>
		</div>
	);
};

export default DateBox;
