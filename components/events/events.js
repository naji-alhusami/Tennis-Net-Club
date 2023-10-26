"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import Image from "next/image";

import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "./events.module.css";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

function CalendarEvents() {
  const [timesEvents, setTimesEvents] = useState("");
  const [isLoadingTimesEvents, setIsLoadingTimesEvents] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingTimesEvents(true);

      const takenTimes = await fetchTakenTimesFromMongo();

      if (takenTimes && takenTimes.data.length > 0) {
        setTimesEvents(takenTimes);
      }

      setIsLoadingTimesEvents(false);
    }

    fetchData();
  }, []);
  console.log(timesEvents);

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
        <hr
          style={{
            border: "1px solid #1c7f47",
            width: "6rem",
          }}
        />
      </div>
      {isLoadingTimesEvents ? (
        <p>Loading calendar events...</p>
      ) : (
        <div className={classes.calendar}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            height="600px"
            events={timesEvents.data}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarEvents;
