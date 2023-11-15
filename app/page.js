import React, { Suspense } from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Booking from "@/components/home-page/booking";
import CalendarEvents from "@/components/calendar/calendar-events";
import LoadingData from "@/components/ui/loading-data";

async function HomePage() {
  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      <Booking />
      <Suspense fallback={<LoadingData />}>
        <CalendarEvents />
      </Suspense>
      {/* <Events /> */}
    </main>
  );
}

export default HomePage;
