"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "../calendar/calendar-events.module.css";
import timeGridPlugin from "@fullcalendar/daygrid";
import { usePathname } from "next/navigation";
import { eventsExtra } from "@/lib/events/extraEventsData";

function PlayerCalendar({ session, events, takenTimes }) {
  const pathname = usePathname();
  // console.log(events);

  // Filter TakenTimes for the player logged-in
  const memberTakenTimes = takenTimes.filter((takenTime) => {
    return takenTime.member === session?.user.name;
  });

  // Filter Events that match takenTimes Dates
  // const eventsWithMatchingDates = events.filter((event) => {
  //   return memberTakenTimes.some((takenTime) => {
  //     return event.date === takenTime.date;
  //   });
  // });

  // Filter Events that match player logged-in
  const memberEvents = events.filter((event) => {
    return event.member === session?.user.name;
  });

  // TakenTimes & Events for the Player Logged-in
  const playerCalendar = [
    ...memberEvents,
    // ...eventsWithMatchingDates,
    ...memberTakenTimes,
  ];

  const clubCalendar = [...takenTimes, ...eventsExtra];

  return (
    <div className={classes.calendar}>
      {pathname === "/calendar" ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          height="600px"
          events={playerCalendar}
        />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          height="600px"
          events={clubCalendar}
        />
      )}
    </div>
  );
}

export default PlayerCalendar;
