import React, { useState } from "react";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeInfo, setTimeInfo] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(true);
  const [takenTimes, setTakenTimes
  ] = useState([]);

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
