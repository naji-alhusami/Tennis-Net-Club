import React, { useContext, useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillCaretDown } from "react-icons/ai";

import AuthContext from "@/store/auth-context";
import BookingCourtDate from "./booking-court-date";

import classes from "./booking-court.module.css";
import reserve from "@/public/images/reserve.jpg";

// Start of send Times to Mongo
async function sendTimeSlots(timeSlots) {
  const response = await fetch("/api/timsSlots/insertTimeSlots", {
    method: "POST",
    body: JSON.stringify(timeSlots),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}
// End of send Times to Mongo

function BookingCourt() {
  const { data: session, status: loading } = useSession();

  const { activeDay, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);
  console.log(activeDay);

  function generateTimeSlots(day) {
    const timeSlots = [];
    const startTime = new Date(day);
    startTime.setHours(9, 0, 0, 0); // Set the start time to 09:00:00

    const endTime = new Date(day);
    endTime.setHours(21, 0, 0, 0); // Set the end time to 21:00:00

    const intervalMinutes = 60; // You can adjust this to your desired time slot interval

    let currentTime = new Date(startTime);
    let idCounter = 1;

    while (currentTime <= endTime) {
      // Format the time as a string with date and time information
      const formattedTime = new Date(currentTime).toString();

      timeSlots.push({ id: idCounter, time: formattedTime });
      currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
      idCounter++;
    }

    return timeSlots;
  }

  const times = generateTimeSlots(activeDay);

  // console.log(times);

  const newTimesFormatted = times.map((time) => {
    const match = time.time.match(/(\d{2}):(\d{2})/);
    // console.log(match);
    return match[0];
  });

  // console.log(newTimesFormatted);

  function generateTime(date) {
    // console.log(date);
    // const timeSlots = [];
    // const startTime = date.clone().hour(9).minute(0);
    // const endTime = date.clone().hour(21).minute(0);
    // const intervalMinutes = 60; // Adjust as needed

    // while (startTime.isBefore(endTime)) {
    //   timeSlots.push({
    //     dateTime: startTime.clone().toISOString(),
    //     status: "available",
    //   });

    //   startTime.add(intervalMinutes, "minutes");
    // }

    // return timeSlots;
  }
  const newTimes = generateTime(activeDay);
  // console.log(newTimes);

  // function generateTimeSlots(day) {
  //   console.log(day);
  //   const times = [];
  //   const startTime = new Date(day);
  //   startTime.setHours(9, 0, 0, 0); // Set the time to 00:00:00
  //   console.log(startTime);
  //   const endTime = new Date(day);
  //   endTime.setHours(21, 0, 0, 0); // Set the time to 23:59:59.999

  //   const intervalMinutes = 60; // You can adjust this to your desired time slot interval

  //   let currentTime = startTime;
  //   let idCounter = 1;

  //   while (currentTime <= endTime) {
  //     const hours = currentTime.getHours();
  //     const minutes = currentTime.getMinutes();

  //     // Format the time as "hh:mm am/pm"
  //     const formattedTime =
  //       (hours % 12 || 12) +
  //       ":" +
  //       (minutes < 10 ? "0" : "") +
  //       minutes +
  //       " " +
  //       (hours < 12 ? "am" : "pm");

  //     times.push({ id: idCounter, time: formattedTime });

  //     currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  //     idCounter++;
  //   }

  //   return times;
  // }

  function timeHandler(time) {
    // console.log(time);
    setIsTime(time);
  }

  const choosenDate = activeDay.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isShowCourts, setIsShowCourts] = useState(false);
  const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  const [isTime, setIsTime] = useState("");
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);

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
              {newTimesFormatted.map((time) => (
                <button key={time.id} onClick={() => timeHandler(time)}>
                  {time}
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
