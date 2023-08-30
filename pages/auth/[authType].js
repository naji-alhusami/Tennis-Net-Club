import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import MainNavigation from "@/components/layout/main-navigation";

import signup from "@/public/images/signup.jpg";
import classes from "./auth.module.css";
import Signup from "@/components/signup/signup-form";
import Login from "@/components/login/login-form";

function AuthType() {
  const router = useRouter();
  const authId = router.query.authType;

  return (
    <div className={classes.signup}>
      <MainNavigation />
      <div className={classes.image}>
        <Image src={signup} alt="signup" />
      </div>
      <div>{authId === "signup" ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default AuthType;
