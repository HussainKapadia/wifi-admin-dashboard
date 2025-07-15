import React from 'react'
import Card from '@/components/Card'

const labelStyle = { fontWeight: 500, color: '#374151', minWidth: 120 }
const valueStyle = { color: '#23272f' }

interface NetworkInfoDisplayProps {
  networkInfo: any
  error: string | null
  isFirstTime: boolean
  onEdit: () => void
}

const NetworkInfoDisplay: React.FC<NetworkInfoDisplayProps> = ({
  networkInfo,
  error,
  isFirstTime,
  onEdit
}) => {
  return (
    <Card title='Network Information'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 8
        }}
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
      {error && !isFirstTime && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}
      {isFirstTime ? (
        <div style={{ color: '#374151', marginBottom: 8 }}>
          Please fill out your network information below.
        </div>
      ) : (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <div>
            <span style={labelStyle}>SSID:</span>{' '}
            <span style={valueStyle}>{networkInfo?.ssid || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>Security Type:</span>{' '}
            <span style={valueStyle}>{networkInfo?.security_type || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>Channel:</span>{' '}
            <span style={valueStyle}>{networkInfo?.channel || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>Frequency:</span>{' '}
            <span style={valueStyle}>{networkInfo?.frequency || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>IP Address:</span>{' '}
            <span style={valueStyle}>{networkInfo?.ip_address || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>Subnet Mask:</span>{' '}
            <span style={valueStyle}>{networkInfo?.subnet_mask || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>Gateway:</span>{' '}
            <span style={valueStyle}>{networkInfo?.gateway || ''}</span>
          </div>
          <div>
            <span style={labelStyle}>DNS:</span>{' '}
            <span style={valueStyle}>{networkInfo?.dns || ''}</span>
          </div>
        </div>
      )}
    </Card>
  )
}

export default NetworkInfoDisplay
