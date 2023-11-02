"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import classes from "./login-form.module.css";
import { FcGoogle } from "react-icons/fc";
import ButtonTest from "../ui/buttonTest";

function Login({ callbackUrl }) {
  console.log(callbackUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  // const router = useRouter();

  // async function loginHandler(event) {
  //   event.preventDefault();

  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email: email,
  //       password: password,
  //     });

  //     router.replace("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function loginWithCredentialsHanlder(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    // try {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      // callbackUrl,
    });
    // console.log(response);
    // if (response?.message) {
    //   ref.current?.reset();
    //   setErrorMessage("");
    //   console.log(response?.message);
    // }

    // router.replace("/");
    // } catch (error) {
    // console.log(error.message);
    // setErrorMessage(error.message);
    // }
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
        <div>
          {errorMessage ? (
            <p className={classes.error}>{errorMessage}</p>
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
