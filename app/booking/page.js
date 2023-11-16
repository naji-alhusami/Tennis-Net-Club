import React, { Suspense } from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/booking-Info";

import classes from "@/components/booking/booking";
import LoadingData from "@/components/ui/loading-data";

export const metadata = {
  title: "Booking Court",
  description: "Book court with Tennis Net Club"
};

async function BookingPage({ searchParams }) {
  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <Suspense fallback={<LoadingData />}>
        <BookingInfo searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default BookingPage;
