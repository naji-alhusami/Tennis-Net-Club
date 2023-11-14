import React, { Suspense } from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
import Booking from "@/components/home-page/booking";
// import Events from "@/components/home-page/events";
import Headers from "@/components/ui/headers";
import classes from "../components/calendar/calendar-events.module.css";
import CalendarEvents from "@/components/calendar/calendar-events";

// import { useSession } from "next-auth/react";

async function HomePage() {
  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      {/* <Numbers /> */}
      <Booking />
      <div className={classes.eventsContainer}>
        <div className={classes.text}>
          <Headers
            H3Header="Courses, Lessons & Reserved Courts"
            H1Header="TIME SLOTS"
            H2Header="Club Calendar"
            PHeader="Check the club calendar including (events, training sessions, and
            reserved courts)"
          />
        </div>
        <Suspense
          fallback={<h1 style={{ height: "600px" }}>Loading Calendar...</h1>}
        >
          <CalendarEvents />
        </Suspense>
      </div>
      {/* <Events /> */}
    </main>
  );
}

export default HomePage;
