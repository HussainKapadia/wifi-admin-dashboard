'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DashboardCard from '@/components/dashboard/DashboardCard'
import Link from 'next/link'
import InputField from '@/components/auth/InputField'

interface NetworkInfoFormValues {
  ssid: string
  security_type: string
  channel: number
  frequency: string
  ip_address: string
  subnet_mask: string
  gateway: string
  dns: string
}

const defaultValues: NetworkInfoFormValues = {
  ssid: '',
  security_type: '',
  channel: 1,
  frequency: '',
  ip_address: '',
  subnet_mask: '',
  gateway: '',
  dns: ''
}

function LoginPrompt() {
  return (
    <DashboardCard title='Network Information'>
      <div style={{ textAlign: 'center', padding: 24 }}>
        <p style={{ marginBottom: 16 }}>
          Please log in to see your network information.
        </p>
        <Link
          href='/auth/login'
          style={{
            color: '#2563eb',
            fontWeight: 600,
            textDecoration: 'underline'
          }}
        >
          Go to Login
        </Link>
      </div>
    </DashboardCard>
  )
}

const labelStyle = { fontWeight: 500, color: '#374151', minWidth: 120 }
const valueStyle = { color: '#23272f' }

const NetworkInfoSection: React.FC = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfoFormValues | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notLoggedIn, setNotLoggedIn] = useState(false)
  const [editing, setEditing] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NetworkInfoFormValues>({
    defaultValues: defaultValues
  })

  useEffect(() => {
    async function fetchNetworkInfo() {
      setLoading(true)
      setError(null)
      setNotLoggedIn(false)
      try {
        const res = await fetch('/api/network-info')
        if (res.status === 401) {
          setNotLoggedIn(true)
          setNetworkInfo(null)
        } else if (res.ok) {
          const data = await res.json()
          if (!data.networkInfo) {
            setIsFirstTime(true)
            setNetworkInfo(defaultValues)
            reset(defaultValues)
          } else {
            setIsFirstTime(false)
            setNetworkInfo(data.networkInfo)
            reset(data.networkInfo)
          }
        } else {
          setError('Failed to load network info.')
        }
      } catch (e) {
        setError('Failed to load network info.')
      } finally {
        setLoading(false)
      }
    }
    fetchNetworkInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: NetworkInfoFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/network-info', {
        method: isFirstTime ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (res.ok) {
        const data = await res.json()
        setNetworkInfo(data.networkInfo)
        setEditing(false)
        setIsFirstTime(false)
        reset(data.networkInfo)
      } else if (res.status === 401) {
        setNotLoggedIn(true)
        setNetworkInfo(null)
      } else {
        setError('Failed to save network info.')
      }
    } catch (e) {
      setError('Failed to save network info.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <DashboardCard title='Network Information'>Loading...</DashboardCard>
  }
  if (notLoggedIn) {
    return <LoginPrompt />
  }

  // Display mode (not editing)
  if (!editing) {
    return (
      <DashboardCard title='Network Information'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 8
          }}
        >
          <button
            onClick={() => setEditing(true)}
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
      </DashboardCard>
    )
  }

  // Edit mode (inline form)
  return (
    <DashboardCard title='Network Information'>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
          <button
            type='button'
            onClick={() => {
              setEditing(false)
              reset(networkInfo || defaultValues)
            }}
            style={{ width: 120 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </DashboardCard>
  )
}

export default NetworkInfoSection
