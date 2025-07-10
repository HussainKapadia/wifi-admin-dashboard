'use client'

import NetworkInfoSection from './NetworkInfoSection'

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
      {/* Add more dashboard sections/components here in the future */}
    </div>
  )
}
