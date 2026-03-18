import { useState } from "react";
import StudentCard from "./StudentCard.jsx";
import students from "./students";

function App() {
  const [selected, setSelected] = useState(null);  // hook

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px"
    }}>
      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>
        Student Directory
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "32px" }}>
        Showing {students.length} students
      </p>

      {/* Cards Row */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            roll={student.roll}
            branch={student.branch}
            onClick={() => setSelected(student)}   // pass click handler
          />
        ))}
      </div>

      {/* Detail Panel — only shows when a card is clicked */}
      {selected && (
        <div style={{
          marginTop: "40px",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "32px 40px",
          textAlign: "center",
          width: "300px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "#dbeafe", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px", fontSize: "28px"
          }}>
            👤
          </div>
          <h2 style={{ margin: "0 0 8px", color: "#111827" }}>{selected.name}</h2>
          <p style={{ color: "#6b7280", margin: "0 0 4px" }}>Roll No: {selected.roll}</p>
          <p style={{ color: "#6b7280", margin: "0 0 16px" }}>Branch: {selected.branch}</p>
          <button
            onClick={() => setSelected(null)}    // reset state to null
            style={{
              background: "#2563eb", color: "#fff", border: "none",
              borderRadius: "8px", padding: "8px 24px",
              fontSize: "14px", cursor: "pointer"
            }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;