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
    <div
      style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: 24,
        maxWidth: 400,
        margin: '24px auto'
      }}
    >
      <h3>{device ? 'Edit Device' : 'Add Device'}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label='Device Name'
          id='device_name'
          register={register('device_name', { required: true })}
          error={errors.device_name && 'Required'}
          autoComplete='off'
          inputSize='small'
        />
        <InputField
          label='IP Address'
          id='ip_address'
          register={register('ip_address', { required: true })}
          error={errors.ip_address && 'Required'}
          autoComplete='off'
          inputSize='small'
        />
        <InputField
          label='MAC Address'
          id='mac_address'
          register={register('mac_address', { required: true })}
          error={errors.mac_address && 'Required'}
          autoComplete='off'
          inputSize='small'
        />
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
            Connection Type
          </label>
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
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            type='button'
            onClick={onCancel}
            disabled={isSubmitting}
            style={{ width: 120 }}
          >
            Cancel
          </button>
          <button type='submit' disabled={isSubmitting} style={{ width: 120 }}>
            {isSubmitting ? 'Saving...' : device ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConnectedDeviceForm
