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
        borderBottom: '1px solid #cbd5e1',
        background: '#d1d5db', // even darker light grey
        position: 'sticky',
        top: 0,
        zIndex: 100,
        color: '#23272f', // dark text
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setDropdownOpen(open => !open)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#23272f'
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
              background: '#d1d5db',
              border: '1px solid #cbd5e1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              zIndex: 10,
              color: '#23272f'
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
                cursor: 'pointer',
                color: '#23272f'
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
