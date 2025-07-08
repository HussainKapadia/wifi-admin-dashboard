'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('Signup successful! Redirecting to login...')
        setTimeout(() => router.push('/login'), 1500)
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
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
        <div className='form-control'>
          <label>First Name</label>
          <input
            type='text'
            id='first_name'
            {...register('first_name', { required: true })}
          />
          {errors.first_name && <span>First name is required</span>}
        </div>

        <div className='form-control'>
          <label>Last Name</label>
          <input
            id='last_name'
            {...register('last_name', { required: true })}
          />
          {errors.last_name && <span>Last name is required</span>}
        </div>

        <div className='form-control'>
          <label>Email</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email?.message && (
            <p className='error-message'>{errors.email.message}</p>
          )}
        </div>

        <div className='form-control'>
          <label>Password</label>
          <input
            type='password'
            id='password'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && <span>Password is required (min 6 chars)</span>}
        </div>

        <button type='submit' disabled={loading} style={{ marginTop: 12 }}>
          {loading ? 'Signing up...' : 'Submit'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <span>Already have an account? </span>
        <Link
          href='/login'
          style={{ color: '#2563eb', textDecoration: 'underline' }}
        >
          Login
        </Link>
      </div>
    </div>
  )
}
