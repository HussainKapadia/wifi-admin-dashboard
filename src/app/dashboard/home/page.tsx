'use client'

import NetworkInfoSection from './NetworkInfoSection'
import ConnectedDevicesList from '@/components/dashboard/connected-devices/ConnectedDevicesList'

export default function DashboardHome() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        alignItems: 'center',
        minHeight: '60vh',
        padding: '32px 16px'
      }}
    >
      <NetworkInfoSection />
      <ConnectedDevicesList />
    </div>
  )
}
