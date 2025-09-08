import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { sendmail } from './email'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification:{
    sendOnSignup: true,
    autoSignAfterVerification: true,
    async sendVerificationEmail({ user, url}) {
      await sendmail({
        to: user.email,
        subject: 'Verify your email',
        text: `Click here to verify your email: ${url}`,
      })
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      }
    }
  },
  trustedOrigins: ['https://fluffy-memory-v7q5rxqj7vvcxq9.github.dev'],
})

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;