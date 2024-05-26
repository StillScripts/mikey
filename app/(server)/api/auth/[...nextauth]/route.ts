import NextAuth from 'next-auth'

import { authOptions } from '@/app/(server)/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
