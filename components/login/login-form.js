import React from "react";

import Link from "next/link";

import classes from "../../pages/auth/auth.module.css";

function Login() {
  return (
    <div className={classes.form}>
      <h1>Login With Your Memebr Account</h1>
      <form>
        <div>
          <input type="email" placeholder="Your Email" required />
        </div>
        <div>
          <input type="password" placeholder="Your Password" required />
        </div>
        <div>
          <Link href="/" className={classes.button}>
            Login
          </Link>
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
