import React, { useContext, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import classes from "./booking-court.module.css";
import reserve from "@/public/images/reserve.jpg";
// import clay from "@/public/images/clay.jpg";
// import bookCourt from "@/public/images/hard.jpg";
import BookingCourtDate from "./booking-court-date";
import AuthContext from "@/store/auth-context";

function BookingCourt() {
  const { activeDay } = useContext(AuthContext);

  const times = [
    { id: "1", time: "09:00 am" },
    { id: "2", time: "10:00 am" },
    { id: "3", time: "11:00 am" },
    { id: "4", time: "12:00 am" },
    { id: "5", time: "01:00 pm" },
    { id: "6", time: "02:00 pm" },
    { id: "7", time: "03:00 pm" },
    { id: "8", time: "04:00 pm" },
    { id: "9", time: "05:00 pm" },
    { id: "10", time: "06:00 pm" },
    { id: "11", time: "07:00 pm" },
    { id: "12", time: "08:00 pm" },
    { id: "13", time: "09:00 pm" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [isShowCourts, setIsShowCourts] = useState(false);
  const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  const [isTime, setIsTime] = useState("");
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);

  const thisMonth = activeDay.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log("Info:", thisMonth, numberOfPlayers, isTime, selectedCourtType);

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

  const changeStep = () => {
    console.log("clicked");
    setCurrentStep(currentStep + 1);
    if (currentStep === 1) {
      setSecondStep(!secondStep);
    } else {
      setThirdStep(!thirdStep);
    }
  };

  const handleShowCourts = () => {
    setIsShowCourts(!isShowCourts);
  };

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  const handleChangeCourts = () => {
    setSelectedCourtType((prevCourtType) =>
      prevCourtType === "Clay Courts" ? "Clay Courts" : "Hard Courts"
    );

    setIsShowCourts(false);
  };

  return (
    <div className={classes.bookingContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={reserve}
          alt="reserve-court"
          style={{ filter: "brightness(0.7)" }}
          priority={true}
        />
        <h1>Reserve Court</h1>
      </div>
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

      {/* Booking Form (Players and Calendar) */}
      {currentStep === 1 && secondStep ? (
        <div>
          <div className={classes.bookingForm}>
            <div className={classes.bookingPlayers}>
              <Image
                src={courtTypeImages[selectedCourtType]}
                alt={selectedCourtType}
                style={{ filter: "brightness(0.7)" }}
                width={400}
                height={300}
              />
              <div className={classes.courtsContainer}>
                <h3>Courts:</h3>
                <AiFillCaretDown
                  onClick={handleShowCourts}
                  style={{ "margin-top": "1rem" }}
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
            <BookingCourtDate />
          </div>

          <div className={classes.timeContainer}>
            <h1>Time:</h1>
            <div className={classes.time}>
              {times.map((time) => (
                <button key={time.id} onClick={() => setIsTime(time.time)}>
                  {time.time}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : currentStep === 2 ? (
        <div className={classes.bookingForm}>
          <div className={classes.bookingPlayers}>
            <Image
              src={courtTypeImages[selectedCourtType]}
              alt={selectedCourtType}
              style={{ filter: "brightness(0.7)" }}
              width={400}
              height={300}
            />
          </div>
          <div className={classes.bookingDate}>
            <h1>Name: Naji</h1>
            <h1>Players: 1</h1>
            <h1>Date: 20/09/2023</h1>
            <h1>Time: 14:00</h1>
            <h1>Court: Clay Court</h1>
          </div>
        </div>
      ) : (
        <div>
          <h1>rama</h1>
        </div>
      )}
      <motion.div
        className={classes.bookButton}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={changeStep}
      >
        <p>Next</p>
      </motion.div>
    </div>
  );
}

export default BookingCourt;
