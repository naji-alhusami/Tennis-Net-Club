import React, { Suspense } from "react";

import ReservationImage from "@/components/reservation/reservation-page/reservation-image-page";
import ReservationSteps from "@/components/reservation/reservation-page/reservation-steps";
import ReservationInfo from "@/components/reservation/reservation-page/reservation-info";
import LoadingData from "@/components/ui/loading-data";
import classes from "@/components/reservation/reservation-page/reservation-image-page.module.css";

export const metadata = {
  title: "Booking Court",
  description: "Book court with Tennis Net Club",
};

async function ReservationPage({ searchParams }) {
  return (
    <div className={classes.bookingContainer}>
      <ReservationImage />
      <ReservationSteps />
      <Suspense fallback={<LoadingData />}>
        <ReservationInfo searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default ReservationPage;
