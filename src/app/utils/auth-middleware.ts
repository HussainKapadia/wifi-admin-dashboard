import { cookies } from 'next/headers'
import { verifyJwt } from './jwt'

export async function requireAuth(req: Request) {
  const token = (await cookies()).get('token')?.value
  if (!token) return null
  const user = verifyJwt(token)
  return user || null
}
