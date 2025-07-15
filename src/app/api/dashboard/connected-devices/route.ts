import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/app/utils/auth-middleware'
import ConnectedDevice from '@/../database/models/connectedDevice'
import db from '@/../database/models'

function isUserWithId(user: any): user is { id: number } {
  return typeof user === 'object' && user !== null && 'id' in user
}

export async function GET(req: NextRequest) {
  const user = await requireAuth(req)
  if (!isUserWithId(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log(user.id)
  try {
    const devices = await ConnectedDevice.findAll({
      where: { user_id: user.id },

      order: [['createdAt', 'DESC']]
    })
    return NextResponse.json(devices)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong'

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch devices',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(req)
  if (!isUserWithId(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { device_name, ip_address, mac_address, connection_type } =
      await req.json()
    const newDevice = await ConnectedDevice.create({
      device_name,
      ip_address,
      mac_address,
      connection_type,
      user_id: user.id
    })
    return NextResponse.json(newDevice, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create device' },
      { status: 500 }
    )
  }
}
