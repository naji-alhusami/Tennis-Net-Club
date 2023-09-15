import React, { useState } from "react";
import AuthContext from "./auth-context";

const MyProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default MyProvider;
