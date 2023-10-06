import React from "react";

import classes from "./numbers.module.css";

function Numbers() {
  return (
    <div className={classes.container}>
      <div className={classes.numbers}>
        <div className={classes.number}>
          <h1>20</h1>
          <p>Courts</p>
        </div>
        <div className={classes.number}>
          <h1>30</h1>
          <p>Couches</p>
        </div>
        <div className={classes.number}>
          <h1>90</h1>
          <p>Players</p>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
