import React from 'react'

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  disabled
}) => {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {label && (
        <span style={{ color: '#23272f', fontWeight: 500 }}>{label}</span>
      )}
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 44,
          height: 24
        }}
      >
        <input
          type='checkbox'
          checked={checked}
          disabled={disabled}
          onChange={e => onChange(e.target.checked)}
          style={{
            opacity: 0,
            width: 44,
            height: 24,
            margin: 0,
            position: 'absolute',
            left: 0,
            top: 0,
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          aria-checked={checked}
        />
        <span
          style={{
            display: 'block',
            width: 44,
            height: 24,
            background: checked ? '#2563eb' : '#d1d5db',
            borderRadius: 24,
            transition: 'background 0.2s',
            boxShadow: checked ? '0 0 0 2px #2563eb33' : 'none',
            position: 'relative',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: checked ? 22 : 2,
              top: 2,
              width: 20,
              height: 20,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
              transition: 'left 0.2s',
              border: '1px solid #cbd5e1',
              pointerEvents: 'none'
            }}
          />
        </span>
      </span>
    </label>
  )
}

export default ToggleSwitch
