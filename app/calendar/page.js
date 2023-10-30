import React from "react";
import CalendarEvents from "@/components/calendar/calendar-events";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

async function CalendarPage() {
const events = await fetchEventsFromMongo();
const takenTimes = await fetchTakenTimesFromMongo();
const mergedData = [...events.data, ...takenTimes.data];

  return <CalendarEvents eventsAndTimes={mergedData} />;
}

export default CalendarPage;
