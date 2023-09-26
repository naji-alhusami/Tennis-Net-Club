import React, { useContext, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

import reserve from "@/public/images/reserve.jpg";
import BookingSteps from "./booking-steps";
import SelectionStep from "./booking-first-step";
import DetailsStep from "./booking-second-step";
import classes from "./booking.module.css";
import AuthContext from "@/store/auth-context";

function BookingCourt({ session }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);
  const [isShowCourts, setIsShowCourts] = useState(false);
  const { timeInfo } = useContext(AuthContext);

  console.log(timeInfo);
  // function timeHandler(time) {
  //   console.log(time);
  // setIsTime(time);
  // }

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
    console.log("click on confirm");
    console.log(timeInfo);
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
      <BookingSteps currentStep={currentStep} />

      {/* Booking Form (Players and Calendar) */}
      <form onSubmit={reserveHandler}>
        {currentStep === 1 && secondStep ? (
          <SelectionStep
            handleChangeCourts={handleChangeCourts}
            selectedCourtType={selectedCourtType}
            courtTypeImages={courtTypeImages}
            changeStep={changeStep}
            isShowCourts={isShowCourts}
            setIsShowCourts={setIsShowCourts}
          />
        ) : currentStep === 2 ? (
          <DetailsStep
            session={session}
            selectedCourtType={selectedCourtType}
            courtTypeImages={courtTypeImages}
            changeStep={changeStep}
          />
        ) : (
          <div>
            <div>
              <h1>rama</h1>
            </div>
            <motion.div
              className={classes.bookButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button>Confirm</button>
            </motion.div>
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingCourt;
