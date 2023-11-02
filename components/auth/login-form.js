"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import classes from "./login-form.module.css";
import { FcGoogle } from "react-icons/fc";
import ButtonTest from "../ui/buttonTest";

function Login({ callbackUrl }) {
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
    console.log(response);

    if (!response.ok) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage("");
      router.replace("/");
    }
  }

  return (
    <div className={classes.loginForm}>
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
          <ButtonTest>Login</ButtonTest>
          {/* <button className={classes.button}>Login</button> */}
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
          onClick={() => signIn("google", { callbackUrl })}
        >
          <FcGoogle size={30} />
        </button>
        {/* <Link href="/auth/signup">
          <FcGoogle size={30} />
        </Link> */}
      </div>
    </div>
  );
}

export default Login;
