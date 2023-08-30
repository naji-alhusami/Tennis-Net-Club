import React from "react";

import Image from "next/image";

import MainNavigation from "@/components/layout/main-navigation";

import signup from "@/public/images/signup.jpg";
import classes from "./auth.module.css";
import Signup from "@/components/signup/signup-form";
import Login from "@/components/login/login-form";

function Auth(props) {
  const { isSignup } = props;

  return (
    <div className={classes.signup}>
      <MainNavigation />
      <div className={classes.image}>
        <Image src={signup} alt="signup" />
      </div>
      <div>{isSignup ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default Auth;
