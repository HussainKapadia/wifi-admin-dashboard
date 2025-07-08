'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/auth/login')
  }

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 16,
          borderBottom: '1px solid #eee'
        }}
      >
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href='/dashboard/home'>Home</Link>
          <Link href='/dashboard/settings'>Settings</Link>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(open => !open)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            aria-label='Profile'
          >
            Profile &#x25BC;
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                border: '1px solid #eee',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                zIndex: 10
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  )
}
