'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'

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

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('Login successful!')
        // Optionally, reload or redirect here
        // window.location.href = "/dashboard"
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
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type='email' {...register('email', { required: true })} />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            {...register('password', { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <button type='submit' disabled={loading} style={{ marginTop: 12 }}>
          {loading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <span>Don't have an account? </span>
        <Link
          href='/signup'
          style={{ color: '#2563eb', textDecoration: 'underline' }}
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
