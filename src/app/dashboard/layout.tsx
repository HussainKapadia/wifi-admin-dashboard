'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  )
}
