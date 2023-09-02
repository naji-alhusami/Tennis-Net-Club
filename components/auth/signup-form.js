import React, {
  // useState,
  useRef,
} from "react";

import Link from "next/link";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import classes from "./auth-form.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  const data = await response.json();
  console.log("begining of createUser fun");

  console.log(data);

  if (!response.ok) {
    throw new Error(data.message || "Something Went Wrong!");
  }

  return data;
}

function Signup() {
  // const [selectedDate, setSelectedDate] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // validation
    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={classes.form}>
      <h1>Become One Of Our Members</h1>
      <form onSubmit={submitHandler}>
        {/* <div>
          <input type="text" id="name" placeholder="Your Name" required />
        </div> */}
        <div>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            placeholder="Your Password"
            required
          />
        </div>
        {/* <div>
          <input
            type="password"
            id="passwordConfirmation"
            placeholder="Password Confirmation"
            required
          />
        </div>

        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select your birthday"
            required
          />
          <select value="select" className={classes.select} required>
            <option value="">Select your role</option>
            <option value="player">Player</option>
            <option value="trainer">Trainer</option>
          </select>
        </div> */}
        <div>
          <button className={classes.button}>Sign Up</button>
        </div>
      </form>
      <h3>Already A Member?</h3>
      <div>
        <Link href="/auth/login" className={classes.button}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
