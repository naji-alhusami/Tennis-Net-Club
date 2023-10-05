import React from "react";

import Image from "next/image";
import reserve from "@/public/images/reserve.jpg";
import classes from "./booking-container.module.css";

function BookingContainer() {
  return (
    <div className={classes.imageContainer}>
      <Image
        src={reserve}
        alt="reserve-court"
        style={{ filter: "brightness(0.7)" }}
        priority={true}
      />
      <h1>Reserve Court</h1>
    </div>
  );
}

export default BookingContainer;
