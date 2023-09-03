import React from "react";

import Image from "next/legacy/image";
import { useRouter } from "next/router";

import MainNavigation from "@/components/layout/main-navigation";
import Signup from "@/components/auth/signup-form";
import Login from "@/components/auth/login-form";

import signup from "@/public/images/signup.jpg";
import classes from "../../components/auth/auth-form.module.css";

function AuthType() {
  const router = useRouter();
  const authId = router.query.authType;

  return (
    <div className={classes.signup}>
      {/* <MainNavigation /> */}
      <div className={classes.image}>
        <Image src={signup} alt="signup" />
      </div>
      <div>{authId === "signup" ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default AuthType;
