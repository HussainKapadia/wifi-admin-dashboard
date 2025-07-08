import { NextRequest, NextResponse } from 'next/server'
import User from '@/../database/models/user'
import { hashPassword } from '../../../utils/auth'

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, password } = await req.json()
    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use.' },
        { status: 409 }
      )
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    })

    const { password: _, ...userData } = user.get({ plain: true })
    return NextResponse.json({ user: userData }, { status: 201 })
  } catch (error) {
    console.error('Error during user signup:', error)

    const isDev = process.env.NODE_ENV !== 'production'
    return NextResponse.json(
      { error: 'Signup failed.', details: isDev ? String(error) : undefined },
      { status: 500 }
    )
  }
}
