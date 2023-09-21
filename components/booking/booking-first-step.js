import React, { Fragment, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import BookingCourtDate from "./booking-calendar";
import { fetchTimeSlots } from "./generate-times";
import AuthContext from "@/store/auth-context";
import { AiFillCaretDown } from "react-icons/ai";

import classes from "./booking-first-step.module.css";

function SelectionStep({
  handleChangeCourts,
  selectedCourtType,
  changeStep,
  isShowCourts,
  setIsShowCourts,
}) {

  const { activeDay, numberOfPlayers, setNumberOfPlayers, timeSlots } =
    useContext(AuthContext);
  // useEffect(() => {
  //   // console.log("Effect is running with activeDay:", activeDay);
  //   fetchTimeSlots(activeDay, setTimeSlots);
  // }, [activeDay, setTimeSlots]);

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

  // console.log(timeSlots);

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
          <BookingCourtDate timeSlots={timeSlots} />
        </div>

        <div className={classes.timeContainer}>
          <h1>Time:</h1>
          <div className={classes.time}>
            {timeSlots.map((timeSlot) => {
              // console.log(timeSlot);
              if (timeSlot.status === true) {
                return (
                  <button
                    key={timeSlot.id}
                    onClick={() => console.log("clicked")}
                    // onClick={() => timeHandler(timeSlot)}
                  >
                    {timeSlot.time}
                  </button>
                );
              } else {
                return null;
              }
            })}
          </div>
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
