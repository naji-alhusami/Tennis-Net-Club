import React from "react";

import classes from "./button.module.css";

function Button(props) {
  return <div className={classes.button}>{props.children}</div>;
}

export default Button;
