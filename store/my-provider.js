'use client'

import React, { useState } from "react";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeInfo, setTimeInfo] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(true);
  const [takenTimes, setTakenTimes] = useState([]);
  const [nextButton, setNextButton] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [secondStep, setSecondStep] = useState(true);
  const [thirdStep, setThirdStep] = useState(true);

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

  return (
    <AuthContext.Provider
      value={{
        currentDay,
        activeDay,
        setActiveDay,
        numberOfPlayers,
        setNumberOfPlayers,
        timeInfo,
        setTimeInfo,
        timeSlots,
        setTimeSlots,
        isLoadingTimes,
        setIsLoadingTimes,
        takenTimes,
        setTakenTimes,
        nextButton,
        setNextButton,
        currentStep,
        setCurrentStep,
        nextStepHandler,
        prevStepHandler,
        secondStep,
        setSecondStep,
        thirdStep,
        setThirdStep,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
