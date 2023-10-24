import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No User Found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could Not Log you in");
        }

        client.close();
        return { email: user.email, name: user.name };
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
