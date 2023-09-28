import React, { Fragment, useContext } from "react";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";

import classes from "./booking-times-step.module.css";

function TimeSelectionStep(props) {
  const { setTimeInfo, timeSlots, isLoadingTimes } =
    useContext(AuthContext);

  function timeHandler(time) {
    console.log(time);
    setTimeInfo(time);
    // setTakenTimes(time);
    // console.log(activeDay);
    // setIsTime(time);
    props.nextStepHandler();
  }

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <h1>Time:</h1>
        {isLoadingTimes ? (
          <p>Loading Times...</p>
        ) : (
          timeSlots.data.map((timeSlot) => {
            if (timeSlot.status === true) {
              return (
                <p
                  className={classes.availableTime}
                  key={timeSlot._id}
                  onClick={() => timeHandler(timeSlot)}
                >
                  {timeSlot.time}
                </p>
              );
            } else {
              return (
                <p className={classes.notAvailableTime} key={timeSlot._id}>
                  {timeSlot.time}
                </p>
              );
            }
          })
        )}
      </div>
      <p
        className={classes.bookButton}
        // whileHover={{ scale: 1.1 }}
        // whileTap={{ scale: 0.9 }}
        onClick={props.prevStepHandler}
      >
        Back
      </p>
    </Fragment>
  );
}

export default TimeSelectionStep;
