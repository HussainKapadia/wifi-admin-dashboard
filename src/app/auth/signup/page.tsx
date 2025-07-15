'use client'
import Card from '@/components/Card'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import InputField from '@/components/auth/InputField'

interface SignupForm {
  first_name: string
  last_name: string
  email: string
  password: string
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupForm>()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: SignupForm) => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/users/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('Signup successful! Redirecting to login...')
        setTimeout(() => router.push('/auth/login'), 1500)
      } else {
        setMessage(result.error || 'Signup failed.')
      }
    } catch (err) {
      setMessage('Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card variant='auth'>
      {/* Logo or System Name */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 1,
            color: '#2563eb',
            marginBottom: 4
          }}
        >
          WiFi Admin
        </div>
        <div style={{ fontSize: 15, color: '#64748b' }}>
          Create your account
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <InputField
          label='First Name'
          id='first_name'
          register={register('first_name', { required: true })}
          error={errors.first_name && 'First name is required'}
          autoComplete='given-name'
        />
        <InputField
          label='Last Name'
          id='last_name'
          register={register('last_name', { required: true })}
          error={errors.last_name && 'Last name is required'}
          autoComplete='family-name'
        />
        <InputField
          label='Email'
          id='email'
          type='email'
          register={register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email format'
            }
          })}
          error={errors.email?.message}
          autoComplete='email'
        />
        <InputField
          label='Password'
          id='password'
          type='password'
          register={register('password', { required: true, minLength: 6 })}
          error={errors.password && 'Password is required (min 6 chars)'}
          autoComplete='new-password'
        />
        <button
          type='submit'
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 0',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: 8,
            boxShadow: '0 2px 8px rgba(37,99,235,0.08)'
          }}
        >
          {loading ? 'Signing up...' : 'Submit'}
        </button>
      </form>
      {message && (
        <div
          style={{
            marginTop: 18,
            color: message.includes('success') ? '#22c55e' : '#ef4444',
            fontWeight: 500,
            fontSize: 15,
            textAlign: 'center',
            width: '100%'
          }}
        >
          {message}
        </div>
      )}
      <div style={{ marginTop: 28, textAlign: 'center', width: '100%' }}>
        <span style={{ color: '#64748b' }}>Already have an account? </span>
        <Link
          href='/auth/login'
          style={{
            color: '#2563eb',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          Login
        </Link>
      </div>
    </Card>
  )
}
