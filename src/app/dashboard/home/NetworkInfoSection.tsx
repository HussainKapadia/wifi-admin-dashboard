'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Card from '@/components/Card'
import Link from 'next/link'
import InputField from '@/components/auth/InputField'
import NetworkInfoDisplay from '@/components/dashboard/network-info/NetworkInfoDisplay'
import NetworkInfoForm from '@/components/dashboard/network-info/NetworkInfoForm'

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
    <Card title='Network Information'>
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
    </Card>
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
        const res = await fetch('/api/dashboard/network-info')
        console.log(res.status)
        if (res.status === 401) {
          setNotLoggedIn(true)
          setNetworkInfo(null)
        } else if (res.ok) {
          const data = await res.json()
          console.log(data.networkInfo)
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
  }, [])

  const onSubmit = async (values: NetworkInfoFormValues) => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/network-info', {
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
    return <Card title='Network Information'>Loading...</Card>
  }
  if (notLoggedIn) {
    return <LoginPrompt />
  }

  if (!editing) {
    return (
      <NetworkInfoDisplay
        networkInfo={networkInfo}
        error={error}
        isFirstTime={isFirstTime}
        onEdit={() => setEditing(true)}
      />
    )
  }

  return (
    <NetworkInfoForm
      networkInfo={networkInfo}
      error={error}
      isFirstTime={isFirstTime}
      saving={saving}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => {
        setEditing(false)
        reset(networkInfo || defaultValues)
      }}
      register={register}
      errors={errors}
    />
  )
}

export default NetworkInfoSection
