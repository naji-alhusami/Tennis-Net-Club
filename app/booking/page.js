import React from "react";
import BookingContainer from "@/components/booking/booking-container";
import BookingSteps from "@/components/booking/booking-steps";
import BookingInfo from "@/components/booking/BookingInfo";

import classes from "@/components/booking/booking";
import { fetchData } from "@/lib/fetchTimesAction";

async function BookingPage() {
  // const dateForTest = new Date();
  // const data = await fetchData(dateForTest);
  // console.log(data);

  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />
      <BookingInfo />
      {/* <BookingCourt /> */}
    </div>
  );
}

export default BookingPage;
