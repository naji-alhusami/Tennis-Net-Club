// "use client";
"use server";
import React from "react";

import Image from "next/legacy/image";

import Signup from "@/components/auth/signup-form";
import Login from "@/components/auth/login-form";
import { getServerSession } from "next-auth";
import signup from "@/public/images/signup.jpg";
import classes from "@/components/auth/signup-form.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function AuthType({ params }) {
  const session = await getServerSession(authOptions);
  console.log({ session });
  // console.log({ props });

  return (
    <div className={classes.signup}>
      <div className={classes.image}>
        <Image
          src={signup}
          alt="signup"
          // height={500}
          // width={500}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div>{params.authType === "signup" ? <Signup /> : <Login />}</div>
    </div>
  );
}

export default AuthType;
