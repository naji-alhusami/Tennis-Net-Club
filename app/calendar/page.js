import React from "react";
import CalendarEvents from "@/components/calendar/calendar-events";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

async function CalendarPage() {
  const events = await fetchEventsFromMongo();
  const takenTimes = await fetchTakenTimesFromMongo();


  return (
    <CalendarEvents
      // eventsAndTimes={mergedData}
      events={events.data}
      takenTimes={takenTimes.data}
    />
  );
}

export default CalendarPage;
