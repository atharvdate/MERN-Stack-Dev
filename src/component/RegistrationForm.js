import { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  backgroundColor: "#fff",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#374151",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "12px",
  marginTop: "4px",
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.gender) newErrors.gender = "Please select a gender.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "", lastName: "", email: "", phone: "",
      password: "", confirmPassword: "", gender: "", dob: "", agree: false,
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "48px 40px", textAlign: "center", maxWidth: "420px", width: "100%", border: "1px solid #e5e7eb" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "22px", fontWeight: "600", color: "#111827", margin: "0 0 8px" }}>Registration Successful!</h2>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 28px" }}>
            Welcome, <strong>{formData.firstName} {formData.lastName}</strong>! Your account has been created.
          </p>
          <button onClick={handleReset} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 28px", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
            Register Another
          </button>
        </div>
      </div>
    );
  }

  const Field = ({ label, name, type = "text", placeholder }) => (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ ...inputStyle, borderColor: errors[name] ? "#dc2626" : "#d1d5db" }}
      />
      {errors[name] && <p style={errorStyle}>{errors[name]}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "40px 36px", maxWidth: "520px", width: "100%" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "22px" }}>👤</div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#111827", margin: "0 0 6px" }}>Create Account</h1>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>Fill in the details below to register</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="First Name" name="firstName" placeholder="John" />
            <Field label="Last Name" name="lastName" placeholder="Doe" />
          </div>

          <Field label="Email Address" name="email" type="email" placeholder="john@example.com" />
          <Field label="Phone Number" name="phone" placeholder="10-digit number" />

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange}
              style={{ ...inputStyle, borderColor: errors.dob ? "#dc2626" : "#d1d5db" }} />
            {errors.dob && <p style={errorStyle}>{errors.dob}</p>}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}
              style={{ ...inputStyle, borderColor: errors.gender ? "#dc2626" : "#d1d5db", color: formData.gender ? "#111827" : "#9ca3af" }}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
            {errors.gender && <p style={errorStyle}>{errors.gender}</p>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Password" name="password" type="password" placeholder="Min. 6 characters" />
            <Field label="Confirm Password" name="confirmPassword" type="password" placeholder="Re-enter password" />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange}
                style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: "#2563eb" }} />
              <span style={{ fontSize: "13px", color: "#374151" }}>
                I agree to the <span style={{ color: "#2563eb", fontWeight: "500" }}>Terms of Service</span> and{" "}
                <span style={{ color: "#2563eb", fontWeight: "500" }}>Privacy Policy</span>
              </span>
            </label>
            {errors.agree && <p style={errorStyle}>{errors.agree}</p>}
          </div>

          <button type="submit"
            style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.3px" }}
            onMouseEnter={e => e.target.style.background = "#1d4ed8"}
            onMouseLeave={e => e.target.style.background = "#2563eb"}>
            Create Account
          </button>

          <button type="button" onClick={handleReset}
            style={{ width: "100%", marginTop: "10px", background: "transparent", color: "#6b7280", border: "1px solid #d1d5db", borderRadius: "8px", padding: "11px", fontSize: "14px", cursor: "pointer" }}>
            Clear Form
          </button>
        </form>
      </div>
    </div>
  );
}