import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { login } from '@/app/lib/api';
import { User } from '@/app/lib/definitions';

function getPayloadFromToken(access_token: string): User {
  const encodedPayload = access_token.split('.')[1];
  const decodedToken = JSON.parse(atob(encodedPayload));
  const user = {
    email: decodedToken.sub,
    verified: decodedToken.verified,
    access_token: access_token,
  } as User;
  return user;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z
              .string()
              .min(parseInt(process.env.PASSWORD_MIN_LENGTH || '1')),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const token = await login(email, password);

          const user = getPayloadFromToken(token.access_token);
          return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.access_token = user.access_token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.acess_token = token.access_token as string;
      return session;
    },
  },
});
