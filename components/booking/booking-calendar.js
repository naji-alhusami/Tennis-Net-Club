import React, { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { AiOutlineArrowRight } from "react-icons/ai";

import { AiOutlineArrowLeft } from "react-icons/ai";

import classes from "./booking-calendar.module.css";

function BookingCalendar() {
  const { activeDay, setActiveDay } = useContext(AuthContext);

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
  const thisMonth = currentDay.getMonth();
  const thisYear = currentDay.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [currentYear, setCurrentYear] = useState(thisYear);

  function handleNextMonth() {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
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

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousDays = [];

  for (let day = 1; day < currentDay.getDate(); day++) {
    previousDays.push(day);
  }

  const calendarGrid = [];

  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }

  function handleDayClick(day) {
    console.log("clicked");
    const currentDate = new Date(currentYear, currentMonth, day);
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    const currentDayCopy = new Date(currentDay);
    currentDayCopy.setHours(0, 0, 0, 0); // Set time to midnight for currentDay

    if (currentDate.getTime() < currentDayCopy.getTime()) {
      // Prevent selecting dates before the current day
      return;
    }

    setActiveDay(currentDate);
  }

  function getClassForDay(day) {
    const currentDate = new Date(currentYear, currentMonth, day);
    if (
      currentDate.getDate() === activeDay.getDate() &&
      currentMonth === activeDay.getMonth()
    ) {
      return classes.activeDay;
    } else if (
      currentDate.getDate() < currentDay.getDate() &&
      currentMonth === thisMonth
    ) {
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
                        onClick={() => handleDayClick(item)}
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

export default BookingCalendar;
