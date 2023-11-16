import React, { Suspense } from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Booking from "@/components/home-page/booking";
import CalendarEvents from "@/components/calendar/calendar-events";
import LoadingData from "@/components/ui/loading-data";

export const metadata = {
  title: "Tennis Net Club",
  description:
    "Join the ultimate tennis experience in Istanbul! Sign up, log in, to become member of the club, and easily book courts to enjoy your favorite sport. Manage your bookings seamlessly and connect with fellow club members to find tennis partners. Elevate your game with Tennis Net Club – your go-to destination for everything tennis!",
};

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
    </main>
  );
}

export default HomePage;
