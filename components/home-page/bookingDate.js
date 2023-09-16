import React, { useState, useRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./booking.module.css";
import AuthContext from "@/store/auth-context";

function BookingDate() {
  const currentDate = new Date();
  const { selectedDate, setSelectedDate } = useContext(AuthContext);
  // const [calendarIsOpen, setCalendarIsOpen] = useState(false);

  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    // setCalendarIsOpen(false);
  };

  const toggleCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className={classes.dateContainer}>
      <h3>Date:</h3>
      <div className={classes.dateDisplay}>
        {selectedDate}
        <button onClick={toggleCalendar}>Change</button>
        <div className={classes.reactDatePicker}>
          <DatePicker
            selected={new Date(selectedDate)}
            onChange={handleDateChange}
            ref={datePickerRef}
            minDate={currentDate}
            // calendarClassName={
            //   calendarIsOpen ? "show-calendar" : "hide-calendar"
            // }
            showPopperArrow={false}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDate;
