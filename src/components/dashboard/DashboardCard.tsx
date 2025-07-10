import React from 'react'

interface DashboardCardProps {
  title?: string
  children: React.ReactNode
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div
      style={{
        background: '#d1d5db', // even darker light grey
        // borderRadius: 16, // removed for sharp edges
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        padding: '2rem 1.5rem',
        margin: '1.5rem 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#23272f' // dark text
      }}
    >
      {title && (
        <h2
          style={{
            margin: 0,
            marginBottom: 16,
            fontSize: 22,
            color: '#23272f',
            fontWeight: 700
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}

export default DashboardCard
