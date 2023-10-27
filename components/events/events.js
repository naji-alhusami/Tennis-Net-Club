"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import Image from "next/image";

import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "./events.module.css";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import Headers from "../ui/headers";

function CalendarEvents() {
  const [timeEvents, setTimeEvents] = useState("");
  const [isLoadingTimeEvents, setIsLoadingTimeEvents] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingTimeEvents(true);

      const takenTimes = await fetchTakenTimesFromMongo();
      const events = await fetchEventsFromMongo();
      // console.log(takenTimes);
      // console.log(events);
      const mergedData = [...events.data, ...takenTimes.data];
      // if (takenTimes && takenTimes.data.length > 0) {
      setTimeEvents(mergedData);
      // }

      setIsLoadingTimeEvents(false);
    }

    fetchData();
  }, []);
  // console.log(timeEvents);

  return (
    <div className={classes.eventsContainer}>
      <div className={classes.image}>
        <Image src={calendarEvents} alt="calendar-events" />
      </div>
      <div className={classes.text}>
        <Headers
          H3Header="Courses, Lessons & Reserved Courts"
          H1Header="TIME SLOTS"
          H2Header="My Calendar"
          PHeader="Check your time slots, including (events, training sessions, and
            reserved courts)"
        />
      </div>
      {isLoadingTimeEvents ? (
        <p>Loading calendar events...</p>
      ) : (
        <div className={classes.calendar}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            height="600px"
            events={timeEvents}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarEvents;
