import React, { useRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./booking.module.css";
import AuthContext from "@/store/auth-context";

function BookingDate() {
  const { activeDay, setActiveDay } = useContext(AuthContext);
  const currentDate = new Date();

  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    console.log(date);
    setActiveDay(date);
  };

  const toggleCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className={classes.dateContainer}>
      <div className={classes.showDateContainer}>
        <h2 style={{marginRight:"1rem"}}>Date:</h2>
        <h3>
          {activeDay
            ? activeDay.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : null}
        </h3>
      </div>
      <div className={classes.dateDisplay}>
        <div className={classes.reactDatePicker}>
          <DatePicker
            onChange={handleDateChange}
            ref={datePickerRef}
            minDate={currentDate}
            showPopperArrow={false}
          />
        </div>
        <button onClick={toggleCalendar}>Choose</button>
      </div>
    </div>
  );
}

export default BookingDate;
