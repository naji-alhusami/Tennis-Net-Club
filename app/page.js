import React from "react";

import Starting from "@/components/home-page/starting";
import Services from "@/components/home-page/services";
import Courses from "@/components/home-page/courses";
import Numbers from "@/components/home-page/numbers";
import Booking from "@/components/home-page/booking";
// import Events from "@/components/home-page/events";
import ClubCalendar from "@/components/home-page/club-calendar";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { events } from "@/lib/events/extraEventsData";

async function HomePage() {
  // const extraEvents = await ExtraEvents();
  const takenTimes = await fetchTakenTimesFromMongo();
  const bookingEvents = await fetchEventsFromMongo();
  // console.log(events);
  console.log(takenTimes);

  const eventsAndTimes = [...takenTimes.data, ...bookingEvents.data, ...events];
  // console.log(eventsAndTimes);

  return (
    <main>
      <Starting />
      <Services />
      <Courses />
      <Numbers />
      <Booking />
      <ClubCalendar eventsAndTimes={eventsAndTimes} />
      {/* <Events /> */}
    </main>
  );
}

export default HomePage;
