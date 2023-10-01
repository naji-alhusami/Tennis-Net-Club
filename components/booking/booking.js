import React, { useState, useContext, useEffect } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import DateSelectionStep from "./booking-date-step";
import TimeSelectionStep from "./booking-times-step";
import ConfirmationStep from "./booking-confirm-step";
import reserve from "@/public/images/reserve.jpg";
import BookingSteps from "./booking-steps";
import classes from "./booking.module.css";
import AuthContext from "@/store/auth-context";
import { editDataInMongo, sendTakenTimesToMongo } from "@/lib/sendTakenTimes";

function BookingCourt({ session }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);

  const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  const [isShowCourts, setIsShowCourts] = useState(false);
  const { setActiveDay, timeInfo } = useContext(AuthContext);

  const nextStepHandler = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 1) {
      setSecondStep(!secondStep);
    } else if (currentStep === 2) {
      setThirdStep(!thirdStep);
    }
  };

  const prevStepHandler = () => {
    setCurrentStep(currentStep - 1);
    setActiveDay();
  };

  async function reserveHandler(event) {
    event.preventDefault();
    console.log("click on confirm");
    if (timeInfo) {
      console.log(timeInfo);
      await sendTakenTimesToMongo(timeInfo);
    }
  }

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  const handleChangeCourts = () => {
    setSelectedCourtType((prevCourtType) =>
      prevCourtType === "Clay Courts" ? "Hard Courts" : "Clay Courts"
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
      <BookingSteps currentStep={currentStep} />

      {/* Booking Form (Players and Calendar) */}
      <form onSubmit={reserveHandler}>
        {currentStep === 1 ? (
          <DateSelectionStep
            handleChangeCourts={handleChangeCourts}
            selectedCourtType={selectedCourtType}
            courtTypeImages={courtTypeImages}
            nextStepHandler={nextStepHandler}
            isShowCourts={isShowCourts}
            setIsShowCourts={setIsShowCourts}
          />
        ) : currentStep === 2 ? (
          <TimeSelectionStep
            nextStepHandler={nextStepHandler}
            prevStepHandler={prevStepHandler}
          />
        ) : currentStep === 3 ? (
          <div>
            <ConfirmationStep
              session={session}
              selectedCourtType={selectedCourtType}
              courtTypeImages={courtTypeImages}
              prevStepHandler={prevStepHandler}
            />
            <motion.div
              className={classes.bookButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button type="submit">Confirm</button>
            </motion.div>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default BookingCourt;
