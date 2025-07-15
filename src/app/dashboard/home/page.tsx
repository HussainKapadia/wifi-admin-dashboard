'use client'

import NetworkInfoSection from './NetworkInfoSection'
import ConnectedDevicesList from '@/components/dashboard/connected-devices/ConnectedDevicesList'
import StatusCardsRow from './StatusCardsRow'
import { useState, useEffect } from 'react'

export default function DashboardHome() {
  const [ssid, setSsid] = useState<string>('')
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [notLoggedIn, setNotLoggedIn] = useState(false)
  const [deviceCount, setDeviceCount] = useState(0)

  useEffect(() => {
    async function fetchNetworkInfo() {
      try {
        const res = await fetch('/api/dashboard/network-info')
        if (res.status === 401) {
          setNotLoggedIn(true)
          setSsid('')
        } else if (res.ok) {
          const data = await res.json()
          if (!data.networkInfo) {
            setIsFirstTime(true)
            setSsid('')
          } else {
            setIsFirstTime(false)
            setSsid(data.networkInfo.ssid || '')
          }
        }
      } catch (e) {
        setSsid('')
      }
    }

    async function fetchConnectedDevices() {
      try {
        const res = await fetch('/api/dashboard/connected-devices')
        if (res.status === 401) {
          setNotLoggedIn(true)
          setDeviceCount(0)
        } else if (res.ok) {
          const data = await res.json()
          setDeviceCount(Array.isArray(data) ? data.length : 0)
        }
      } catch (e) {
        setDeviceCount(0)
      }
    }

    fetchNetworkInfo()
    fetchConnectedDevices()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        alignItems: 'center',
        minHeight: '60vh',
        padding: '32px 16px'
      }}
    >
      <StatusCardsRow
        ssid={ssid}
        isFirstTime={isFirstTime}
        notLoggedIn={notLoggedIn}
        deviceCount={deviceCount}
      />
      <NetworkInfoSection />
      <ConnectedDevicesList />
    </div>
  )
}
