"use client";
import React, { Fragment, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";
import { motion } from "framer-motion";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";

import BookingCalendar from "./booking-calendar";
import AuthContext from "@/store/auth-context";

import classes from "./booking-date-step.js.module.css";
import Link from "next/link";

function DateSelectionStep({
  handleChangeCourts,
  // selectedCourtType,
  isShowCourts,
  setIsShowCourts,
}) {
  const searchParams = useSearchParams();
  const path = searchParams.has("date");

  const {
    activeDay,
    numberOfPlayers,
    setNumberOfPlayers,
    nextButton,
    nextStepHandler,
    currentStep,
  } = useContext(AuthContext);
  console.log(path, currentStep);

  let formattedDate = null;
  if (activeDay) {
    const month = activeDay.toLocaleString("en-US", { month: "short" });
    const day = activeDay.getDate();
    const year = activeDay.getFullYear();

    formattedDate = `${month}-${day}-${year}`;

    console.log(formattedDate); // Output: "Oct-05-2023"
  }

  const [selectedCourtType, setSelectedCourtType] = useState(""); // Default selected value

  const handleCourtTypeChange = (e) => {
    setSelectedCourtType(e.target.value);
    console.log(selectedCourtType);
  };

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  // const handleShowCourts = () => {
  //   setIsShowCourts(!isShowCourts);
  // };

  // const decreasePlayers = () => {
  //   if (numberOfPlayers > 1) {
  //     setNumberOfPlayers(numberOfPlayers - 1);
  //   }
  // };

  // const increasePlayers = () => {
  //   if (numberOfPlayers < 4) {
  //     setNumberOfPlayers(numberOfPlayers + 1);
  //   }
  // };

  // function dateSelectionHandler() {
  // console.log("clicked");
  // console.log(activeDay);
  // console.log(router.route);
  // const encodedDay = encodeURIComponent(activeDay);
  // nextStepHandler();
  // router.push(`/booking/?date=${formattedDate}`);
  // }

  // const playersAndCourtSelectionStyle = {
  //   backgroundImage: `url(${courtTypeImages[selectedCourtType]})`,
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   backgroundSize: "cover",
  //   width: "500px",
  //   height: "400px",
  //   filter: "brightness(0.7)",
  // };

  return (
    <Fragment>
      <div className={classes.firstStepContainer}>
        <div className={classes.playersAndCourtContainer}>
          <div>
            <h1>Choose Court & Players Number:</h1>
          </div>
          <div>
            <label htmlFor="courtType">Court Type:</label>
            <select value={selectedCourtType} onChange={handleCourtTypeChange}>
              <option>--- Select Court Type ---</option>
              <option value="Clay Court">Clay Court</option>
              <option value="Hard Court">Hard Court</option>
            </select>
            <label htmlFor="numPlayers">Number of Players:</label>
            <select>
              <option>--- Select Players Number ---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className={classes.playersDateContainer}>
          {selectedCourtType === "Clay Court" ? (
            <Image
              src={clay}
              alt={selectedCourtType}
              width={500}
              height={400}
              priority={true}
            />
          ) : (
            <Image
              src={hard}
              alt={selectedCourtType}
              width={500}
              height={400}
              priority={true}
            />
          )}
          {/* <div
            style={playersAndCourtSelectionStyle}
            className={classes.playersAndCourtSelectionStyle}
          >
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
            <div>
              <h3>Players:</h3>
              <span>{numberOfPlayers}</span>
              <button onClick={increasePlayers}>+</button>
              <button onClick={decreasePlayers}>-</button>
            </div>
          </div> */}
          <div>
            <BookingCalendar nextStepHandler={nextStepHandler} />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          {activeDay ? (
            <Link href="/booking" style={{ color: "white" }}>
              <div
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.9 }}
                href={`/booking/?date=${formattedDate}`}
                onClick={() => nextStepHandler()}
                className={classes.nextButton}
              >
                Next
              </div>
            </Link>
          ) : (
            <div className={classes.nextButtonDisabled}>Next</div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default DateSelectionStep;

{
  /* <div className={classes.bookingPlayers}>
  

 
</div>; */
}
