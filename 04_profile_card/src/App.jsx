import React, { useState } from 'react'

function ProfileCard() {
  const [followed, setFollowed] = useState(false)

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg,#667eea,#764ba2)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        width: 280, background: 'white', borderRadius: 20,
        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        textAlign: 'center', padding: '36px 28px',
        transition: 'transform 0.3s',
        cursor: 'default'
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <img
          src="https://i.pravatar.cc/120?img=12"
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #667eea', objectFit: 'cover' }}
        />
        <h2 style={{ margin: '14px 0 4px', color: '#1a202c', fontSize: 22 }}>Rahul Sharma</h2>
        <p style={{ color: '#667eea', fontWeight: 600, fontSize: 14, margin: '0 0 12px' }}>
          Full Stack Developer
        </p>
        <p style={{ color: '#718096', fontSize: 13, lineHeight: 1.6, margin: '0 0 24px' }}>
          Passionate about building modern web applications using the MERN stack. 
          Love clean code and great UI.
        </p>
        <button
          onClick={() => setFollowed(!followed)}
          style={{
            padding: '10px 36px', borderRadius: 25, border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 700, transition: 'all 0.3s',
            background: followed ? '#e2e8f0' : 'linear-gradient(135deg,#667eea,#764ba2)',
            color: followed ? '#4a5568' : 'white',
            boxShadow: followed ? 'none' : '0 4px 15px rgba(102,126,234,0.4)'
          }}
        >
          {followed ? '✓ Following' : '+ Follow'}
        </button>
      </div>
    </div>
  )
}

export default ProfileCard
