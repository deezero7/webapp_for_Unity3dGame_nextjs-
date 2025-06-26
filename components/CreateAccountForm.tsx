'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/

export default function CreateAccountForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.')
      return
    }

    if (username.length < 3 || username.length > 25) {
      setError('Username must be between 3 and 25 characters.')
      return
    }

    if (!PASSWORD_REGEX.test(password)) {
      setError(
        'Password must be 6–25 characters, include uppercase, lowercase, a number, and a special symbol.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const res = await fetch(
        `https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/createacc`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        }
      )

      const data = await res.json()

      if (data.status === 0) {
        setSuccess('Account created. Please verify your email.')
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        setError(data.message || 'Failed to create account.')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Network error. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-[var(--secondary-color)] rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[var(--primary-color)] text-center">
        Create Account
      </h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="form-input w-full rounded-xl h-12 p-4 bg-[var(--background-color)] text-[var(--text-primary)]"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="form-input w-full rounded-xl h-12 p-4 bg-[var(--background-color)] text-[var(--text-primary)]"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="form-input w-full rounded-xl h-12 p-4 bg-[var(--background-color)] text-[var(--text-primary)]"
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="form-input w-full rounded-xl h-12 p-4 bg-[var(--background-color)] text-[var(--text-primary)]"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}

      <button
        onClick={handleSubmit}
        className="w-full h-12 rounded-xl bg-[var(--primary-color)] text-[var(--background-color)] font-bold hover:bg-opacity-90 transition"
      >
        Create Account
      </button>

      <button
        onClick={() => router.push('/login')}
        className="w-full h-12 rounded-xl border border-[var(--primary-color)] text-[var(--primary-color)] font-bold mt-2 hover:bg-[var(--primary-color)] hover:text-[var(--background-color)] transition"
      >
        Already have an account? Login
      </button>
    </div>
  )
}
