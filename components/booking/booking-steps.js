"use client";
import React, { useContext } from "react";

import AuthContext from "@/store/auth-context";
import classes from "./booking-steps.module.css";

function BookingSteps() {
  const { currentStep } = useContext(AuthContext);

  return (
    <div className={classes.stepsContainer}>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 1 ? classes.selectStep : ""
          }`}
        >
          1
        </div>
        <h3>SELECT DATE, COURT & PLAYERS</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 2 ? classes.detailsStep : ""
          }`}
        >
          2
        </div>
        <h3>SELECT TIME</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} 
        ${currentStep === 3 ? classes.confirmStep : ""}
        `}
        >
          3
        </div>
        <h3>CONFIRM DETAILS</h3>
      </div>
    </div>
  );
}

export default BookingSteps;
