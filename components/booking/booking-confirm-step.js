import React, { Fragment, useState, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-confirm-step.module.css";
import Link from "next/link";

function ConfirmationStep(props) {
  const { numberOfPlayers, timeInfo } = useContext(AuthContext);

  return (
    <div className={classes.bookingForm}>
      <div className={classes.bookingPlayers}>
        <Image
          src={props.courtTypeImages[props.selectedCourtType]}
          alt={props.selectedCourtType}
          style={{ filter: "brightness(0.7)" }}
          width={400}
          height={300}
        />
      </div>
      <div className={classes.bookingDate}>
        <p>
          <b>Name:</b> {props.session.user.name}
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
          <b>Court:</b> {props.selectedCourtType}
        </p>
      </div>
      <p onClick={props.prevStepHandler}>Back</p>
    </div>
  );
}

export default ConfirmationStep;
