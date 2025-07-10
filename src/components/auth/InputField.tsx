import React from 'react'

interface InputFieldProps {
  label: string
  type?: string
  id: string
  register: any
  error?: string
  autoComplete?: string
  inputSize?: 'small' | 'normal'
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  id,
  register,
  error,
  autoComplete = '',
  inputSize = 'normal'
}) => {
  const inputStyle =
    inputSize === 'small'
      ? {
          width: '100%',
          padding: '6px 8px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 13,
          outline: 'none',
          marginBottom: 2
        }
      : {
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: 8,
          fontSize: 15,
          outline: 'none',
          marginBottom: 2
        }
  return (
    <div style={{ marginBottom: 1 }}>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register}
        style={inputStyle}
        autoComplete={autoComplete}
      />
      {error && <span style={{ color: '#ef4444', fontSize: 13 }}>{error}</span>}
    </div>
  )
}

export default InputField
