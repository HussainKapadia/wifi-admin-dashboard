import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  variant?: 'auth' | 'dashboard'
  className?: string
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  variant = 'dashboard',
  className = ''
}) => {
  const baseCardStyle = {
    background: '#d1d5db', // even darker light grey
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    color: '#23272f', // dark text
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start'
  }

  const authCardStyle = {
    ...baseCardStyle,
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: '2.5rem 2rem',
    alignItems: 'center' as const
  }

  const dashboardCardStyle = {
    ...baseCardStyle,
    width: '100%',
    padding: '2rem 1.5rem',
    margin: '1.5rem 0'
  }

  const containerStyle =
    variant === 'auth'
      ? {
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #cbd5e1 0%, #d1d5db 100%)'
        }
      : {}

  const cardStyle = variant === 'auth' ? authCardStyle : dashboardCardStyle

  const content = (
    <div style={cardStyle} className={className}>
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

  if (variant === 'auth') {
    return <div style={containerStyle}>{content}</div>
  }

  return content
}

export default Card
