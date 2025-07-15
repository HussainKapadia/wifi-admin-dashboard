import React from 'react'
import { useForm } from 'react-hook-form'
import { ConnectedDevice } from './ConnectedDevicesList'
import InputField from '@/components/auth/InputField'

interface Props {
  device: ConnectedDevice | null
  onSuccess: () => void
  onCancel: () => void
}

const defaultValues = {
  device_name: '',
  ip_address: '',
  mac_address: '',
  connection_type: 'Wireless' as 'Wireless' | 'Wired'
}

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
  width: '25%'
}

const ConnectedDeviceForm: React.FC<Props> = ({
  device,
  onSuccess,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: device ? { ...device } : defaultValues
  })
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (device) {
      reset(device)
    } else {
      reset(defaultValues)
    }
  }, [device, reset])

  const onSubmit = async (values: typeof defaultValues) => {
    setError(null)
    try {
      const method = device ? 'PUT' : 'POST'
      const url = device
        ? `/api/dashboard/connected-devices/${device.id}`
        : '/api/dashboard/connected-devices'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error('Failed to save device')
      onSuccess()
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '100%',
        background: 'none',
        boxShadow: 'none',
        padding: 0,
        margin: 0
      }}
    >
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={thStyle}>Device Name</th>
            <td style={tdStyle} colSpan={3}>
              <InputField
                label=''
                id='device_name'
                register={register('device_name', { required: true })}
                error={errors.device_name && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
          </tr>
          <tr>
            <th style={thStyle}>IP Address</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='ip_address'
                register={register('ip_address', { required: true })}
                error={errors.ip_address && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
            <th style={thStyle}>MAC Address</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='mac_address'
                register={register('mac_address', { required: true })}
                error={errors.mac_address && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Connection Type</th>
            <td style={tdStyle} colSpan={3}>
              <select
                {...register('connection_type', { required: true })}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 13,
                  outline: 'none',
                  marginBottom: 2
                }}
              >
                <option value='Wireless'>Wireless</option>
                <option value='Wired'>Wired</option>
              </select>
              {errors.connection_type && (
                <span style={{ color: '#ef4444', fontSize: 13 }}>Required</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 24,
          justifyContent: 'flex-end'
        }}
      >
        <button
          type='button'
          onClick={onCancel}
          disabled={isSubmitting}
          style={{
            width: 120,
            background: '#f3f4f6',
            color: '#23272f',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          style={{
            width: 120,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer'
          }}
        >
          {isSubmitting ? 'Saving...' : device ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default ConnectedDeviceForm
