import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
// import { NextApiHandler } from 'next';
export const authOptions = {
    session: {
      strategy: 'jwt' as 'jwt',
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const client = await clientPromise;
          const db = client.db();

          // Find user by email
          const user = await db.collection('users').findOne({ email: credentials?.email });

          if (!user) {
            throw new Error('No user found with the provided email');
          }

          // Check if the password is correct
          const isValid = await compare(credentials!.password, user.password);

          if (!isValid) {
            throw new Error('Password is incorrect');
          }

          return { id: user._id.toString(), email: user.email };
        },
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        session.user.id = token.sub;
        return session;
    },
},
};
