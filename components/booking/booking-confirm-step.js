import React, { Fragment, useState, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-confirm-step.module.css";

function ConfirmationStep({
  session,
  selectedCourtType,
  courtTypeImages,
}) {
  const { numberOfPlayers, timeInfo } = useContext(AuthContext);
  console.log(timeInfo);

  return (
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
          <b>Date:</b> {timeInfo.date}
        </p>
        <p>
          <b>Time:</b> {timeInfo.time}
        </p>
        <p>
          <b>Court:</b> {selectedCourtType}
        </p>
      </div>
    </div>
  );
}

export default ConfirmationStep;
