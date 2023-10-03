import React, { useState } from "react";
import { motion } from "framer-motion";

import classes from "./test-form.module.css";

function TestForm() {
  const [showSideNavbar, setShowSideNavbar] = useState(false);

  function toggleButtonHandler() {
    setShowSideNavbar(!showSideNavbar);
    console.log(showSideNavbar);
  }

  return (
    <div>
      <button onClick={toggleButtonHandler}>click me</button>
      {showSideNavbar && (
        <motion.div
          className={`${classes.sideNavbarContainer} ${
            showSideNavbar ? classes.show : ""
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          key="modal"
        >
          {/* <p>home</p>
          <p>home</p>
          <p>home</p>
          <p>home</p> */}
        </motion.div>
      )}
    </div>
  );
}

export default TestForm;
