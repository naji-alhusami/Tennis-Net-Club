import React, { useState } from "react";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeInfo, setTimeInfo] = useState();
  const [isDaySelected, setIsDaySelected] = useState(false);

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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
