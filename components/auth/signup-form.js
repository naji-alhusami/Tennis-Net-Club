"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import { signupWithCredentials } from "@/actions/SignupAction";
import { FormatPhoneNumber } from "@/lib/FormatPhoneNumber";
import SubmitButton from "../ui/submit-button";
import classes from "./signup-form.module.css";

function Signup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);
  const router = useRouter();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedNumber = FormatPhoneNumber(inputValue);
    setPhoneNumber(formattedNumber);
  };

  async function signupCredentialsHandler(formData) {
    alert(formData.get("name"));
    // const name = formData.get("name");
    // const email = formData.get("email");
    // const number = formData.get("number");
    // const password = formData.get("password");
    // const passwordConfirmation = formData.get("password-confirmation");
    // const level = formData.get("level");

    // try {
    //   const response = await signupWithCredentials({
    //     name,
    //     email,
    //     number,
    //     password,
    //     passwordConfirmation,
    //     level,
    //   });

    //   console.log(response);

    //   if (response?.message) {
    //     ref.current?.reset();
    //     setErrorMessage("");
    //     router.push(`/thanks?thanks=${response?.message}`);
    //   }
    // } catch (error) {
    //   setErrorMessage(error.message);
    // }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes.signupForm}
    >
      <h1>Signup</h1>
      <form action={signupCredentialsHandler} ref={ref}>
        <div>
          <input type="text" name="name" placeholder="Your Name" required />
        </div>
        {/* <div>
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
        <div>
          <input
            type="tel"
            name="number"
            placeholder="0 (555) 555 55 55 - Start With Zero"
            value={phoneNumber}
            onChange={handleInputChange}
            maxLength="17"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password-confirmation"
            placeholder="Password Confirmation"
            required
          />
        </div>
        <div>
          <select name="level" className={classes.select} required>
            <option value="">Select Your Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
          </select>
        </div> */}
        <div>
          {errorMessage ? (
            <p className={classes.error}>{errorMessage}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
        <div className={classes.notMember}>
          <SubmitButton>Signup</SubmitButton>
          <h3>Already A Member?</h3>
          <Link href="/auth/signin" className={classes.button}>
            Login
          </Link>
        </div>
        <div className={classes.notMember}>
          <h3>Or Signup With Google:</h3>
          <button
            className={classes.googleButton}
            onClick={() =>
              signIn("google", { callbackUrl: "/auth/addExtraInfo" })
            }
          >
            <FcGoogle size={30} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Signup;
