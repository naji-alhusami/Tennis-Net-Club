import React from "react";

import Image from "next/image";

import classes from "./booking-court.module.css";
import reserve from "@/public/images/reserve.jpg";
import clay from "@/public/images/clay.jpg";
import calendarBackground from "@/public/images/calendarBackground.jpg";

function BookingCourt() {
  return (
    <div className={classes.bookingContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={reserve}
          alt="reserve-court"
          style={{ filter: "brightness(0.8)" }}
        />
        <h1>Reserve Court</h1>
      </div>
      <div className={classes.stepsContainer}>
        <div className={classes.stepContainer}>
          <div className={classes.stepsCircle}>1</div>
          <h3>SELECT</h3>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepsCircle}>2</div>
          <h3>DETAILS</h3>
        </div>
        <div className={classes.stepContainer}>
          <div className={classes.stepsCircle}>3</div>
          <h3>CONFIRM</h3>
        </div>
      </div>
      <div className={classes.bookingForm}>
        <div className={classes.bookingPlayers}>
          <Image src={clay} alt="clay-courts" />
        </div>
        <div className={classes.bookingDate}>
          <Image src={calendarBackground} alt="calender-bg" />
        </div>
      </div>
    </div>
  );
}

export default BookingCourt;
