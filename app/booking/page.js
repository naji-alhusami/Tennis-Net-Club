import React, { Suspense } from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/booking-Info";

import classes from "@/components/booking/booking";

async function BookingPage({ searchParams }) {
  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <Suspense fallback={<h1>Loading...</h1>}>
        <BookingInfo searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default BookingPage;
