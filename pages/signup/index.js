import React from "react";
import SignupForm from "./signup-form";
import Image from "next/image";

import signup from "@/public/images/signup.jpg";
import MainNavigation from "@/components/layout/main-navigation";

import classes from "./signup.module.css";

function SignupPage() {
  return (
    <div className={classes.signup}>
      <MainNavigation />
      <div className={classes.image}>
        <Image src={signup} alt="signup" />
      </div>
      <div >
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
