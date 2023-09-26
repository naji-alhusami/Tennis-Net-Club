import React, { useState, useEffect, useContext } from "react";

import { fetchDataFromMongo } from "@/lib/fetchTimeSlots";
import { generateTimeSlots } from "./generate-times";
import AuthContext from "@/store/auth-context";

import classes from "./booking-times-step.module.css";
import { sendDataToMongo } from "@/lib/sendTimeSlots";

function TimeSelectionStep(props) {
  const { activeDay, isDaySelected, setTimeInfo } = useContext(AuthContext);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (activeDay) {
          // Fetch and send data to MongoDB
          const timeSlots = await generateTimeSlots(activeDay);
          await sendDataToMongo(timeSlots);

          // Fetch data from MongoDB
          const dataFromMongo = await fetchDataFromMongo();
          setTimeSlots(dataFromMongo);

          setIsLoading(false);
        }
      } catch (error) {
        console.error(error.message || "Error here!");
        setIsLoading(false);
      }
    }

    fetchData();
  }, [activeDay]);

  function timeHandler(time) {
    console.log(time);
    setTimeInfo(time);
    console.log(activeDay);
    // setIsTime(time);
    props.changeStep();
  }

  return (
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
  );
}

export default TimeSelectionStep;
