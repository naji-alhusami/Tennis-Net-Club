import React, { Fragment, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { sendDataToMongo } from "@/lib/sendTimeSlots";
import BookingCourtDate from "./booking-calendar";
import { generateTimeSlots } from "./generate-times";
import AuthContext from "@/store/auth-context";
import { AiFillCaretDown } from "react-icons/ai";

import classes from "./booking-first-step.module.css";
import { fetchDataFromMongo } from "@/lib/fetchTimeSlots";

function SelectionStep({
  handleChangeCourts,
  selectedCourtType,
  changeStep,
  isShowCourts,
  setIsShowCourts,
}) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { activeDay, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  const handleShowCourts = () => {
    setIsShowCourts(!isShowCourts);
  };

  const decreasePlayers = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers(numberOfPlayers - 1);
    }
  };

  const increasePlayers = () => {
    if (numberOfPlayers < 4) {
      setNumberOfPlayers(numberOfPlayers + 1);
    }
  };

  // useEffect of sending data to MongoDB
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
    // if (isLoading === false) {
    //   console.log(timeSlots);
    // }
  }, [activeDay]);

  return (
    <Fragment>
      <div>
        <div className={classes.bookingForm}>
          <div className={classes.bookingPlayers}>
            <Image
              src={courtTypeImages[selectedCourtType]}
              alt={selectedCourtType}
              style={{ filter: "brightness(0.7)" }}
              width={400}
              height={300}
              priority={true}
            />
            <div className={classes.courtsContainer}>
              <h3>Courts:</h3>
              <AiFillCaretDown
                onClick={handleShowCourts}
                style={{ marginTop: "1rem" }}
              />
              <div>
                {isShowCourts && (
                  <ul>
                    <li onClick={handleChangeCourts}>Clay Courts</li>
                    <li onClick={handleChangeCourts}>Hard Courts</li>
                  </ul>
                )}
              </div>
            </div>
            <div className={classes.playersContainer}>
              <h3>Players:</h3>
              <span>{numberOfPlayers}</span>
              <button onClick={increasePlayers}>+</button>
              <button onClick={decreasePlayers}>-</button>
            </div>
          </div>
          <BookingCourtDate setIsDaySelected={setIsDaySelected} />
        </div>

        <div className={classes.timeContainer}>
          <h1>Time:</h1>
          {!isDaySelected ? (
            <p>Select a day to view available times.</p>
          ) : (
            <div className={classes.time}>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                timeSlots.data.map((timeSlot) => {
                  if (timeSlot.status === true) {
                    return (
                      <button
                        key={timeSlot._id}
                        onClick={() => console.log("clicked")}
                        // onClick={() => timeHandler(timeSlot)}
                      >
                        {timeSlot.time}
                      </button>
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </div>
          )}
        </div>

        <motion.div
          className={classes.bookButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeStep}
        >
          <p>Next</p>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default SelectionStep;
