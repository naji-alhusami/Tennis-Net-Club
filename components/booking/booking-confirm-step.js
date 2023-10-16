import React, { useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-confirm-step.module.css";
import { useSearchParams } from "next/navigation";

function ConfirmationStep(props) {
  const { numberOfPlayers, timeInfo } = useContext(AuthContext);

  const router = useSearchParams();
  console.log(router.get("date"));

  console.log(timeInfo);
  return (
    <div className={classes.bookingForm}>
      {/* <div className={classes.bookingPlayers}>
        <Image
          src={props.courtTypeImages[props.selectedCourtType]}
          alt={props.selectedCourtType}
          style={{ filter: "brightness(0.7)" }}
          width={400}
          height={300}
        />
      </div> */}
      <div className={classes.bookingDate}>
        {/* <p>
          <b>Name:</b> {props.session.user.name}
        </p> */}
        <p>
          <b>Players:</b> {router.get("players")}
        </p>
        <p>
          <b>Date:</b> {router.get("date")}
        </p>
        <p>
          <b>Time:</b> {router.get("time")}
        </p>
        <p>{/* <b>Court:</b> {props.selectedCourtType} */}</p>
      </div>
      <p onClick={props.prevStepHandler}>Back</p>
    </div>
  );
}

export default ConfirmationStep;
