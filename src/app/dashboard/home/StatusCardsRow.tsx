import React from 'react'
import WifiStatusCard from '@/components/dashboard/status/WifiStatusCard'
import FirewallStatusCard from '@/components/dashboard/status/FirewallStatusCard'
import SSIDCard from '@/components/dashboard/status/SSIDCard'
import ConnectedDevicesCountCard from '@/components/dashboard/status/ConnectedDevicesCountCard'
import { useSettings } from '@/contexts/SettingsContext'

interface StatusCardsRowProps {
  ssid?: string
  isFirstTime?: boolean
  notLoggedIn?: boolean
  deviceCount?: number
}

const StatusCardsRow: React.FC<StatusCardsRowProps> = ({
  ssid,
  isFirstTime = false,
  notLoggedIn = false,
  deviceCount = 0
}) => {
  const { wifiEnabled, firewallEnabled, setWifiEnabled, setFirewallEnabled } =
    useSettings()

  return (
    <div
      style={{
        display: 'flex',
        gap: 32,
        width: '100%',
        marginBottom: 32,
        flexWrap: 'wrap'
      }}
    >
      <div style={{ flex: 1, minWidth: 280, maxWidth: 320, paddingRight: 16 }}>
        <WifiStatusCard enabled={wifiEnabled} onToggle={setWifiEnabled} />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 280,
          maxWidth: 320,
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        <FirewallStatusCard
          enabled={firewallEnabled}
          onToggle={setFirewallEnabled}
        />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 280,
          maxWidth: 320,
          paddingLeft: 16,
          paddingRight: 16
        }}
      >
        <SSIDCard
          ssid={ssid}
          isFirstTime={isFirstTime}
          notLoggedIn={notLoggedIn}
        />
      </div>
      <div style={{ flex: 1, minWidth: 280, maxWidth: 320, paddingLeft: 16 }}>
        <ConnectedDevicesCountCard
          deviceCount={deviceCount}
          notLoggedIn={notLoggedIn}
        />
      </div>
    </div>
  )
}

export default StatusCardsRow
