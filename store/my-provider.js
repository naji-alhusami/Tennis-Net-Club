"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthContext from "./auth-context";

const MyProvider = (props) => {
  // const router = useParams();
  // const date = router.get("date");
  // const results = JSON.parse(date);
  // console.log(router.getAll("booking"));
  // console.log(results);
  const searchParams = useSearchParams();
  const datePath = searchParams.has("date");
  const timePath = searchParams.has("time");
  console.log(datePath);
  const initialStep = timePath && datePath ? 3 : datePath && !timePath ? 2 : 1;

  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeInfo, setTimeInfo] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(true);
  const [takenTimes, setTakenTimes] = useState([]);
  const [nextButton, setNextButton] = useState(false);
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
  console.log(currentStep);
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
