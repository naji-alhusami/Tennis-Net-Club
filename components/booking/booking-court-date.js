import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import classes from "./booking-court.module.css";

function BookingCourtDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDay = new Date();
  console.log(currentDay);
  const thisMonth = currentDay.getMonth(); //To get the month as number.
  //   const thisMonth = currentDay.toLocaleString("en-US", { month: "long" }); //To get the month as String.
  const thisYear = currentDay.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [currentYear, setCurrentYear] = useState(thisYear);

  console.log("currentYear:", currentYear);
  console.log("currentMonth:", currentMonth);

  function handleNextMonth() {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    console.log(nextMonth.getMonth());
    setCurrentMonth(nextMonth.getMonth());
    setCurrentYear(nextMonth.getFullYear());
  }

  function handlePrevMonth() {
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(prevMonth.getMonth());
    setCurrentYear(prevMonth.getFullYear());
  }

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();
  console.log("startDay", startDay);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  console.log("daysInMonth:", daysInMonth);

  // Create an array to represent the calendar grid, including empty cells for preceding days
  const calendarGrid = [];

  //   // Fill in empty cells for preceding days
  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(null);
  }

  // Fill in day numbers for the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  console.log(calendarGrid);

  return (
    <div className={classes.bookingDate}>
      <div className={classes.monthYear}>
        <button onClick={handlePrevMonth}>Prev</button>{" "}
        <h2>
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarGrid.map((day, index) => {
            if (index % 7 === 0) {
              // Start a new table row for every 7 items
              return (
                <tr key={index}>
                  {calendarGrid
                    .slice(index, index + 7)
                    .map((item, subIndex) => (
                      <td key={subIndex}>{item}</td>
                    ))}
                </tr>
              );
            }
            return null; // Return null for items that are not at the start of a new row
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BookingCourtDate;
