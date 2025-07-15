import React from 'react'
import Card from '@/components/Card'
import InputField from '@/components/auth/InputField'

interface NetworkInfoFormProps {
  networkInfo: any
  error: string | null
  isFirstTime: boolean
  saving: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  register: any
  errors: any
}

const NetworkInfoForm: React.FC<NetworkInfoFormProps> = ({
  networkInfo,
  error,
  isFirstTime,
  saving,
  onSubmit,
  onCancel,
  register,
  errors
}) => {
  return (
    <Card title='Network Information'>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <InputField
            label='SSID'
            id='ssid'
            register={register('ssid', { required: true })}
            error={errors.ssid && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
          <InputField
            label='Security Type'
            id='security_type'
            register={register('security_type', { required: true })}
            error={errors.security_type && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
          <InputField
            label='Channel'
            id='channel'
            type='number'
            register={register('channel', {
              required: true,
              valueAsNumber: true
            })}
            error={errors.channel && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
          <InputField
            label='Frequency'
            id='frequency'
            register={register('frequency', { required: true })}
            error={errors.frequency && 'Required'}
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
            label='Subnet Mask'
            id='subnet_mask'
            register={register('subnet_mask', { required: true })}
            error={errors.subnet_mask && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
          <InputField
            label='Gateway'
            id='gateway'
            register={register('gateway', { required: true })}
            error={errors.gateway && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
          <InputField
            label='DNS (comma separated)'
            id='dns'
            register={register('dns', { required: true })}
            error={errors.dns && 'Required'}
            autoComplete='off'
            inputSize='small'
          />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button type='submit' disabled={saving} style={{ width: 120 }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type='button' onClick={onCancel} style={{ width: 120 }}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  )
}

export default NetworkInfoForm
