import React, { useState, useEffect } from 'react'

function App() {
  const [count, setCount]   = useState(0)
  const [name, setName]     = useState('')
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    document.title = name ? `Hello, ${name}! 👋` : `Clicked ${count} times`
  }, [count, name])

  useEffect(() => {
    console.log('✅ Component Mounted')
    return () => console.log('❌ Component Unmounted')
  }, [])

  useEffect(() => {
    if (count > 0) console.log(`🔄 Count updated to: ${count}`)
  }, [count])

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc', fontFamily: 'Arial', padding: 40 }}>
      <div style={{ maxWidth: 480, margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 8 }}>
          ⚙️ useEffect Lifecycle Demo
        </h2>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: 32, fontSize: 14 }}>
          Watch the <b>browser tab title</b> change and check the <b>console</b> for lifecycle logs.
        </p>

        <div style={{ background: 'white', padding: 28, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: 20 }}>
          <h3 style={{ color: '#4a5568', marginBottom: 16 }}>1️⃣ Title from Name</h3>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Type your name → watch the tab title"
            style={{ width: '100%', padding: 11, border: '2px solid #e2e8f0', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ background: 'white', padding: 28, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: 20 }}>
          <h3 style={{ color: '#4a5568', marginBottom: 16 }}>2️⃣ Title from Click Count</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setCount(c => c + 1)} style={{
              padding: '12px 28px', background: 'linear-gradient(135deg,#667eea,#764ba2)',
              color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 15
            }}>
              Click Me
            </button>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#667eea' }}>{count}</span>
            <button onClick={() => setCount(0)} style={{
              padding: '12px 20px', background: '#e2e8f0',
              color: '#4a5568', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600
            }}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ background: '#ebf4ff', padding: 20, borderRadius: 12, border: '1px solid #bee3f8' }}>
          <h4 style={{ color: '#2b6cb0', marginBottom: 8 }}>📌 How useEffect is used here:</h4>
          <ul style={{ color: '#2c5282', fontSize: 13, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Effect 1 — runs on every <b>count</b> or <b>name</b> change → updates document title</li>
            <li>Effect 2 — runs only <b>once on mount</b> → logs mount/unmount</li>
            <li>Effect 3 — runs when <b>count changes</b> → logs new count to console</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
