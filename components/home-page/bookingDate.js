import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./booking.module.css";

function BookingDate() {
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    setCalendarIsOpen(false);
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
