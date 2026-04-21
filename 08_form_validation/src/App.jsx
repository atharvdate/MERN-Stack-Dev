import React, { useState } from 'react'

function App() {
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 3)
      e.name = '⚠ Name must be at least 3 characters.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = '⚠ Please enter a valid email address.'
    if (form.password.length < 6)
      e.password = '⚠ Password must be at least 6 characters.'
    else if (!/\d/.test(form.password))
      e.password = '⚠ Password must contain at least one number.'
    return e
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setSuccess(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSuccess(true)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px', borderRadius: 8,
    border: `2px solid ${errors[field] ? '#fc8181' : '#e2e8f0'}`,
    fontSize: 14, boxSizing: 'border-box', transition: 'border-color 0.2s'
  })

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg,#f5f7fa,#c3cfe2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Arial'
    }}>
      <div style={{ background: 'white', padding: 36, borderRadius: 16, width: 380, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 28 }}>📋 Registration</h2>

        {success && (
          <div style={{ background: '#c6f6d5', color: '#276749', padding: 12, borderRadius: 8, textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>
            ✅ Registration Successful!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { name: 'name',     label: 'Full Name',     type: 'text',     placeholder: 'Enter your name' },
            { name: 'email',    label: 'Email Address', type: 'email',    placeholder: 'Enter your email' },
            { name: 'password', label: 'Password',      type: 'password', placeholder: 'Enter password' },
          ].map(f => (
            <div key={f.name} style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#4a5568' }}>
                {f.label}
              </label>
              <input
                type={f.type} name={f.name} value={form[f.name]}
                onChange={handleChange} style={inputStyle(f.name)}
                placeholder={f.placeholder}
              />
              {errors[f.name] && (
                <span style={{ color: '#e53e3e', fontSize: 12, marginTop: 4, display: 'block' }}>
                  {errors[f.name]}
                </span>
              )}
            </div>
          ))}
          <button type="submit" style={{
            width: '100%', padding: 13, border: 'none', borderRadius: 10, cursor: 'pointer',
            background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white',
            fontWeight: 700, fontSize: 15, marginTop: 4
          }}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
