"use client";
import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
import Booking from "@/components/home-page/booking";
import Events from "@/components/home-page/events";
import ClubCalendar from "@/components/home-page/club-calendar";

function HomePage() {
  // throw new Error("error in hamo page");
  return (
    <main>
      <Starting />
      <ClubCalendar />
      <Services />
      <Courses />
      <Numbers />
      <Booking />
      <Events />
    </main>
  );
}

export default HomePage;
