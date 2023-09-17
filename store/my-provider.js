import React, { useState } from "react";
import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState(currentDay);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        activeDay,
        setActiveDay,
        numberOfPlayers,
        setNumberOfPlayers,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
