import type {NextAuthOptions} from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {AuthService} from '@/services/auth.service'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const res = await AuthService.login({
            email: credentials.email,
            password: credentials.password
          })

          return {
            access_token: res.access_token,
            refresh_token: res.refresh_token,
            email: res?.user?.email ?? null,
            expires_at: res.expires_in ? Date.now() + res.expires_in * 1000 : undefined
          } as any
        } catch (e) {
          return null
        }
      }
    })
  ],
  pages: {
    // With next-intl middleware, '/login' becomes '/{locale}/login'
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.access_token = (user as any).access_token;
        token.refresh_token = (user as any).refresh_token;
        token.email = (user as any).email;
        ;(token as any).expires_at = (user as any).expires_at
        return token
      }

      const now = Date.now()
      if ((token as any).expires_at && now < (token as any).expires_at) {
        return token
      }

      try {
        const refreshed = await AuthService.refresh((token as any).refresh_token)

        token.access_token = refreshed.access_token
        token.expires_at = Date.now() + refreshed.expires_in * 1000

        if (refreshed.refresh_token) token.refresh_token = refreshed.refresh_token


        return token
      } catch (e) {
        delete (token as any).access_token
        delete (token as any).refresh_token
        delete (token as any).expires_at
        return token
      }
    },
    async session({session, token}) {
      ;(session as any).access_token = (token as any).access_token
      ;(session as any).refresh_token = (token as any).refresh_token
      ;(session as any).expires_at = (token as any).expires_at
      ;(session as any).email = (token as any).email
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}


