const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', age: 22 },
  { id: 2, name: 'Priya Patel',  email: 'priya@example.com', age: 21 },
  { id: 3, name: 'Amit Verma',   email: 'amit@example.com',  age: 23 },
];
let nextId = 4;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>User CRUD</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f0f4f8;padding:30px}
h1{color:#2d3748;margin-bottom:6px}
p.sub{color:#718096;margin-bottom:28px;font-size:14px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px}
.card{background:white;border-radius:14px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.08)}
h2{color:#4a5568;font-size:16px;margin-bottom:16px;border-bottom:2px solid #e2e8f0;padding-bottom:8px}
input{width:100%;padding:9px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:13px;margin-bottom:10px;box-sizing:border-box}
button{padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;width:100%;margin-bottom:6px}
.btn-blue{background:#667eea;color:white}
.btn-green{background:#48bb78;color:white}
.btn-red{background:#fc8181;color:white}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#667eea;color:white;padding:10px 12px;text-align:left}
td{padding:9px 12px;border-bottom:1px solid #e2e8f0}
tr:hover td{background:#f7fafc}
.full{grid-column:1/-1}
#msg{padding:10px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:13px;display:none;max-width:900px}
.ok{background:#c6f6d5;color:#276749}
.er{background:#fed7d7;color:#9b2c2c}
</style></head><body>
<h1>Assignment 10 - User CRUD API</h1>
<p class="sub">Create, Read, Update and Delete users from this page</p>
<div id="msg"></div>
<div class="grid">
  <div class="card">
    <h2>Add User</h2>
    <input id="an" placeholder="Full Name">
    <input id="ae" placeholder="Email Address" type="email">
    <input id="aa" placeholder="Age" type="number">
    <button class="btn-blue" onclick="addUser()">Add User</button>
  </div>
  <div class="card">
    <h2>Update User</h2>
    <input id="ui" placeholder="User ID to update" type="number">
    <input id="un" placeholder="New Name (optional)">
    <input id="ue" placeholder="New Email (optional)">
    <button class="btn-green" onclick="updateUser()">Update User</button>
    <h2 style="margin-top:14px">Delete User</h2>
    <input id="di" placeholder="User ID to delete" type="number">
    <button class="btn-red" onclick="deleteUser()">Delete User</button>
  </div>
  <div class="card full">
    <h2>All Users</h2>
    <table>
      <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th></tr></thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>
</div>
<script>
function showMsg(text, ok) {
  var d = document.getElementById('msg');
  d.textContent = text;
  d.className = ok ? 'ok' : 'er';
  d.style.display = 'block';
  setTimeout(function(){ d.style.display = 'none'; }, 3000);
}
function doFetch(url, method, body, cb) {
  var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  fetch(url, opts).then(function(r){ return r.json(); }).then(cb);
}
function addUser() {
  var name = document.getElementById('an').value.trim();
  var email = document.getElementById('ae').value.trim();
  var age = document.getElementById('aa').value.trim();
  if (!name || !email) { showMsg('Name and email required', false); return; }
  doFetch('/users', 'POST', { name: name, email: email, age: parseInt(age) || 0 }, function(r) {
    showMsg(r.message || 'Done', r.success);
    document.getElementById('an').value = '';
    document.getElementById('ae').value = '';
    document.getElementById('aa').value = '';
    loadUsers();
  });
}
function updateUser() {
  var id = document.getElementById('ui').value.trim();
  var name = document.getElementById('un').value.trim();
  var email = document.getElementById('ue').value.trim();
  if (!id) { showMsg('Enter user ID', false); return; }
  var body = {};
  if (name) body.name = name;
  if (email) body.email = email;
  doFetch('/users/' + id, 'PUT', body, function(r) {
    showMsg(r.message || 'Done', r.success);
    loadUsers();
  });
}
function deleteUser() {
  var id = document.getElementById('di').value.trim();
  if (!id) { showMsg('Enter user ID', false); return; }
  doFetch('/users/' + id, 'DELETE', null, function(r) {
    showMsg(r.message || 'Done', r.success);
    document.getElementById('di').value = '';
    loadUsers();
  });
}
function loadUsers() {
  doFetch('/users', 'GET', null, function(r) {
    var tbody = document.getElementById('tbody');
    if (!r.data || r.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#a0aec0">No users found</td></tr>';
      return;
    }
    var rows = '';
    for (var i = 0; i < r.data.length; i++) {
      var u = r.data[i];
      rows += '<tr><td>' + u.id + '</td><td>' + u.name + '</td><td>' + u.email + '</td><td>' + u.age + '</td></tr>';
    }
    tbody.innerHTML = rows;
  });
}
loadUsers();
</script>
</body></html>`);
});

app.get('/users', (req, res) => res.json({ success: true, count: users.length, data: users }));
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json({ success: true, data: user }) : res.status(404).json({ success: false, message: 'User not found' });
});
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' });
  const newUser = { id: nextId++, name, email, age };
  users.push(newUser);
  res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
});
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const { name, email, age } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (age) user.age = age;
  res.json({ success: true, message: 'User updated successfully', data: user });
});
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  const removed = users.splice(index, 1)[0];
  res.json({ success: true, message: 'User deleted successfully', data: removed });
});

app.listen(3000, () => console.log('Server at http://localhost:3000'));
