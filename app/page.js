import React, { Suspense } from "react";

import Starting from "@/components/starting/starting";
import Services from "@/components/services/services";
import TrainingHome from "@/components/training/training-home";
import ReservationHome from "@/components/reservation/reservation-home";
import LoadingData from "@/components/ui/loading-data";
import CalendarHome from "@/components/calendar/calendar-home";

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
      <TrainingHome />
      <ReservationHome />
      <Suspense fallback={<LoadingData />}>
        <CalendarHome />
      </Suspense>
    </main>
  );
}

export default HomePage;
