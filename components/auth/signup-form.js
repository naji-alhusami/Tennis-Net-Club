import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import classes from "./signup-form.module.css";
import Notification from "../ui/notification";

async function createUser(name, email, password, passwordConfirmation, role) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirmation,
      role,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something Went Wrong!");
  }

  return data;
}

function Signup() {
  // const [selectedDate, setSelectedDate] = useState(null);
  const [requestStatus, setRequestStatus] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();
  const roleInputRef = useRef();

  useEffect(() => {
    if (requestStatus === "Success" || requestStatus === "Error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function submitHandler(event) {
    event.preventDefault();

    setRequestStatus("Pending");
    setErrorMessage(null);

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirmation =
      passwordConfirmationInputRef.current.value;
    const enteredRole = roleInputRef.current.value;

    try {
      const result = await createUser(
        enteredName,
        enteredEmail,
        enteredPassword,
        enteredPasswordConfirmation,
        enteredRole
      );
      setRequestStatus("Success");
    } catch (error) {
      setErrorMessage(error.message);
      setRequestStatus("Error");
    }
  }

  let notification;

  if (requestStatus === "Pending") {
    notification = {
      status: "Pending",
      title: "Creating Your Member...",
      message: "We Are Creating Your Member!",
    };
  }

  if (requestStatus === "Success") {
    notification = {
      status: "Success",
      title: "Success!",
      message: "Your Member Created Successfully!",
    };
  }

  if (requestStatus === "Error") {
    notification = {
      status: "Error",
      title: "Error!",
      message: errorMessage,
    };
  }

  return (
    <div className={classes.signupForm}>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div>
          <input
            ref={passwordConfirmationInputRef}
            type="password"
            placeholder="Password Confirmation"
            required
          />
        </div>

        <div>
          <select ref={roleInputRef} className={classes.select} required>
            <option value="">Select your role</option>
            <option value="player">Player</option>
            <option value="trainer">Trainer</option>
          </select>
        </div>
        <div className={classes.notMember}>
          <button className={classes.button}>Signup</button>

          <h3>Already A Member?</h3>
          <Link href="/auth/login" className={classes.button}>
            Login
          </Link>
        </div>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </form>
    </div>
  );
}

export default Signup;
