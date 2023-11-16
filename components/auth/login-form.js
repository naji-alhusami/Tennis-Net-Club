"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

import classes from "./login-form.module.css";
import { FcGoogle } from "react-icons/fc";
import SubmitButton from "../ui/submit-button";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  const router = useRouter();

  async function loginWithCredentialsHanlder(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      // callbackUrl,
    });
    if (!response.ok) {
      setErrorMessage(response.error);
    } else if (response.ok) {
      ref.current?.reset();
      setErrorMessage("");
      router.push("/");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes.loginForm}
    >
      <h1>Login</h1>
      <form action={loginWithCredentialsHanlder} ref={ref}>
        <div>
          <input name="email" type="email" placeholder="Your Email" required />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div className={classes.error}>
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
        <div>
          <SubmitButton>Login</SubmitButton>
        </div>
      </form>
      <h3>Not A Member?</h3>
      <div>
        <Link href="/auth/signup" className={classes.button}>
          Signup
        </Link>
      </div>
      <div className={classes.googleLogin}>
        <h3>Or Login with Google:</h3>
        <button
          className={classes.googleButton}
          onClick={() =>
            signIn("google", { callbackUrl: "/auth/addExtraInfo" })
          }
        >
          <FcGoogle size={30} />
        </button>
      </div>
    </motion.div>
  );
}

export default Login;
