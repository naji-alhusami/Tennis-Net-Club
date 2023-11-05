import React from "react";
import { useFormStatus } from "react-dom";
import classes from "../auth/signup-form.module.css";

function ButtonTest(props) {
  const { pending } = useFormStatus();

  return (
    <button className={classes.button}>
      {pending ? "Loading..." : props.children}
    </button>
  );
}

export default ButtonTest;
