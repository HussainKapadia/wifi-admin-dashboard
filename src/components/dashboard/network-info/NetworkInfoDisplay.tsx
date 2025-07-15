import React from 'react'
import Card from '@/components/Card'

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  minWidth: 400,
  marginTop: 8
}
const thStyle = {
  textAlign: 'left' as const,
  padding: '12px 16px',
  fontWeight: 600,
  color: '#23272f',
  background: '#f3f4f6',
  border: '1px solid #e5e7eb',
  width: '25%'
}
const tdStyle = {
  padding: '12px 16px',
  color: '#374151',
  border: '1px solid #e5e7eb',
  fontWeight: 500,
  width: '25%',
  background: '#fff'
}

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
    <Card title={undefined}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}
      >
        <h2
          style={{ margin: 0, fontSize: 22, color: '#23272f', fontWeight: 700 }}
        >
          Network Information
        </h2>
        <button
          onClick={onEdit}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
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
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={thStyle}>SSID</th>
                <td style={tdStyle}>{networkInfo?.ssid || ''}</td>
                <th style={thStyle}>Security Type</th>
                <td style={tdStyle}>{networkInfo?.security_type || ''}</td>
              </tr>
              <tr>
                <th style={thStyle}>Channel</th>
                <td style={tdStyle}>{networkInfo?.channel || ''}</td>
                <th style={thStyle}>Frequency</th>
                <td style={tdStyle}>{networkInfo?.frequency || ''}</td>
              </tr>
              <tr>
                <th style={thStyle}>IP Address</th>
                <td style={tdStyle}>{networkInfo?.ip_address || ''}</td>
                <th style={thStyle}>Subnet Mask</th>
                <td style={tdStyle}>{networkInfo?.subnet_mask || ''}</td>
              </tr>
              <tr>
                <th style={thStyle}>Gateway</th>
                <td style={tdStyle}>{networkInfo?.gateway || ''}</td>
                <th style={thStyle}>DNS</th>
                <td style={tdStyle}>{networkInfo?.dns || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export default NetworkInfoDisplay
