import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      console.log("Backend URL:", process.env.BACKEND_URL);

  try {
    console.log("OAuth user:", user);

    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/oauth`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
        }),
      }
    );

    console.log("Backend status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log("Backend error response:", text);
      return false;
    }

    const data = await response.json();

    user.backendToken = data.token;
    user.role = data.role;

    return true;

  } catch (error) {
    console.error("OAuth signIn error:", error);
    return false;
  }
},
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken;
      session.role = token.role;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
