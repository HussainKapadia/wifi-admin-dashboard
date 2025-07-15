import React, { useEffect, useState } from 'react'
import ConnectedDeviceForm from './ConnectedDeviceForm'

export interface ConnectedDevice {
  id: number
  device_name: string
  ip_address: string
  mac_address: string
  connection_type: 'Wireless' | 'Wired'
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
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2>Connected Devices</h2>
        <button onClick={handleAdd}>Add Device</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {devices.map(device => (
          <div
            key={device.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              padding: 16,
              minWidth: 250
            }}
          >
            <h3>{device.device_name}</h3>
            <p>
              <b>IP:</b> {device.ip_address}
            </p>
            <p>
              <b>MAC:</b> {device.mac_address}
            </p>
            <p>
              <b>Type:</b> {device.connection_type}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => handleEdit(device)}>Edit</button>
              <button
                onClick={() => handleDelete(device.id)}
                style={{ color: 'red' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <ConnectedDeviceForm
          device={editingDevice}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingDevice(null)
          }}
        />
      )}
    </div>
  )
}

export default ConnectedDevicesList
