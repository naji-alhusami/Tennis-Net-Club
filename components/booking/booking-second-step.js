import React, { Fragment, useState, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-second-step.module.css";

function DetailsStep({
  session,
  selectedCourtType,
  courtTypeImages,
  changeStep,
}) {
  const [isTime, setIsTime] = useState("");
  const { activeDay, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);

  const choosenDate = activeDay.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Fragment>
      <div className={classes.bookingForm}>
        <div className={classes.bookingPlayers}>
          <Image
            src={courtTypeImages[selectedCourtType]}
            alt={selectedCourtType}
            style={{ filter: "brightness(0.7)" }}
            width={400}
            height={300}
          />
        </div>
        <div className={classes.bookingDate}>
          <p>
            <b>Name:</b> {session.user.name}
          </p>
          <p>
            <b>Players:</b> {numberOfPlayers}
          </p>
          <p>
            <b>Date:</b> {choosenDate}
          </p>
          <p>
            <b>Time:</b> {isTime}
          </p>
          <p>
            <b>Court:</b> {selectedCourtType}
          </p>
        </div>
      </div>
      <motion.div
        className={classes.bookButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={changeStep}
      >
        <p>Next</p>
      </motion.div>
    </Fragment>
  );
}

export default DetailsStep;
