import React, { useState } from 'react'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 24,
        borderRight: '1px solid #eee',
        minHeight: '100vh',
        minWidth: collapsed ? 56 : 180,
        background: '#fafbfc',
        position: 'sticky',
        top: 0,
        transition: 'min-width 0.2s'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Link
          href='/dashboard/home'
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {!collapsed && 'Home'}
        </Link>
        <Link
          href='/dashboard/settings'
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {!collapsed && 'Settings'}
        </Link>
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
          marginTop: 24
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? '>' : '<'}
      </button>
    </nav>
  )
}

export default Sidebar
