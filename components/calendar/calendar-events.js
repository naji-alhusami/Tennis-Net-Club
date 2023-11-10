import React from "react";
import classes from "./calendar-events.module.css";
// import { useSession } from "next-auth/react";
import Calendar from "./calendar";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

async function CalendarEvents() {
  const events = await fetchEventsFromMongo();
  const takenTimes = await fetchTakenTimesFromMongo();
  // const { data: session } = useSession();
  // console.log("events", events);
  // const memberTakenTimes = takenTimes.filter((takenTime) => {
  //   return takenTime.member === session?.user.name;
  // });

  // const eventsWithMatchingDates = events.filter((event) => {
  //   return memberTakenTimes.some((takenTime) => {
  //     return event.date === takenTime.date;
  //   });
  // });
  // // console.log(memberTakenTimes);
  // console.log("eventsWithMatchingDates", eventsWithMatchingDates);
  // const eventsAndTimes = [...events, ...memberTakenTimes];

  return (
    <div className={classes.calendar}>
      <Calendar events={events.data} takenTimes={takenTimes.data} />
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        height="600px"
        events={eventsAndTimes}
      /> */}
    </div>
  );
}

export default CalendarEvents;
