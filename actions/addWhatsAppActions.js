"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";

export async function AddWhatsAppActions(data) {
  const { number } = data;
  console.log(number);
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorization");
  }
  console.log(session);

  const userId = session.user._id; 
  console.log

  const user = await User.findByIdAndUpdate(
    session?.user?._id,
    {
      $set: { WhatsAppNumber: number }, // $set to update the "whatsAppNumber" field
    },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new Error("Email already Exists!");
  }

  return { message: "Add WhatsApp Successfully" };
}
