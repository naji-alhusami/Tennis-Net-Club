import React, { Fragment, useContext, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";

import BookingCalendar from "./booking-calendar";
import AuthContext from "@/store/auth-context";

import classes from "./booking-date-step.js.module.css";

function DateSelectionStep({
  handleChangeCourts,
  selectedCourtType,
  nextStepHandler,
  isShowCourts,
  setIsShowCourts,
}) {
  const { numberOfPlayers, setNumberOfPlayers } = useContext(AuthContext);

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

  return (
    <Fragment>
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
        <BookingCalendar nextStepHandler={nextStepHandler} />
      </div>

      {/* <motion.div
          className={classes.bookButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={changeStep}
        >
          <p>Next</p>
        </motion.div> */}
      {/* </div> */}
    </Fragment>
  );
}

export default DateSelectionStep;
