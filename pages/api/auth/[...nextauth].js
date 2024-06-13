import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { mongooseConnect } from "@lib/mongoose";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await mongooseConnect();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          const newUser = {
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          };

          if (profile.phone) {
            newUser.phone = profile.phone;
          }

          await User.create(newUser);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
