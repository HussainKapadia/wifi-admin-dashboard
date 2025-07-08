import { NextRequest, NextResponse } from 'next/server'
import User from '@/../database/models/user'
import { comparePassword } from '../../../utils/auth'
import { signJwt } from '../../../utils/jwt'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    const token = signJwt({ id: user.id, email: user.email })

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    const { password: _, ...userData } = user.get({ plain: true })
    return new NextResponse(JSON.stringify({ user: userData }), {
      status: 200,
      headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}
