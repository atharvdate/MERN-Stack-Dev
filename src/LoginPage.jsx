import { useState } from "react";

const styles = {
  root: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100vh",
    background: "#0a0a0f",
    fontFamily: "'Syne', sans-serif",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #0d0d1a 0%, #111126 60%, #0a0a0f 100%)",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "0.5px solid #1e1e35",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(99,91,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,91,255,0.07) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  glowOrb: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,91,255,0.18) 0%, transparent 70%)",
    bottom: -60,
    left: -60,
    pointerEvents: "none",
  },
  brandMark: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandIcon: {
    width: 36,
    height: 36,
    background: "#635bff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  leftCopy: {
    position: "relative",
    zIndex: 1,
  },
  leftH2: {
    fontSize: 28,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.2,
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  leftP: {
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
  },
  leftTags: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
    background: "rgba(99,91,255,0.12)",
    border: "0.5px solid rgba(99,91,255,0.3)",
    color: "#a09af0",
    padding: "4px 10px",
    borderRadius: 20,
    letterSpacing: "0.5px",
  },
  right: {
    width: 360,
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#0a0a0f",
  },
  h1: {
    fontSize: 24,
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 4px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    margin: "0 0 32px",
    fontFamily: "'JetBrains Mono', monospace",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: 7,
    fontFamily: "'JetBrains Mono', monospace",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#111118",
    border: "0.5px solid #252535",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#fff",
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    cursor: "pointer",
    fontFamily: "'JetBrains Mono', monospace",
  },
  forgot: {
    fontSize: 12,
    color: "#635bff",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "'JetBrains Mono', monospace",
  },
  btnLogin: {
    width: "100%",
    padding: "12px",
    background: "#635bff",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    letterSpacing: "0.5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "20px 0",
  },
  hr: {
    flex: 1,
    border: "none",
    borderTop: "0.5px solid #1e1e35",
    margin: 0,
  },
  dividerText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    fontFamily: "'JetBrains Mono', monospace",
    whiteSpace: "nowrap",
  },
  btnSSO: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "0.5px solid #252535",
    borderRadius: 8,
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  signupRow: {
    marginTop: 24,
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textAlign: "center",
    fontFamily: "'JetBrains Mono', monospace",
  },
  signupLink: {
    color: "#635bff",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, remember });
    // TODO: connect to your auth logic
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <div style={styles.root}>
        {/* Left Panel */}
        <div style={styles.left}>
          <div style={styles.gridBg} />
          <div style={styles.glowOrb} />

          <div style={styles.brandMark}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10L8 6L12 10L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 14L8 10L12 14L16 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={styles.brandName}>
              nexus<span style={{ color: "#635bff" }}>.</span>io
            </div>
          </div>

          <div style={styles.leftCopy}>
            <h2 style={styles.leftH2}>Build faster.<br />Ship smarter.</h2>
            <p style={styles.leftP}>{`// infrastructure for the`}<br />next generation of teams</p>
          </div>

          <div style={styles.leftTags}>
            {["99.9% uptime", "edge compute", "zero latency", "SOC 2"].map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.right}>
          <h1 style={styles.h1}>Welcome back</h1>
          <p style={styles.subtitle}>{`// sign in to your workspace`}</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={styles.fieldRow}>
              <label style={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 14, height: 14, accentColor: "#635bff" }}
                />
                remember me
              </label>
              <button type="button" style={styles.forgot}>forgot password?</button>
            </div>

            <button type="submit" style={styles.btnLogin}>
              Sign in
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M8 4L11 7L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div style={styles.divider}>
            <hr style={styles.hr} />
            <span style={styles.dividerText}>or continue with</span>
            <hr style={styles.hr} />
          </div>

          <button style={styles.btnSSO}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.6"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.6"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.3"/>
            </svg>
            Single Sign-On (SSO)
          </button>

          <div style={styles.signupRow}>
            no account?{" "}
            <button style={styles.signupLink}>request access →</button>
          </div>
        </div>
      </div>
    </>
  );
}