"use server";
import User from "@/models/userModel";
import sendEmail from "@/lib/sendEmail";
import { hashPassword } from "@/lib/auth";
import { generateToken } from "@/lib/token";
import { NextResponse } from "next/server";

// const baseUrl = `https://${process.env.VERCEL_URL}`;
// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? `https://${process.env.VERCEL_URL}`
//     : process.env.NEXTAUTH_URL;
const BASE_URL = process.env.NEXTAUTH_URL;
console.log("baseURL in signupAction:", BASE_URL);

// Signup With Credentials
export async function signupWithCredentials(data) {
  try {
    // const user = await User.findOne({ email: data.email });
    // if (user) {
    //   return {
    //     error: "Email already Exists!",
    //   };
    // }

    if (!data.name || data.name.trim().length > 10) {
      return {
        error: "Name Should Not Be More than 10 Characters",
      };
    }

    if (!data.password || data.password.trim().length < 6) {
      return {
        error: "Password Should Be More than 6 Characters",
      };
    }

    if (data.password !== data.passwordConfirmation) {
      return {
        error: "Password Should Be More than 6 Characters",
      };
    }

    // if (data.password) {
    //   data.password = await hashPassword(data.password);
    // }

    // Create Token for Email Verification:
    // const token = generateToken({ user: data });

    // const newUser = new User({
    //   name: data.name,
    //   email: data.email,
    //   WhatsAppNumber: data.number,
    //   password: data.password,
    //   level: data.level,
    //   emailVerified: false,
    // });

    // await sendEmail({
    //   to: data.email,
    //   url: `${BASE_URL}/verify?token=${token}`,
    //   text: "VERIFY EMAIL",
    // });

    // await newUser.save();

    // return {
    //   message:
    //     "Signup Success, Before You Login, Please Check Your Email To Verify Your Email.",
    // };
  } catch (error) {
    return NextResponse.json(
      { error: "Something wen wrong!" },
      { status: 500 }
    );
  }
}
