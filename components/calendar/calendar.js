"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "../calendar/calendar-events.module.css";
import timeGridPlugin from "@fullcalendar/daygrid";
import { eventsExtra } from "@/lib/events/extraEventsData";

function Calendar({ events, takenTimes, eventsAndTimes }) {
  const evnets = [...eventsExtra];

  return (
    <div className={classes.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        height="600px"
        events={evnets}
      />
    </div>
  );
}

export default Calendar;
