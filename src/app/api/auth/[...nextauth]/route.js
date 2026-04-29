import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      console.log("🔥 Ejecutando signIn callback");

      await connectDB();

      const existing = await User.findOne({ email: user.email });

      if (!existing) {
        console.log("✅ Creando usuario en DB");
        await User.create(user);
      } else {
        console.log("ℹ️ Usuario ya existe");
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };