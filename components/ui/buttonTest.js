import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import classes from "../auth/signup-form.module.css";

function ButtonTest() {
  const { pending } = useFormStatus();

  return (
    <button
      className={classes.button}
      // onClick={() => startTransition(() => signupCredentialsHandler())}
    >
      {pending ? "Signing Up..." : "Signup"}
    </button>
  );
}

export default ButtonTest;
