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
    const { name, email, password, passwordConfirmation, number, level } = data;
    if (password !== passwordConfirmation) {
      return {
        error: "Password Should Be More than 6 Characters",
      };
    }

    return {
      message:
        "Signup Success, Before You Login, Please Check Your Email To Verify Your Email.",
    };
  } catch (error) {
    return NextResponse.json(
      { error: "Something wen wrong!" },
      { status: 500 }
    );
  }
}
