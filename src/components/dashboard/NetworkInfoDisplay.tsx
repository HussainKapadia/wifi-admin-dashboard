import React from 'react'
import DashboardCard from './DashboardCard'

interface NetworkInfoDisplayProps {
  info: {
    ssid: string
    security_type: string
    channel: number
    frequency: string
    ip_address: string
    subnet_mask: string
    gateway: string
    dns: string
  }
  onEdit: () => void
}

const labelStyle = { fontWeight: 500, color: '#374151', minWidth: 120 }
const valueStyle = { color: '#23272f' }

const NetworkInfoDisplay: React.FC<NetworkInfoDisplayProps> = ({
  info,
  onEdit
}) => {
  return (
    <DashboardCard title='Network Information'>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}
      >
        <button
          onClick={onEdit}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 15,
            float: 'right'
          }}
        >
          Edit
        </button>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <span style={labelStyle}>SSID:</span>{' '}
          <span style={valueStyle}>{info.ssid}</span>
        </div>
        <div>
          <span style={labelStyle}>Security Type:</span>{' '}
          <span style={valueStyle}>{info.security_type}</span>
        </div>
        <div>
          <span style={labelStyle}>Channel:</span>{' '}
          <span style={valueStyle}>{info.channel}</span>
        </div>
        <div>
          <span style={labelStyle}>Frequency:</span>{' '}
          <span style={valueStyle}>{info.frequency}</span>
        </div>
        <div>
          <span style={labelStyle}>IP Address:</span>{' '}
          <span style={valueStyle}>{info.ip_address}</span>
        </div>
        <div>
          <span style={labelStyle}>Subnet Mask:</span>{' '}
          <span style={valueStyle}>{info.subnet_mask}</span>
        </div>
        <div>
          <span style={labelStyle}>Gateway:</span>{' '}
          <span style={valueStyle}>{info.gateway}</span>
        </div>
        <div>
          <span style={labelStyle}>DNS:</span>{' '}
          <span style={valueStyle}>{info.dns}</span>
        </div>
      </div>
    </DashboardCard>
  )
}

export default NetworkInfoDisplay
