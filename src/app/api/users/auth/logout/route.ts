import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST() {
  const cookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0 // cookie delete ke liye
  })

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Set-Cookie': cookie
    }
  })
}
