import React from "react";

import Image from "next/image";

import classes from "./booking.module.css";
import bookCourt from "@/public/images/bookCourt.jpg";
import bg from "@/public/images/background1.jpg";

function Booking() {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.leftSideContainer}>
          <Image src={bg} alt="cover-image" layout="fill" objectFit="cover" />
        </div>
        <div className={classes.textContainer}>
          <h4>Best Courts</h4>
          <h1>Reserve Your Court</h1>
          <p>
            Come and Reserve your courtCome and Reserve your courtCome and
            Reserve your courtCome and Reserve your court
          </p>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <div className={classes.imageWrapper}>
          <Image
            src={bookCourt}
            alt="book-court"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Booking;
