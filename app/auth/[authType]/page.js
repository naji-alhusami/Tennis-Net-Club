"use client";
import React from "react";

import Image from "next/legacy/image";

import Signup from "@/components/auth/signup-form";
import Login from "@/components/auth/login-form";

import signup from "@/public/images/signup.jpg";
import classes from "@/components/auth/signup-form.module.css";

function AuthType({ params }) {
  return (
    <div className={classes.signup}>
      <div className={classes.image}>
        <Image src={signup} alt="signup" priority={true} />
      </div>
      <div>{params.authType === "signup" ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default AuthType;
