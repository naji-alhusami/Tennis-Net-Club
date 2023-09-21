import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/store/auth-context";
import { fetchTimeSlots } from "./generate-times";

import { AiOutlineArrowRight } from "react-icons/ai";

import { AiOutlineArrowLeft } from "react-icons/ai";

import classes from "./booking-calendar.module.css";

function BookingCalendar() {
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

  const { activeDay, setActiveDay, timeSlots, setTimeSlots } =
    useContext(AuthContext);

  const currentDay = new Date();
  const thisMonth = currentDay.getMonth();
  const thisYear = currentDay.getFullYear();
  const [currentMonth, setCurrentMonth] = useState(thisMonth);
  const [currentYear, setCurrentYear] = useState(thisYear);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function newfunc() {
      const timess = await fetchTimeSlots(activeDay);
      setTimeSlots(timess);
      setLoading(false);
    }

    newfunc();
  }, [activeDay, setTimeSlots]);

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

  // Start of send Times to Mongo
  async function showTimeSlotsHandler(day) {
    const currentDate = new Date(currentYear, currentMonth, day);
    currentDate.setHours(0, 0, 0, 0); // Set time to midnight

    const currentDayCopy = new Date(currentDay);
    currentDayCopy.setHours(0, 0, 0, 0); // Set time to midnight for currentDay

    if (currentDate.getTime() < currentDayCopy.getTime()) {
      // Prevent selecting dates before the current day
      return;
    }

    setActiveDay(currentDate);
    setLoading(false);
    try {
      await sendDataToMongo();
    } catch (error) {
      console.log(error.message || "Error heeere!");
    }
  }

  async function sendDataToMongo() {
    console.log(timeSlots);
    const response = await fetch("/api/timeSlots/insertTimeSlots", {
      method: "POST",
      body: JSON.stringify(timeSlots),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("inside sending data function");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    } else {
      console.log(data);
    }
    // }
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

  if (loading) {
    return <p>Loading time slots...</p>;
  }

  // console.log(timeSlots);

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