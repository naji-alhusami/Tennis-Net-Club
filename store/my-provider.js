import React, { useState } from "react";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeInfo, setTimeInfo] = useState();
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        isDaySelected,
        setIsDaySelected,
        timeSlots,
        setTimeSlots,
        isLoading,
        setIsLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
