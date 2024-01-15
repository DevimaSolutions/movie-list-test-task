import Credentials from 'next-auth/providers/credentials';

import { envUtil } from '..';

import type { AuthOptions, DefaultUser } from 'next-auth';

const env = envUtil.getEnv();

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${env.backendUrl}/authorization/sign-in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
        });
        if (!res.ok) {
          return null;
        }
        return res.json();
      },
    }),
    Credentials({
      id: 'sign-up',
      name: 'Sign in after successful sign up',
      credentials: {
        token: {},
      },
      // Sign in user when email is confirmed using OTP token
      async authorize(credentials) {
        const res = await fetch(`${env.backendUrl}/authorization/sign-up`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
        });
        if (!res.ok) {
          return null;
        }
        return res.json();
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      // Get session data
      const res = await fetch(`${env.backendUrl}/authorization/session/${token.sub}`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
      });
      if (!res.ok) {
        return session;
      }

      try {
        const user = (await res.json()) as DefaultUser;
        return { ...session, user };
      } catch (e) {
        // return original session on parsing error
        console.error(e);
      }
      return session;
    },
    signIn() {
      return true;
    },
  },
  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
  cookies: {
    sessionToken: {
      name: 'session-token',
      options: {
        path: '/',
      },
    },
    callbackUrl: {
      name: 'callback-url',
      options: {
        path: '/',
      },
    },
    csrfToken: {
      name: 'csrf-token',
      options: {
        path: '/',
      },
    },
  },
};
