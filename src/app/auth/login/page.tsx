'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard from '@/components/auth/AuthCard'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/users/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('Login successful!')
        router.push('/dashboard')
      } else {
        setMessage(result.error || 'Login failed.')
      }
    } catch (err) {
      setMessage('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard>
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
          Sign in to your dashboard
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
            Email
          </label>
          <input
            type='email'
            {...register('email', { required: true })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 15,
              outline: 'none',
              marginBottom: 2
            }}
            autoComplete='email'
          />
          {errors.email && (
            <span style={{ color: '#ef4444', fontSize: 13 }}>
              Email is required
            </span>
          )}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
            Password
          </label>
          <input
            type='password'
            {...register('password', { required: true })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 15,
              outline: 'none',
              marginBottom: 2
            }}
            autoComplete='current-password'
          />
          {errors.password && (
            <span style={{ color: '#ef4444', fontSize: 13 }}>
              Password is required
            </span>
          )}
        </div>
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
          {loading ? 'Logging in...' : 'Sign In'}
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
        <span style={{ color: '#64748b' }}>Don't have an account? </span>
        <Link
          href='/auth/signup'
          style={{
            color: '#2563eb',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          Sign up
        </Link>
      </div>
    </AuthCard>
  )
}
