import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/auth/login')
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16,
        padding: 16,
        borderBottom: '1px solid #eee',
        background: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
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
    </header>
  )
}

export default Header
