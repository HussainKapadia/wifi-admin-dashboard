import React, { useState } from 'react'
import Link from 'next/link'

const sidebarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 24,

  minHeight: '100vh',
  minWidth: 180,
  background: '#d1d5db',
  position: 'sticky',
  top: 0,
  transition: 'min-width 0.2s',
  color: '#23272f'
}

const brandStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 22,
  color: '#111827', // black
  marginBottom: 32,
  textDecoration: 'none',
  letterSpacing: 1,
  cursor: 'pointer',
  display: 'block',
  textAlign: 'left'
}

const linkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: '#23272f',
  fontWeight: 700,
  fontSize: 17,
  textDecoration: 'none',
  borderRadius: 8,
  padding: '8px 12px',
  transition: 'background 0.15s, color 0.15s'
}

const linkHoverStyle: React.CSSProperties = {
  background: '#cbd5e1',
  color: '#2563eb'
}

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav
      style={{
        ...sidebarStyle,
        minWidth: collapsed ? 56 : 180,
        alignItems: collapsed ? 'center' : 'flex-start'
      }}
    >
      <div style={{ width: '100%' }}>
        {!collapsed && (
          <Link href='/dashboard/home' style={brandStyle}>
            Wifi-Admin
          </Link>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: '100%'
          }}
        >
          <Link
            href='/dashboard/home'
            style={{
              ...linkStyle,
              ...(hovered === 'home' ? linkHoverStyle : {}),
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}
            onMouseEnter={() => setHovered('home')}
            onMouseLeave={() => setHovered(null)}
          >
            {!collapsed && 'Home'}
          </Link>
          <Link
            href='/dashboard/settings'
            style={{
              ...linkStyle,
              ...(hovered === 'settings' ? linkHoverStyle : {}),
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}
            onMouseEnter={() => setHovered('settings')}
            onMouseLeave={() => setHovered(null)}
          >
            {!collapsed && 'Settings'}
          </Link>
        </div>
      </div>
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          alignSelf: 'center',
          fontSize: 20,
          marginTop: 24,
          color: '#23272f'
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '>' : '<'}
      </button>
    </nav>
  )
}

export default Sidebar
