import React, { Fragment, useContext, useEffect } from "react";

import AuthContext from "@/store/auth-context";

import classes from "./booking-times-step.module.css";
import { generateTimeSlots } from "./generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/fetchTakenTimes";

function TimeSelectionStep(props) {
  const {
    setTimeInfo,
    timeSlots,
    isLoadingTimes,
    setIsLoadingTimes,
    activeDay,
    setTimeSlots,
  } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingTimes(true);
        // generate all the times
        const generatedTimes = await generateTimeSlots(activeDay);
        // fetch the taken times
        const takenTimes = await fetchTakenTimesFromMongo();
        // check if there are taken times and give them false status
        if (takenTimes && takenTimes.data.length > 0) {
          console.log("inside taken times");
          const updatedGeneratedTimes = generatedTimes.map((timeSlot) => {
            const isTaken = takenTimes.data.some(
              (takenTime) =>
                takenTime.date === timeSlot.date &&
                takenTime.time === timeSlot.time
            );
            return {
              ...timeSlot,
              status: isTaken ? "RESERVED" : timeSlot.status, // Set status to false if taken, true otherwise
            };
          });
          setTimeSlots(updatedGeneratedTimes);
        } else {
          console.log("without takentimes");
          setTimeSlots(generatedTimes);
        }

        setIsLoadingTimes(false);
      } catch (error) {
        console.error(error.message || "Error here!");
        setIsLoadingTimes(false);
      }
    }

    fetchData();
  }, [activeDay]);

  function timeHandler(time) {
    setTimeInfo(time);
    props.nextStepHandler();
  }
  console.log(timeSlots);
  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <h1>Choose Your Preferred Time:</h1>
        <hr />
        {isLoadingTimes ? (
          <p>Loading Times...</p>
        ) : (
          <div className={classes.timeSlotsContainer}>
            {timeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <p className={classes.time}>{timeSlot.time}</p>
                  {timeSlot.status === "PASSED TIME" ? (
                    <p
                      className={classes.booked}
                      onClick={() => timeHandler(timeSlot)}
                    >
                      PASSED TIME
                    </p>
                  ) : timeSlot.status === "RESERVED" ? (
                    <p className={classes.booked}>RESERVED</p>
                  ) : timeSlot.status === "NOT OPENED" ? (
                    <p className={classes.booked}>NOT OPENED</p>
                  ) : (
                    <p className={classes.book}>BOOK COURT</p>
                  )}
                </div>
              );

              // if (timeSlot.status === true) {
              //   return (
              //     <p
              //       className={classes.availableTime}
              //       key={timeSlot.id}
              //       onClick={() => timeHandler(timeSlot)}
              //     >
              //       {timeSlot.time}
              //     </p>
              //   );
              // } else {
              //   return (
              //     <p className={classes.notAvailableTime} key={timeSlot.id}>
              //       {timeSlot.time}
              //     </p>
              //   );
              // }
            })}
          </div>
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
