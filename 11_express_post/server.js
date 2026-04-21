const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>POST Form Data</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);
  min-height:100vh;display:flex;justify-content:center;align-items:center;padding:30px}
.wrap{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:820px;width:100%}
.card{background:white;border-radius:16px;padding:30px;box-shadow:0 8px 32px rgba(0,0,0,0.2)}
h2{color:#2d3748;margin-bottom:20px;font-size:18px}
label{display:block;font-size:13px;font-weight:600;color:#4a5568;margin-bottom:5px}
input,select{width:100%;padding:10px 13px;border:2px solid #e2e8f0;border-radius:8px;font-size:14px;margin-bottom:14px;box-sizing:border-box}
button{width:100%;padding:13px;border:none;border-radius:10px;cursor:pointer;
  background:linear-gradient(135deg,#667eea,#764ba2);color:white;font-weight:700;font-size:15px}
pre{background:#1a202c;color:#68d391;padding:20px;border-radius:10px;
  font-size:13px;overflow-x:auto;white-space:pre-wrap;min-height:200px;margin-top:12px}
h3{color:#2d3748;margin-bottom:4px}
</style></head><body>
<div class="wrap">
  <div class="card">
    <h2>Assignment 11 - POST Form Data</h2>
    <label>Full Name</label>
    <input id="name" placeholder="Enter full name">
    <label>Email</label>
    <input id="email" type="email" placeholder="Enter email">
    <label>Course</label>
    <select id="course">
      <option value="">Select course</option>
      <option>MCA</option><option>BCA</option><option>MSc CS</option><option>BTech</option>
    </select>
    <label>Year</label>
    <select id="year">
      <option value="">Select year</option>
      <option>1st Year</option><option>2nd Year</option><option>3rd Year</option>
    </select>
    <button onclick="submitForm()">Submit</button>
  </div>
  <div class="card">
    <h3>JSON Response</h3>
    <pre id="output">Response will appear here after submit...</pre>
  </div>
</div>
<script>
function submitForm() {
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var course = document.getElementById('course').value;
  var year = document.getElementById('year').value;
  if (!name || !email || !course || !year) {
    document.getElementById('output').textContent = 'Please fill all fields.';
    return;
  }
  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, course: course, year: year })
  }).then(function(r){ return r.json(); }).then(function(data) {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  });
}
</script>
</body></html>`);
});

app.post('/submit', (req, res) => {
  const { name, email, course, year } = req.body;
  res.json({
    status: 'success',
    message: 'Form data received successfully',
    data: { name, email, course, year },
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, () => console.log('Server at http://localhost:3000'));
