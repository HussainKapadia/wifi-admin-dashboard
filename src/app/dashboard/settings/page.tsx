'use client'

import Card from '@/components/Card'
import SecuritySettings from '@/components/dashboard/settings/SecuritySettings'
import AccountSettings from '@/components/dashboard/settings/AccountSettings'
import { useSettings } from '@/contexts/SettingsContext'

export default function DashboardSettings() {
  const { wifiEnabled, firewallEnabled, setWifiEnabled, setFirewallEnabled } =
    useSettings()

  const handleLogout = () => {
    // This will work the same as the header logout
    fetch('/api/users/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      window.location.href = '/auth/login'
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '60vh',
        padding: '32px 24px'
      }}
    >
      <div style={{ width: '100%' }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            <SecuritySettings
              wifiEnabled={wifiEnabled}
              firewallEnabled={firewallEnabled}
              onWifiToggle={setWifiEnabled}
              onFirewallToggle={setFirewallEnabled}
            />
            <AccountSettings onLogout={handleLogout} />
          </div>
        </Card>
      </div>
    </div>
  )
}
