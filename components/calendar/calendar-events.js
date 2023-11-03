"use client";
import React from "react";
import classes from "./calendar-events.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import Image from "next/image";
import Headers from "../ui/headers";
import calendarEvents from "@/public/images/calendar-events.jpg";
import { useSession } from "next-auth/react";

function CalendarEvents({ events, takenTimes }) {
  const { data: session } = useSession();
  // console.log(takenTimes);
  // console.log(session);
  // console.log(events);

  const memberTakenTimes = takenTimes.filter((takenTime) => {
    return takenTime.member === session?.user.name;
  });
  // console.log(memberTakenTimes);
  // const memberEvents = events.filter((event) => {
  //   return event.member === session.user.name;
  // });
  const eventsWithMatchingDates = events.filter((event) => {
    return memberTakenTimes.some((takenTime) => {
      return event.date === takenTime.date;
    });
  });
  // console.log(memberTakenTimes);
  // console.log(eventsWithMatchingDates);
  const eventsAndTimes = [...eventsWithMatchingDates, ...memberTakenTimes];

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

export default CalendarEvents;
