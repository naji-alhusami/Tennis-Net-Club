import React, { useState, useEffect, useContext, Fragment } from "react";
import { motion } from "framer-motion";

import { fetchDataFromMongo } from "@/lib/fetchTimeSlots";
// import { sendDataToMongo } from "@/lib/sendTimeSlots";
import { generateTimeSlots } from "./generate-times";
import AuthContext from "@/store/auth-context";

import classes from "./booking-times-step.module.css";

// async function sendDataToMongo(generatedTimes) {
//   console.log(generatedTimes);
//   const response = await fetch("/api/timeSlots/insertTimeSlots", {
//     method: "POST",
//     body: JSON.stringify(generatedTimes),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const timeSlotsData = await response.json();

//   if (!response.ok) {
//     throw new Error(timeSlotsData.message || "Something went wrong!");
//   }
// }

function TimeSelectionStep(props) {
  const { activeDay, setTimeInfo, isDaySelected, timeSlots, isLoading } = useContext(AuthContext);
  // const [timeSlots, setTimeSlots] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  console.log(timeSlots);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       // Send & Fetch data to MongoDB
  //       // if (isLoading) {
  //       const generatedTimes = await generateTimeSlots(activeDay);
  //       await sendDataToMongo(generatedTimes);

  //       // Fetch data from MongoDB
  //       const dataFromMongo = await fetchDataFromMongo();
  //       setTimeSlots(dataFromMongo);

  //       setIsLoading(false);
  //       // }
  //     } catch (error) {
  //       console.error(error.message || "Error here!");
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [activeDay]);
  // console.log(timeSlots);

  function timeHandler(time) {
    console.log(time);
    setTimeInfo(time);
    console.log(activeDay);
    // setIsTime(time);
    props.nextStepHandler();
  }
  console.log(timeSlots);

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <h1>Time:</h1>
        {!isDaySelected ? (
          <p>Select a day to view available times.</p>
        ) : (
          <div>
            {isLoading ? (
              <p>Loading...</p>
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
