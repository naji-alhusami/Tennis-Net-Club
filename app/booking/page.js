import React from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/booking-Info";

import classes from "@/components/booking/booking";
import { fetchTimeSlots } from "@/lib/generate-times";

async function BookingPage({ searchParams }) {
  const newDate = searchParams.date;
  const timeSlots = await fetchTimeSlots(newDate);

  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <BookingInfo timeSlots={timeSlots} />
      {/* <BookingCourt /> */}
    </div>
  );
}

export default BookingPage;
