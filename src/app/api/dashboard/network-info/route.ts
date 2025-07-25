import { NextRequest, NextResponse } from 'next/server'
import NetworkInfo from '@/../database/models/networkInfo'
import { verifyJwt } from '@/app/utils/jwt'
import User from '@/../database/models/user'

// user id JWT se laane ke liye helper function
async function getUserIdFromRequest(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  if (!token) return null
  const payload = verifyJwt(token)
  if (!payload) return null
  if (typeof payload === 'string') return null
  return (payload as any).id || null
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const info = await NetworkInfo.findOne({ where: { user_id: userId } })
    if (!info) {
      return NextResponse.json({ networkInfo: null })
    }

    return NextResponse.json({ networkInfo: info })
  } catch (error: any) {
    console.error('Error fetching network info:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch network info',
        details: error.message || String(error)
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = await req.json()
  // Upsert: if exists, update; else, create
  let info = await NetworkInfo.findOne({ where: { user_id: userId } })
  if (info) {
    await info.update({ ...data })
  } else {
    info = await NetworkInfo.create({ ...data, user_id: userId })
  }
  return NextResponse.json({ networkInfo: info })
}

// PUT: Edit network info fields for the logged-in user
export async function PUT(req: NextRequest) {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = await req.json()
  let info = await NetworkInfo.findOne({ where: { user_id: userId } })
  if (!info) {
    return NextResponse.json(
      { error: 'No network info found' },
      { status: 404 }
    )
  }
  await info.update({ ...data })
  return NextResponse.json({ networkInfo: info })
}
