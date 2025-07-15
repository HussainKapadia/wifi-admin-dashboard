import React, { createContext, useContext, useState, ReactNode } from 'react'

interface SettingsContextType {
  wifiEnabled: boolean
  firewallEnabled: boolean
  setWifiEnabled: (enabled: boolean) => void
  setFirewallEnabled: (enabled: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

interface SettingsProviderProps {
  children: ReactNode
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children
}) => {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [firewallEnabled, setFirewallEnabled] = useState(false)

  const value = {
    wifiEnabled,
    firewallEnabled,
    setWifiEnabled,
    setFirewallEnabled
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('must be used within a SettingsProvider')
  }
  return context
}
