import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      // name:"credentials",
      // credentials
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        console.log(user);

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
});
