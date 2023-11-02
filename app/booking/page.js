import React from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/booking-Info";

import classes from "@/components/booking/booking";
import { fetchTimeSlots } from "@/lib/generate-times";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";

async function BookingPage({ searchParams }) {
  const newDate = searchParams.date;
  const newCourt = searchParams.court;
  const timeSlots = await fetchTimeSlots(newDate, newCourt);
  const events = await fetchEventsFromMongo();

  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <BookingInfo timeSlots={timeSlots} events={events} />
    </div>
  );
}

export default BookingPage;
