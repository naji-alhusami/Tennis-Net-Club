import React from "react";
import { useFormStatus } from "react-dom";
import classes from "./submit-button.module.css";

function SubmitButton(props) {
  const { pending } = useFormStatus();

  return (
    <button className={classes.button}>
      {pending ? "Loading..." : props.children}
    </button>
  );
}

export default SubmitButton;
