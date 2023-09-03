import React, { useState, useRef } from "react";

import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "./signup-form.module.css";

async function createUser(
  name,
  email,
  password,
  passwordConfirmation,
  birthDate
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirmation,
      birthDate,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Something Went Wrong!");
  }

  return data;
}

function Signup() {
  const [selectedDate, setSelectedDate] = useState(null);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();
  const birthDateInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirmation =
      passwordConfirmationInputRef.current.value;
    const enteredBirthDate = birthDateInputRef.current.value;

    // validation
    try {
      const result = await createUser(
        enteredName,
        enteredEmail,
        enteredPassword,
        enteredPasswordConfirmation,
        enteredBirthDate
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
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
          {/* <DatePicker
            ref={birthDateInputRef}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select your birthday"
            required
          /> */}
          <select className={classes.select} required>
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
      </form>
    </div>
  );
}

export default Signup;
