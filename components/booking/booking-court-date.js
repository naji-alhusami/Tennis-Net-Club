import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import { AiOutlineArrowLeft } from "react-icons/ai";

import classes from "./booking-court-date.module.css";

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
  const [selectedDay, setSelectedDay] = useState(null);

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
    // Check if the previous month is not earlier than the current month and not one month ahead
    if (
      prevMonth.getFullYear() > thisYear ||
      (prevMonth.getFullYear() === thisYear &&
        prevMonth.getMonth() >= thisMonth)
    ) {
      setCurrentMonth(prevMonth.getMonth());
      setCurrentYear(prevMonth.getFullYear());
    }
  }

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();
  console.log("startDay", startDay);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  console.log("daysInMonth:", daysInMonth);

  const previousDays = [];

  for (let day = 1; day < currentDay.getDate(); day++) {
    previousDays.push(day);
  }

  console.log("previousDays:", previousDays);

  // Create an array to represent the calendar grid, including empty cells for preceding days
  const calendarGrid = [];

  // Fill in empty cells for preceding days
  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(null);
  }

  // Fill in day numbers for the current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  console.log(calendarGrid);

  //   function handleDayClick(day) {
  //     if (day > currentDay.getDate()) {
  //       setSelectedDay(day);
  //     }
  //   }

  function getClassForDay(day) {
    if (day === currentDay.getDate() && currentMonth === thisMonth) {
      // Current day
      return classes.currentDay;
    } else if (day < currentDay.getDate() && currentMonth === thisMonth) {
      // Previous days
      return classes.previousDay;
    }
  }

  return (
    <div className={classes.bookingDate}>
      <div className={classes.monthYear}>
        <button onClick={handlePrevMonth}>
          <AiOutlineArrowLeft />
        </button>{" "}
        <h2>
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>
          <AiOutlineArrowRight />
        </button>
      </div>
      <table className={classes.calendarTable}>
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
                      <td
                        key={subIndex}
                        className={getClassForDay(item)}
                        // onClick={() => handleDayClick(item)}
                      >
                        {item}
                      </td>
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
