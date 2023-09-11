import React, { useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import classes from "./booking-court.module.css";
import reserve from "@/public/images/reserve.jpg";
import clay from "@/public/images/clay.jpg";
import BookingCourtDate from "./booking-court-date";

function BookingCourt() {
  const times = [
    { id: "1", time: "09:00 am" },
    { id: "2", time: "10:00 am" },
    { id: "3", time: "11:00 am" },
    { id: "4", time: "12:00 am" },
    { id: "5", time: "01:00 pm" },
    { id: "6", time: "02:00 pm" },
    { id: "7", time: "03:00 pm" },
    { id: "8", time: "04:00 pm" },
    { id: "9", time: "05:00 pm" },
    { id: "10", time: "06:00 pm" },
    { id: "11", time: "07:00 pm" },
    { id: "12", time: "08:00 pm" },
    { id: "13", time: "09:00 pm" },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const changeStep = () => {
    setCurrentStep(currentStep + 1); // Increment currentStep by 1
  };

  return (
    <div className={classes.bookingContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={reserve}
          alt="reserve-court"
          style={{ filter: "brightness(0.7)" }}
          priority={true}
        />
        <h1>Reserve Court</h1>
      </div>
      <div className={classes.stepsContainer}>
        <div className={classes.stepContainer}>
          <div
            className={`${classes.stepsCircle} ${
              currentStep === 1 ? classes.selectStep : ""
            }`}
          >
            1
          </div>
          <h3>SELECT</h3>
        </div>
        <div className={classes.stepContainer}>
          <div
            className={`${classes.stepsCircle} ${
              currentStep === 2 ? classes.detailsStep : ""
            }`}
          >
            2
          </div>
          <h3>DETAILS</h3>
        </div>
        <div className={classes.stepContainer}>
          <div
            className={`${classes.stepsCircle} 
            ${currentStep === 3 ? classes.confirmStep : ""}
            `}
          >
            3
          </div>
          <h3>CONFIRM</h3>
        </div>
      </div>
      <div className={classes.bookingForm}>
        <div className={classes.bookingPlayers}>
          <Image src={clay} alt="clay-courts" priority={true} />
        </div>
        <BookingCourtDate />
      </div>
      <div className={classes.timeContainer}>
        <h1>Time:</h1>
        <div className={classes.time}>
          {times.map((time) => (
            <button key={time.id}>{time.time}</button>
          ))}
        </div>
        <motion.div
          className={classes.bookButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <Link className={classes.bookButton} href="/auth/login"> */}

          <button onClick={changeStep}>Book Now</button>
          {/* </Link> */}
        </motion.div>
      </div>
    </div>
  );
}

export default BookingCourt;
