"use server";

import { hashPassword } from "@/lib/auth";
import sendEmail from "@/lib/sendEmail";
import { generateToken, verifyToken } from "@/lib/token";
import User from "@/models/userModel";

const BASE_URL = process.env.NEXTAUTH_URL;

// Signup With Credentials
export async function signupWithCredentials(data) {
  const user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("Email already Exists!");
  }

  if (!data.name || data.name.trim().length > 10) {
    throw new Error("Name Should Not Be More than 10 Characters");
  }

  if (!data.email || !data.email.includes("@")) {
    throw new Error("Invalid Email");
  }

  if (!data.password || data.password.trim().length < 6) {
    throw new Error("Password Should Be More than 6 Characters");
  }
  if (data.password !== data.passwordConfirmation) {
    throw new Error("Passwords Should Be Matched");
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const token = await generateToken({ user: data });

  const newUser = new User({
    name: data.name,
    email: data.email,
    WhatsAppNumber: data.number,
    password: data.password,
    emailVerified: false,
  });

  await sendEmail({
    to: data.email,
    url: `${BASE_URL}/verify?token=${token}`,
    text: "VERIFY EMAIL",
  });

  await newUser.save();

  return {
    message:
      "Signup Success, Before You Login, Please Check Your Email To Verify Your Email.",
  };
}
