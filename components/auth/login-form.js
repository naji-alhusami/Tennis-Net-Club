import React, { useRef } from "react";

import Link from "next/link";
import { signIn } from "next-auth/react";

import classes from "./login-form.module.css";

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function loginHandler(event) {
    event.preventDefault();

    console.log("naji");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    console.log(result);
  }

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
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
          <button className={classes.button}>
            Login
          </button>
        </div>
      </form>
      <h3>Not A Member?</h3>
      <div>
        <Link href="/auth/signup" className={classes.button}>
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
