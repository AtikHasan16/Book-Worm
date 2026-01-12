import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email",

      //  Form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        // my own login logic
        const { email, password } = credentials;

        const user = await userCollection.findOne({
          email: email,
          password: password,
        });
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
});
export { handler as GET, handler as POST };
