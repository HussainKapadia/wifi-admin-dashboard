import React, { useEffect, useState } from 'react'
import ConnectedDeviceForm from './ConnectedDeviceForm'

export interface ConnectedDevice {
  id: number
  device_name: string
  ip_address: string
  mac_address: string
  connection_type: 'Wireless' | 'Wired'
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  minWidth: 800,
  marginTop: 8
}
const thStyle = {
  textAlign: 'left' as const,
  padding: '12px 16px',
  fontWeight: 600,
  color: '#23272f',
  background: '#f3f4f6',
  border: '1px solid #e5e7eb',
  width: '20%'
}
const tdStyle = {
  padding: '12px 16px',
  color: '#374151',
  border: '1px solid #e5e7eb',
  fontWeight: 500,
  width: '20%',
  background: '#fff'
}

const ConnectedDevicesList: React.FC = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingDevice, setEditingDevice] = useState<ConnectedDevice | null>(
    null
  )
  const [showForm, setShowForm] = useState(false)

  const fetchDevices = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/connected-devices')
      if (!res.ok) throw new Error('Failed to fetch devices')
      const data = await res.json()
      setDevices(data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this device?')) return
    try {
      const res = await fetch(`/api/dashboard/connected-devices/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to delete device')
      setDevices(devices.filter(d => d.id !== id))
    } catch (err: any) {
      alert(err.message || 'Unknown error')
    }
  }

  const handleEdit = (device: ConnectedDevice) => {
    setEditingDevice(device)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingDevice(null)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingDevice(null)
    fetchDevices()
  }

  return (
    <div
      style={{
        width: '100%',
        background: '#d1d5db',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        padding: '2rem 1.5rem',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
          Connected Devices
        </h2>
        <button
          onClick={handleAdd}
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
          Add Device
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Device Name</th>
              <th style={thStyle}>IP Address</th>
              <th style={thStyle}>MAC Address</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device =>
              editingDevice && editingDevice.id === device.id && showForm ? (
                <tr key={device.id} style={{ background: '#f9fafb' }}>
                  <td colSpan={5} style={{ padding: 0 }}>
                    <ConnectedDeviceForm
                      device={editingDevice}
                      onSuccess={handleFormSuccess}
                      onCancel={() => {
                        setShowForm(false)
                        setEditingDevice(null)
                      }}
                    />
                  </td>
                </tr>
              ) : (
                <tr
                  key={device.id}
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                >
                  <td style={tdStyle}>{device.device_name}</td>
                  <td style={tdStyle}>{device.ip_address}</td>
                  <td style={tdStyle}>{device.mac_address}</td>
                  <td style={tdStyle}>{device.connection_type}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(device)}
                      style={{
                        background: 'none',
                        border: '1px solid #2563eb',
                        color: '#2563eb',
                        borderRadius: 6,
                        padding: '6px 16px',
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer',
                        marginRight: 8
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(device.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        borderRadius: 6,
                        padding: '6px 16px',
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
            {showForm && !editingDevice && (
              <tr>
                <td colSpan={5} style={{ padding: 0 }}>
                  <ConnectedDeviceForm
                    device={null}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                      setShowForm(false)
                      setEditingDevice(null)
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ConnectedDevicesList
