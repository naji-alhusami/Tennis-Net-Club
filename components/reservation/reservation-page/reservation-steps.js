"use client";
import React, { useContext } from "react";

import AuthContext from "@/store/auth-context";
import classes from "./reservation-steps.module.css";

function ReservationSteps({ searchParams }) {
  const { currentStep } = useContext(AuthContext);
  
  return (
    <div className={classes.stepsContainer}>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 1 && Object.keys(searchParams).length === 0
              ? classes.selectStep
              : ""
          }`}
        >
          1
        </div>
        <h3>SELECT DATE, COURT & PLAYERS</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 2 && searchParams.date && !searchParams.time
              ? classes.detailsStep
              : ""
          }`}
        >
          2
        </div>
        <h3>SELECT TIME</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} 
        ${
          currentStep === 3 && searchParams.date && searchParams.time
            ? classes.confirmStep
            : ""
        }
        `}
        >
          3
        </div>
        <h3>CONFIRM DETAILS</h3>
      </div>
    </div>
  );
}

export default ReservationSteps;
