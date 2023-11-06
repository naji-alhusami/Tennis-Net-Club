"use client";
import React, { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { submitSignupHandler } from "@/lib/signupAction";
import classes from "./signup-form.module.css";
// import Notification from "../ui/notification";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { signupWithCredentials } from "@/actions/signupActions";
import ButtonTest from "../ui/buttonTest";
import { useRouter } from "next/navigation";

function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);
  const router = useRouter();

  async function signupCredentialsHandler(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const number = formData.get("number");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password-confirmation");
    // const role = formData.get("role");

    console.log({ name, email, password, passwordConfirmation, number });

    try {
      const response = await signupWithCredentials({
        name,
        email,
        number,
        password,
        passwordConfirmation,
      });
      // console.log(response);

      if (response?.message) {
        ref.current?.reset();
        setErrorMessage("");
        router.push(`/thanks?thanks=${response?.message}`);
        // don't forget to redirect to thanks page
        // console.log(response?.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={classes.signupForm}>
      <h1>Signup</h1>
      <form action={signupCredentialsHandler} ref={ref}>
        <div>
          <input type="text" name="name" placeholder="Your Name" required />
        </div>
        <div>
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
        <div>
          <input
            type="number"
            name="number"
            placeholder="Your Number"
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

        {/* <div>
          <select name="role" className={classes.select} required>
            <option value="">Select your role</option>
            <option value="player">Player</option>
            <option value="trainer">Trainer</option>
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
          <ButtonTest>Signup</ButtonTest>
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
              signIn("google", { callbackUrl: "/auth/addWhatsApp" })
            }
          >
            <FcGoogle size={30} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
