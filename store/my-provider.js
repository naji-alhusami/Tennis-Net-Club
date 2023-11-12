"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const searchParams = useSearchParams();
  const datePath = searchParams.has("date");
  const timePath = searchParams.has("time");
  const initialStep = timePath && datePath ? 3 : datePath && !timePath ? 2 : 1;

  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [timeSlots, setTimeSlots] = useState([]);
  // const [isLoadingTimes, setIsLoadingTimes] = useState(true);
  const [takenTimes, setTakenTimes] = useState([]);

  const nextStepHandler = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStepHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <AuthContext.Provider
      value={{
        numberOfPlayers,
        setNumberOfPlayers,
        activeDay,
        setActiveDay,
        currentDay,
        timeSlots,
        setTimeSlots,
        // isLoadingTimes,
        // setIsLoadingTimes,
        takenTimes,
        setTakenTimes,
        currentStep,
        setCurrentStep,
        nextStepHandler,
        prevStepHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
