import React, { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "../../pages/auth/auth.module.css";

function Signup() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className={classes.form}>
      <h1>Become One Of Our Members</h1>
      <form>
        <div>
          <input type="text" placeholder="Your Name" required />
        </div>
        <div>
          <input type="password" placeholder="Your Password" required />
        </div>
        <div>
          <input type="password" placeholder="Password Confirmation" required />
        </div>
        <div>
          <input type="email" placeholder="Your Email" required />
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
        </div>
        <div>
          <Link href="/" className={classes.button}>
            Sign Up
          </Link>
        </div>
      </form>
      <h1>Already A Member?</h1>
      <div>
        <Link href="/" className={classes.button}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
