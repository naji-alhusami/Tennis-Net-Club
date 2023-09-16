import React, { useState } from "react";
import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const formattedDate = currentDay.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [activeDay, setActiveDay] = useState(currentDay);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  return (
    <AuthContext.Provider
      value={{
        activeDay,
        setActiveDay,
        numberOfPlayers,
        setNumberOfPlayers,
        selectedDate,
        setSelectedDate,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
