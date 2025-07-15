import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/app/utils/auth-middleware'
import db from '@/../database/models'
import ConnectedDevice from '@/../database/models/connectedDevice'

function isUserWithId(user: any): user is { id: number } {
  return typeof user === 'object' && user !== null && 'id' in user
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(req)
  if (!isUserWithId(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = params
  try {
    const device = await ConnectedDevice.findOne({
      where: { id, user_id: user.id }
    })
    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }
    const { device_name, ip_address, mac_address, connection_type } =
      await req.json()
    await device.update({
      device_name,
      ip_address,
      mac_address,
      connection_type
    })
    return NextResponse.json(device)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update device' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth(req)
  if (!isUserWithId(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = params
  try {
    const device = await ConnectedDevice.findOne({
      where: { id, user_id: user.id }
    })
    if (!device) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 })
    }
    await device.destroy()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete device' },
      { status: 500 }
    )
  }
}
