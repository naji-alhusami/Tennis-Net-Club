import React, { useState } from "react";

import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  function authFormHandler() {
    setIsLogin((prevState) => !prevState);
  }

  return (
    <div className={classes.form}>
      {isLogin ? (
        <h1>Become One Of Our Members</h1>
      ) : (
        <h1>Login With Your Memebr Account</h1>
      )}
      <form>
        <div>
          <input type="email" placeholder="Your Email" required />
        </div>
        <div>
          <input type="password" placeholder="Your Password" required />
        </div>
        {isLogin ? (
          <div>
            <div>
              <input
                type="password"
                placeholder="Password Confirmation"
                required
              />
            </div>
            <div>
              <input type="text" placeholder="Your Name" required />
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
          </div>
        ) : (
          ""
        )}
        {isLogin ? (
          <div>
            <Link href="/" className={classes.button}>
              Sign Up
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/" className={classes.button}>
              Login
            </Link>
          </div>
        )}
      </form>
      {isLogin ? <h3>Already A Member?</h3> : <h3>Not A Member?</h3>}

      <div>
        <button onClick={authFormHandler} className={classes.button}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
