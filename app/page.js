import React, { Suspense } from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Booking from "@/components/home-page/booking";
import CalendarEvents from "@/components/calendar/calendar-events";
import LoadingData from "@/components/ui/loading-data";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function HomePage() {
  // const session = await getServerSession(authOptions);
  // console.log("session", session);

  // if (session === null) {
  //   <LoadingData />;
  // }
  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      <Booking />
      <Suspense fallback={<LoadingData />}>
        <CalendarEvents />
      </Suspense>
    </main>
  );
}

export default HomePage;
