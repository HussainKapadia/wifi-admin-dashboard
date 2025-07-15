'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { SettingsProvider } from '@/contexts/SettingsContext'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsProvider>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, background: '#f3f4f6' }}>
          <Header />
          <main style={{ padding: 24 }}>{children}</main>
        </div>
      </div>
    </SettingsProvider>
  )
}
