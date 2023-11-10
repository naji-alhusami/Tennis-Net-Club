"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "../calendar/calendar-events.module.css";
import timeGridPlugin from "@fullcalendar/daygrid";

function Calendar({ events, takenTimes, eventsAndTimes }) {
  return (
    <div className={classes.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        height="600px"
        events={takenTimes}
      />
    </div>
  );
}

export default Calendar;
