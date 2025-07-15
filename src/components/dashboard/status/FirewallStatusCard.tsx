import React from 'react'
import Card from '@/components/Card'
import ToggleSwitch from '@/components/ToggleSwitch'

interface FirewallStatusCardProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

const FirewallStatusCard: React.FC<FirewallStatusCardProps> = ({
  enabled,
  onToggle
}) => {
  return (
    <Card>
      <div style={{ color: '#6b7280', fontSize: 18, marginBottom: 8 }}>
        Firewall
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16
        }}
      >
        <span style={{ fontSize: 36, color: enabled ? '#22c55e' : '#ef4444' }}>
          {/* Shield SVG icon */}
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            stroke={enabled ? '#22c55e' : '#ef4444'}
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z' />
            <path d='M9 12l2 2 4-4' />
          </svg>
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: enabled ? '#22c55e' : '#ef4444'
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

export default FirewallStatusCard
