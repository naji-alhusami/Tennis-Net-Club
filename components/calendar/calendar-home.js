import React from "react";
import { getServerSession } from "next-auth";

import PlayerCalendar from "./calendar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import classes from "./calendar-home.module.css";

async function CalendarHome() {
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

export default CalendarHome;
