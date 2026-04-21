import React from 'react'

function StudentCard({ name, roll, branch, gpa }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0', borderRadius: 14, padding: 24,
      width: 200, background: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <div style={{
        width: 50, height: 50, borderRadius: '50%',
        background: 'linear-gradient(135deg,#667eea,#764ba2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 20, fontWeight: 700, margin: '0 auto 14px'
      }}>
        {name.charAt(0)}
      </div>
      <h3 style={{ margin: '0 0 8px', color: '#1a202c', textAlign: 'center' }}>{name}</h3>
      <p style={{ margin: '4px 0', color: '#718096', fontSize: 13 }}><b>Roll:</b> {roll}</p>
      <p style={{ margin: '4px 0', color: '#718096', fontSize: 13 }}><b>Branch:</b> {branch}</p>
      <p style={{ margin: '4px 0', color: '#718096', fontSize: 13 }}><b>GPA:</b> {gpa}</p>
    </div>
  )
}

function App() {
  const students = [
    { name: 'Rahul Sharma', roll: 'MCA001', branch: 'MCA', gpa: '9.2' },
    { name: 'Priya Patel',  roll: 'MCA002', branch: 'MCA', gpa: '8.8' },
    { name: 'Amit Verma',   roll: 'MCA003', branch: 'MCA', gpa: '9.5' },
    { name: 'Sneha Joshi',  roll: 'MCA004', branch: 'MCA', gpa: '8.4' },
  ]

  return (
    <div style={{
      minHeight: '100vh', background: '#f0f4f8',
      padding: 40, fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: 8 }}>
        Student Profiles
      </h2>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: 32, fontSize: 14 }}>
        Data passed from <b>Parent (App)</b> → <b>Child (StudentCard)</b> using Props
      </p>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {students.map((s, i) => <StudentCard key={i} {...s} />)}
      </div>
    </div>
  )
}

export default App
