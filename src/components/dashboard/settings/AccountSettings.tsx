import React from 'react'

interface AccountSettingsProps {
  onLogout: () => void
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onLogout }) => {
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
        Account
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0'
        }}
      >
        <button
          onClick={onLogout}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#dc2626')}
          onMouseOut={e => (e.currentTarget.style.background = '#ef4444')}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
            <polyline points='16,17 21,12 16,7' />
            <line x1='21' y1='12' x2='9' y2='12' />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountSettings
