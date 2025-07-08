import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  const cookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0)
  })
  return new NextResponse(null, {
    status: 200,
    headers: { 'Set-Cookie': cookie }
  })
}
