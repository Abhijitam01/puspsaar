import { type NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  providers: [], // Providers are added in auth.ts to avoid Edge issues with bcrypt
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPath = nextUrl.pathname.startsWith('/admin');
      
      if (isAdminPath && !nextUrl.pathname.startsWith('/admin/login')) {
        return isLoggedIn && (auth?.user as any).role === 'admin';
      }
      
      return true;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
} satisfies NextAuthConfig;
