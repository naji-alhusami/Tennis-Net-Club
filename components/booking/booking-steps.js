import React from "react";

import classes from "./booking-steps.module.css";

function BookingSteps({ currentStep }) {
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
  );
}

export default BookingSteps;
