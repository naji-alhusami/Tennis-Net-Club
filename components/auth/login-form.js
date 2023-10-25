"use client";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import classes from "./login-form.module.css";
import { FcGoogle } from "react-icons/fc";

function Login({ callbackUrl }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  async function loginHandler(event) {
    event.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div>
          <button className={classes.button}>Login</button>
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
