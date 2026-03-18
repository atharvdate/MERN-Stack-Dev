function StudentCard({ name, roll, branch, onClick }) {
  return (
    <div
      onClick={onClick}                         // receives click from App.js
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        width: "200px",
        textAlign: "center",
        margin: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",                      // pointer on hover
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{
        width: "50px", height: "50px", borderRadius: "50%",
        background: "#dbeafe", display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 12px", fontSize: "22px"
      }}>
        👤
      </div>
      <h2 style={{ margin: "0 0 6px", fontSize: "16px" }}>{name}</h2>
      <p style={{ color: "#6b7280", margin: "0 0 4px", fontSize: "13px" }}>
        Roll No: {roll}
      </p>
      <p style={{
        color: "#1d4ed8", background: "#dbeafe", borderRadius: "20px",
        padding: "3px 12px", display: "inline-block",
        fontSize: "12px", margin: "6px 0 0"
      }}>
        {branch}
      </p>
    </div>
  );
}

export default StudentCard;