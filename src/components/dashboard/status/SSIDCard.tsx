import React from 'react'
import Card from '@/components/Card'

interface SSIDCardProps {
  ssid?: string
  isFirstTime?: boolean
  notLoggedIn?: boolean
}

const SSIDCard: React.FC<SSIDCardProps> = ({
  ssid,
  isFirstTime = false,
  notLoggedIn = false
}) => {
  const displaySSID = ssid && !isFirstTime && !notLoggedIn ? ssid : 'SSID'

  return (
    <Card>
      <div
        style={{
          color: '#6b7280',
          fontSize: 18,
          marginBottom: 8,
          paddingRight: 16
        }}
      >
        SSID
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16
        }}
      >
        <span style={{ fontSize: 36, color: '#2563eb' }}>
          {/* WiFi SVG icon */}
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#2563eb'
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 13a10 10 0 0 1 14 0' />
            <path d='M8.5 16.5a5 5 0 0 1 7 0' />
            <path d='M12 20h.01' />
          </svg>
        </span>
        <span style={{ fontSize: 32, fontWeight: 600, color: '#23272f' }}>
          {displaySSID}
        </span>
      </div>
      <div style={{ color: '#6b7280', fontSize: 14 }}>Network Name</div>
    </Card>
  )
}

export default SSIDCard
