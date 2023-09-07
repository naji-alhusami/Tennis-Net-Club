import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const thisMonth = currentDay.toLocaleString("en-US", { month: "long" }); //To get the month as String.
  const thisMonthNumber = currentDay.getMonth(); //To get the month as number.
  const thisYear = currentDay.getFullYear();
  const firstDayOfMonth = new Date(thisYear, thisMonthNumber, 1);
  const startDay = firstDayOfMonth.getDay();

  const [currentMonth, setNextPrevMonth] = useState(thisMonthNumber);
  const [currentYear, setNextPrevYear] = useState(thisYear);

  function handleNextMonth() {
    const currentIndex = months.indexOf(currentMonth);

    if (currentIndex !== -1) {
      // Check if it's not the last month
      if (currentIndex < months.length - 1) {
        setNextPrevMonth(months[currentIndex + 1]);
      } else {
        // If it's December, go to January of the next year
        setNextPrevMonth("January");
        setNextPrevYear(currentYear + 1);
      }
    }
  }

  function handlePrevMonth() {
    const currentIndex = months.indexOf(currentMonth);

    if (currentIndex !== -1) {
      // Check if it's not the last month
      if (currentIndex > 0) {
        setNextPrevMonth(months[currentIndex - 1]);
      } else {
        // If it's December, go to January of the next year
        setNextPrevMonth("December");
        setNextPrevYear(currentYear - 1);
      }
    }
  }

  console.log("currentYear:", currentYear);
  console.log("currentMonth:", currentMonth);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  console.log(daysInMonth);

  function generateCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    const firstDayOfWeek = firstDayOfMonth.getDay();

    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          row.push(<td key={j}></td>);
        } else if (day <= daysInMonth) {
          row.push(<td key={j}>{day}</td>);
          day++;
        }
      }
      calendar.push(<tr key={i}>{row}</tr>);
    }

    return calendar;
  }

  return (
    <div className={classes.bookingDate}>
      <div className={classes.monthYear}>
        <button onClick={handlePrevMonth}>Prev</button>{" "}
        <h2>
          {currentMonth} {currentYear}
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
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
          <tr>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
          </tr>
          <tr>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
          </tr>
          <tr>
            <td>29</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookingCourtDate;
