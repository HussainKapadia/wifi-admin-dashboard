import React from 'react'
import ToggleSwitch from '@/components/ToggleSwitch'

interface SecuritySettingsProps {
  wifiEnabled: boolean
  firewallEnabled: boolean
  onWifiToggle: (enabled: boolean) => void
  onFirewallToggle: (enabled: boolean) => void
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  wifiEnabled,
  firewallEnabled,
  onWifiToggle,
  onFirewallToggle
}) => {
  return (
    <div style={{ width: '100%' }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#23272f',
          margin: '0 0 24px 0'
        }}
      >
        Security Settings
      </h2>

      {/* WiFi Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#23272f',
              marginBottom: 4
            }}
          >
            WiFi
          </div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>
            Enable or disable wireless network
          </div>
        </div>
        <ToggleSwitch
          checked={wifiEnabled}
          onChange={onWifiToggle}
          label={wifiEnabled ? 'On' : 'Off'}
        />
      </div>

      {/* Firewall Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0'
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#23272f',
              marginBottom: 4
            }}
          >
            Firewall
          </div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>
            Protect your network from unauthorized access
          </div>
        </div>
        <ToggleSwitch
          checked={firewallEnabled}
          onChange={onFirewallToggle}
          label={firewallEnabled ? 'On' : 'Off'}
        />
      </div>
    </div>
  )
}

export default SecuritySettings
