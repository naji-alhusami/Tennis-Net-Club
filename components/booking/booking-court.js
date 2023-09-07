import React from "react";

import Image from "next/image";

import reserve from "@/public/images/reserve.jpg";
import classes from "./booking-court.module.css";

function BookingCourt() {
  return (
    <div>
      <div className={classes.imageContainer}>
        <Image src={reserve} alt="reserve-court" />
        <h1>Reserve Court</h1>
      </div>
    </div>
  );
}

export default BookingCourt;
