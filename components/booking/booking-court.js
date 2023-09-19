import React, { useContext, useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillCaretDown } from "react-icons/ai";

import AuthContext from "@/store/auth-context";
import BookingCourtDate from "./booking-court-date";
import { fetchTimeSlots, generateTime } from "./generate-times";
import classes from "./booking-court.module.css";
import reserve from "@/public/images/reserve.jpg";

// Start of send Times to Mongo
// async function sendTimeSlots(timeSlots) {
//   const response = await fetch("/api/timsSlots/insertTimeSlots", {
//     method: "POST",
//     body: JSON.stringify(timeSlots),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong!");
//   }
// }
// End of send Times to Mongo

function BookingCourt() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isShowCourts, setIsShowCourts] = useState(false);
  const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  const [isTime, setIsTime] = useState("");
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);
  const [timeSlots, setTimeSlots] = useState([]);
  
  const { data: session, status: loading } = useSession();
  
  const { activeDay, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);

  console.log(timeSlots);

  useEffect(() => {
    fetchTimeSlots(activeDay, setTimeSlots);
  }, [activeDay]);

  function timeHandler(time) {
    // console.log(time);
    setIsTime(time);
  }

  const choosenDate = activeDay.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
    setCurrentStep(currentStep + 1);
    if (currentStep === 1) {
      setSecondStep(!secondStep);
    } else if (currentStep === 2) {
      setThirdStep(!thirdStep);
    }
  };

  const reserveHandler = (event) => {
    event.preventDefault();
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

  if (loading === "loading" && session) {
    console.log("Loading");
    return <p>Loading...</p>;
  }

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
            <BookingCourtDate />
          </div>

          <div className={classes.timeContainer}>
            <h1>Time:</h1>
            <div className={classes.time}>
              {/* {timeSlots} */}
              {timeSlots.map((timeSlot) => (
                <button key={timeSlot.id} onClick={() => timeHandler(timeSlot)}>
                  {timeSlot.time}
                </button>
              ))}
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
      ) : currentStep === 2 && loading === "authenticated" ? (
        <>
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
              <p>
                <b>Name:</b> {session.user.name}
              </p>
              <p>
                <b>Players:</b> {numberOfPlayers}
              </p>
              <p>
                <b>Date:</b> {choosenDate}
              </p>
              <p>
                <b>Time:</b> {isTime}
              </p>
              <p>
                <b>Court:</b> {selectedCourtType}
              </p>
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
        </>
      ) : (
        <form onSubmit={reserveHandler}>
          <div>
            <h1>rama</h1>
          </div>
          <motion.div
            className={classes.bookButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <p>Confirm</p>
          </motion.div>
        </form>
      )}
    </div>
  );
}

export default BookingCourt;
