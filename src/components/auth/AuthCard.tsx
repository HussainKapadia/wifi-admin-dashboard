import React from 'react'

interface AuthCardProps {
  children: React.ReactNode
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #cbd5e1 0%, #d1d5db 100%)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: '#d1d5db', // even darker light grey
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#23272f' // dark text
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default AuthCard
