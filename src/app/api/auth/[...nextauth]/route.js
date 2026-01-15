import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "https://bw-server-seven.vercel.app/api/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const user = res.data.existingUser;

          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Login authorization error:", error.response?.data);
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.picture = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
