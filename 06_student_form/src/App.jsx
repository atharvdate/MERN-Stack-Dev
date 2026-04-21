import React, { useState } from 'react'

const initialForm = { name: '', rollNo: '', branch: '', email: '', phone: '' }

function App() {
  const [form, setForm]           = useState(initialForm)
  const [submitted, setSubmitted] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(form)
    setForm(initialForm)
  }

  const fields = [
    { name: 'name',    label: 'Full Name',     type: 'text'  },
    { name: 'rollNo',  label: 'Roll Number',   type: 'text'  },
    { name: 'branch',  label: 'Branch',        type: 'text'  },
    { name: 'email',   label: 'Email Address', type: 'email' },
    { name: 'phone',   label: 'Phone Number',  type: 'tel'   },
  ]

  const inp = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '2px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box', transition: 'border-color 0.2s' }

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', padding: 40, fontFamily: 'Arial' }}>
      <div style={{ maxWidth: 480, margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 28 }}>🎓 Student Details Form</h2>
        <div style={{ background: 'white', padding: 32, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit}>
            {fields.map(f => (
              <div key={f.name} style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, color: '#4a5568' }}>
                  {f.label}
                </label>
                <input
                  type={f.type} name={f.name} value={form[f.name]}
                  onChange={handleChange} required style={inp}
                  onFocus={e => e.target.style.borderColor = '#667eea'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  placeholder={`Enter ${f.label.toLowerCase()}`}
                />
              </div>
            ))}
            <button type="submit" style={{
              width: '100%', padding: 13, border: 'none', borderRadius: 10, cursor: 'pointer',
              background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white',
              fontWeight: 700, fontSize: 15, marginTop: 8
            }}>
              Submit
            </button>
          </form>
        </div>

        {submitted && (
          <div style={{
            marginTop: 28, background: 'white', padding: 28,
            borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderLeft: '5px solid #667eea'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: 16 }}>✅ Submitted Data</h3>
            {Object.entries(submitted).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ width: 120, color: '#718096', fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{k}:</span>
                <span style={{ color: '#2d3748', fontSize: 13 }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
