import React, { useState, useEffect } from "react";
// import { fetchTimeSlots } from "@/components/booking/generate-times";

import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const [activeDay, setActiveDay] = useState(new Date());
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);

  // useEffect(() => {
  //   fetchTimeSlots(activeDay, setTimeSlots);
  // }, [activeDay]);

  return (
    <AuthContext.Provider
      value={{
        activeDay,
        setActiveDay,
        numberOfPlayers,
        setNumberOfPlayers,
        timeSlots,
        setTimeSlots,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
