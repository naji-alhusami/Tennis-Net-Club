import { verifyPassword } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";
import connectToDatabase from "@/lib/db";
import { verifyToken } from "@/lib/token";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

connectToDatabase();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });
        console.log("inide auth", user);
        if (!user) {
          throw new Error("No User With This Email Founded");
        }

        const verifyPasswords = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!verifyPasswords) {
          throw new Error("Your Password Is Incorrect");
        }

        if (!user.emailVerified) {
          throw new Error("Email Is Not Verified");
        }

        return {
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: '/auth/[authType]',
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // signInWithOAuth

      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      // getUserByEmail
      const user = await getUserByEmail({ email: token.email });
      token.user = user;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      // console.log({ session });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// -----------------------

async function signInWithOAuth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });

  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    provider: account.provider,
    emailVerified: false,
  });

  await newUser.save();
  return true;
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select("-password"); // we exclude password here using -password

  if (!user) throw new Error("Email does not exist!");

  return { ...user._doc, _id: user._id.toString() };
}

// -----------------------------

// verification of email.
export async function verifyWithCredentials(token) {
  const { user } = verifyToken(token);

  try {
    // Find the user by their email
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      // Update the emailVerified property to true
      existingUser.emailVerified = true;

      // Save the updated user
      await existingUser.save();

      // return a success messag
      return {
        message: "Your email is verified.",
      };
    } else {
      // Handle the case when the user is not found
      return {
        message: "User not found.",
      };
    }
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    return {
      error: "An error occurred while verifying the email.",
    };
  }
}

// async function singInWithCredentials(email, password) {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("No User Found");
//   }

//   const verifyPasswords = await verifyPassword(password, user.password);

//   if (!verifyPasswords) {
//     throw new Error("Could Not Log you in");
//   }

//   return { ...user._doc, _id: user._id.toString() };
// }
