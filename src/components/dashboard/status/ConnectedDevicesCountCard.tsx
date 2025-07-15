import React from 'react'
import Card from '@/components/Card'

interface ConnectedDevicesCountCardProps {
  deviceCount: number
  notLoggedIn?: boolean
}

const ConnectedDevicesCountCard: React.FC<ConnectedDevicesCountCardProps> = ({
  deviceCount,
  notLoggedIn = false
}) => {
  const displayCount = notLoggedIn ? 0 : deviceCount

  return (
    <Card>
      <div style={{ color: '#6b7280', fontSize: 18, marginBottom: 8 }}>
        Connected Devices
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16
        }}
      >
        <span style={{ fontSize: 36, color: '#23272f' }}>
          {/* Monitor/Desktop SVG icon */}
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#23272f'
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
            <line x1='8' y1='21' x2='16' y2='21' />
            <line x1='12' y1='17' x2='12' y2='21' />
          </svg>
        </span>
        <span style={{ fontSize: 32, fontWeight: 600, color: '#23272f' }}>
          {displayCount}
        </span>
      </div>
      <div style={{ color: '#6b7280', fontSize: 14 }}>Active connections</div>
    </Card>
  )
}

export default ConnectedDevicesCountCard
