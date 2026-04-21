import React, { useState, useEffect } from 'react'

function App() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => { setUsers(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', padding: 40, fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 8 }}>👥 Users from API</h2>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: 32, fontSize: 14 }}>
        Data fetched from <b>jsonplaceholder.typicode.com</b> using <code>useEffect</code>
      </p>

      {loading && (
        <div style={{ textAlign: 'center', color: '#667eea', fontSize: 16, marginTop: 60 }}>
          ⏳ Loading users...
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', color: '#e53e3e', fontSize: 15 }}>❌ Error: {error}</div>
      )}

      <div style={{ maxWidth: 700, margin: 'auto', display: 'grid', gap: 14 }}>
        {users.map(user => (
          <div key={user.id} style={{
            background: 'white', borderRadius: 12, padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', gap: 16,
            borderLeft: '4px solid #667eea'
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg,#667eea,#764ba2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 18, fontWeight: 700, flexShrink: 0
            }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1a202c', fontSize: 15 }}>{user.name}</div>
              <div style={{ color: '#718096', fontSize: 13 }}>📧 {user.email}</div>
              <div style={{ color: '#718096', fontSize: 13 }}>🌐 {user.website}</div>
            </div>
            <div style={{ color: '#718096', fontSize: 13, textAlign: 'right' }}>
              <div>📍 {user.address.city}</div>
              <div>🏢 {user.company.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
