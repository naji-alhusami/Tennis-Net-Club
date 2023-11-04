import React, { useState, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { AiOutlineArrowRight } from "react-icons/ai";

import { AiOutlineArrowLeft } from "react-icons/ai";

import classes from "./booking-calendar.module.css";
import Link from "next/link";

function BookingCalendar({ nextStepHandler }) {
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

  const { activeDay, setActiveDay, setNextButton } = useContext(AuthContext);
  console.log(activeDay);
  const currentDate = new Date();
  const thisMonth = currentDate.getMonth();
  const thisYear = currentDate.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [currentYear, setCurrentYear] = useState(thisYear);

  // Start handle clicking on next month
  function nextMonthHandler() {
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(nextMonth.getMonth());
    setCurrentYear(nextMonth.getFullYear());
  }
  // Finish handle clicking on next month

  // Start handle clicking on prev month
  function prevMonthHandler() {
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
  // Finish handle clicking on prev month

  // handle show time slots for the selectedDate
  async function showTimeSlotsHandler(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    selectedDate.setHours(0, 0, 0, 0); // Set time to midnight

    currentDate.setHours(0, 0, 0, 0); // Set time to midnight for currentDate

    if (selectedDate.getTime() < currentDate.getTime()) {
      // Prevent selecting dates before the current day
      return;
    }

    setActiveDay(selectedDate);
    setNextButton(true);
    // nextStepHandler();
  }

  function getClassForDay(day) {
    const allMonthDates = new Date(currentYear, currentMonth, day);

    if (activeDay) {
      if (
        allMonthDates.getDate() === activeDay.getDate() &&
        currentMonth === activeDay.getMonth() &&
        currentYear === activeDay.getFullYear()
      ) {
        return classes.activeDay;
      }
    }

    if (
      allMonthDates.getDate() === currentDate.getDate() &&
      currentMonth === thisMonth &&
      currentYear === thisYear
    ) {
      return classes.currentDate;
    }

    if (
      allMonthDates.getDate() < currentDate.getDate() &&
      currentMonth === thisMonth &&
      currentYear === thisYear
    ) {
      return classes.previousDay;
    }
  }

  // Start generating days in each month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousDays = [];

  for (let day = 1; day < currentDate.getDate(); day++) {
    previousDays.push(day);
  }

  const calendarGrid = [];

  for (let i = 0; i < startDay; i++) {
    calendarGrid.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day);
  }
  // End generating days in each month

  return (
    <div className={classes.bookingDate}>
      <div className={classes.monthYear}>
        <button onClick={prevMonthHandler}>
          <AiOutlineArrowLeft />
        </button>{" "}
        <h2>
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={nextMonthHandler}>
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
                        onClick={() => showTimeSlotsHandler(item)}
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
