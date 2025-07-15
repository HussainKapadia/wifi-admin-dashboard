import React from 'react'
import Card from '@/components/Card'
import ToggleSwitch from '@/components/ToggleSwitch'

interface WifiStatusCardProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

const WifiStatusCard: React.FC<WifiStatusCardProps> = ({
  enabled,
  onToggle
}) => {
  return (
    <Card>
      <div style={{ color: '#6b7280', fontSize: 18, marginBottom: 8 }}>
        WiFi Status
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16
        }}
      >
        <span style={{ fontSize: 36, color: enabled ? '#22c55e' : '#9ca3af' }}>
          {/* WiFi SVG icon */}
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke={enabled ? '#22c55e' : '#9ca3af'}
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 13a10 10 0 0 1 14 0' />
            <path d='M8.5 16.5a5 5 0 0 1 7 0' />
            <path d='M12 20h.01' />
          </svg>
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: enabled ? '#22c55e' : '#9ca3af'
          }}
        >
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
      <ToggleSwitch
        checked={enabled}
        onChange={onToggle}
        label={enabled ? 'On' : 'Off'}
      />
    </Card>
  )
}

export default WifiStatusCard
