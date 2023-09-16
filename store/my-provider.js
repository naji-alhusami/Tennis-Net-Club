import React, { useState } from "react";
import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const currentDay = new Date();
  const [activeDay, setActiveDay] = useState(currentDay);

  return (
    <AuthContext.Provider value={{ activeDay, setActiveDay }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
