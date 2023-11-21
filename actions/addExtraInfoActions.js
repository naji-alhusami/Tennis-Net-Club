// "use server";
// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import User from "@/models/userModel";

// export async function AddExtraInfoActions(data) {
//   const { number, level } = data;
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     throw new Error("Unauthorization");
//   }

//   const user = await User.findByIdAndUpdate(
//     session?.user?._id,
//     {
//       $set: { WhatsAppNumber: number, level: level }, // $set to update the "whatsAppNumber" field
//     },
//     { new: true }
//   ).select("-password");

//   if (!user) {
//     throw new Error("Email already Exists!");
//   }

//   return { message: "Add Extra Information Successfully" };
// }
