import React, { Suspense } from "react";
import Image from "next/image";

import Headers from "@/components/ui/headers";
import LoadingData from "@/components/ui/loading-data";
import CalendarHome from "@/components/calendar/calendar-data";
import calendarEvents from "@/public/images/calendar-events.jpg";
import classes from "@/components/calendar/calendar.module.css";

export const metadata = {
  title: "Member Calendar Events",
  description: "Check your calendar events in Tennis Net Club",
};

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
        <CalendarHome />
      </Suspense>
    </div>
  );
}

export default CalendarPage;
