import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
import Booking from "@/components/home-page/booking";
import Events from "@/components/home-page/events";
import ClubCalendar from "@/components/home-page/club-calendar";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";

async function HomePage() {
  const takenTimes = await fetchTakenTimesFromMongo();
  const events = await fetchEventsFromMongo();
  console.log(takenTimes);
  console.log(events);

  const eventsAndTimes = [...takenTimes.data, ...events.data];

  return (
    <main>
      <Starting />
      <ClubCalendar eventsAndTimes={eventsAndTimes} />
      <Services />
      <Courses />
      <Numbers />
      <Booking />
      <Events />
    </main>
  );
}

export default HomePage;
