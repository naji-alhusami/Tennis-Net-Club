'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import Headers from "../ui/headers";
import classes from "../calendar/calendar-events.module.css";

function ClubCalendar({eventsAndTimes}) {
  return (
    <div className={classes.eventsContainer}>
      <div className={classes.text}>
        <Headers
          H3Header="Courses, Lessons & Reserved Courts"
          H1Header="TIME SLOTS"
          H2Header="Club Calendar"
          PHeader="Check the club calendar including (events, training sessions, and
            reserved courts)"
        />
      </div>
      <div className={classes.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          height="600px"
          events={eventsAndTimes}
        />
      </div>
    </div>
  );
}

export default ClubCalendar;
