import React from 'react'
import Card from '@/components/Card'
import InputField from '@/components/auth/InputField'

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
    <form
      onSubmit={onSubmit}
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
            <th style={thStyle}>SSID</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='ssid'
                register={register('ssid', { required: true })}
                error={errors.ssid && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
            <th style={thStyle}>Security Type</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='security_type'
                register={register('security_type', { required: true })}
                error={errors.security_type && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Channel</th>
            <td style={tdStyle}>
              <InputField
                label=''
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
            </td>
            <th style={thStyle}>Frequency</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='frequency'
                register={register('frequency', { required: true })}
                error={errors.frequency && 'Required'}
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
            <th style={thStyle}>Subnet Mask</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='subnet_mask'
                register={register('subnet_mask', { required: true })}
                error={errors.subnet_mask && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
          </tr>
          <tr>
            <th style={thStyle}>Gateway</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='gateway'
                register={register('gateway', { required: true })}
                error={errors.gateway && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
            </td>
            <th style={thStyle}>DNS</th>
            <td style={tdStyle}>
              <InputField
                label=''
                id='dns'
                register={register('dns', { required: true })}
                error={errors.dns && 'Required'}
                autoComplete='off'
                inputSize='small'
              />
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
          disabled={saving}
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
          disabled={saving}
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
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default NetworkInfoForm
