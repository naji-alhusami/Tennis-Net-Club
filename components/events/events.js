"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Image from "next/image";

import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "./events.module.css";

function Events() {
  const calendarOptions = {
    initialView: "dayGridMonth",
    height: "600px",
  };

  return (
    <div className={classes.eventsContainer}>
      <div className={classes.image}>
        <Image src={calendarEvents} alt="calendar-events" />
      </div>
      <div className={classes.text}>
        <h3>Courses, Lessons & Reserved Courts</h3>
        <h1>TIME SLOTS</h1>
        <h2>My Calendar</h2>
        <p>
          Check your time slots, including (events, training sessions, and
          reserved courts)
        </p>
      </div>
      <div className={classes.calendar}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          {...calendarOptions}
          eventBord
        />
      </div>
    </div>
  );
}

export default Events;
