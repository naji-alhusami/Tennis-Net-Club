import React from "react";
import classes from "./calendar-events.module.css";
// import { useSession } from "next-auth/react";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import PlayerCalendar from "./player-calendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function CalendarEvents() {
  const session = await getServerSession(authOptions);

  const events = await fetchEventsFromMongo();
  const takenTimes = await fetchTakenTimesFromMongo();

  // console.log("eventsWithMatchingDates:", eventsWithMatchingDates);
  // console.log("eventsWithMatchingDates", eventsWithMatchingDates);
  // const eventsAndTimes = [...events, ...memberTakenTimes];

  return (
    <div className={classes.calendar}>
      <PlayerCalendar
        session={session}
        events={events.data}
        takenTimes={takenTimes.data}
      />
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
