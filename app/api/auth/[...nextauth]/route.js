// import NextAuth from "next-auth/next";
// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// import User from "@/models/userModel";
// import connectToDatabase from "@/app/db";
// import { verifyPassword } from "@/lib/auth";
// import { verifyToken } from "@/lib/token";

// connectToDatabase();

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     Credentials({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const user = await User.findOne({ email: credentials.email });

//         const verifyPasswords = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!user || !verifyPasswords) {
//           throw new Error("Your Email Or Password Is Incorrect");
//         }

//         if (!user.emailVerified) {
//           throw new Error("Email Is Not Verified");
//         }

//         return {
//           email: user.email,
//           name: user.name,
//           emailVerified: user.emailVerified,
//         };
//       },
//     }),
//   ],
//   session: {
//     jwt: true,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   // pages: {
//   //   signIn: '/auth/[authType]',
//   // },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       // signInWithOAuth

//       if (account.type === "oauth") {
//         return await signInWithOAuth({ account, profile });
//       }
//       return true;
//     },
//     async jwt({ token, trigger, session }) {
//       // getUserByEmail
//       const user = await getUserByEmail({ email: token.email });
//       token.user = user;
//       return token;
//     },
//     async session({ token, session }) {
//       session.user = token.user;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// // signin with OAuth (Google)
// async function signInWithOAuth({ account, profile }) {
//   const user = await User.findOne({ email: profile.email });

//   if (user) return true;

//   const newUser = new User({
//     name: profile.name,
//     email: profile.email,
//     provider: account.provider,
//     emailVerified: false,
//   });

//   await newUser.save();
//   return true;
// }

// // get user by email
// async function getUserByEmail({ email }) {
//   const user = await User.findOne({ email }).select("-password"); // we exclude password here using -password

//   if (!user) throw new Error("Email does not exist!");

//   return { ...user._doc, _id: user._id.toString() };
// }

// // verification of email.
// export async function verifyWithCredentials(token) {
//   const { user } = verifyToken(token);

//   try {
//     // Find the user by their email
//     const existingUser = await User.findOne({ email: user.email });

//     if (existingUser) {
//       // Update the emailVerified property to true
//       existingUser.emailVerified = true;

//       // Save the updated user
//       await existingUser.save();

//       // return a success messag
//       return {
//         message: "Your email is verified.",
//       };
//     } else {
//       // Handle the case when the user is not found
//       return {
//         message: "User not found.",
//       };
//     }
//   } catch (error) {
//     // Handle any errors that may occur during the process
//     console.error(error);
//     return {
//       error: "An error occurred while verifying the email.",
//     };
//   }
// }
