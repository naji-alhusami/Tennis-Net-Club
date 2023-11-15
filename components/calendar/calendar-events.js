import React from "react";
import classes from "./calendar-events.module.css";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import PlayerCalendar from "./player-calendar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function CalendarEvents() {
  const session = await getServerSession(authOptions);

  const events = await fetchEventsFromMongo();
  const takenTimes = await fetchTakenTimesFromMongo();

  return (
    <div className={classes.calendar}>
      <PlayerCalendar
        session={session}
        events={events.data}
        takenTimes={takenTimes.data}
      />
    </div>
  );
}

export default CalendarEvents;
