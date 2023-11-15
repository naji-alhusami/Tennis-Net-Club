import React, { Suspense } from "react";
import CalendarEvents from "@/components/calendar/calendar-events";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import Image from "next/image";
import Headers from "@/components/ui/headers";
import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "../../components/calendar/calendar-events.module.css";
import { motion } from "framer-motion";
import LoadingData from "@/components/ui/loading-data";

async function CalendarPage() {
  return (
    <div>
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
      <Suspense fallback={<LoadingData />}>
        <CalendarEvents />
      </Suspense>
    </div>
  );
}

export default CalendarPage;
