const express = require('express');
const app = express();
const logs = [];

app.use(function(req, res, next) {
  var entry = {
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    start: Date.now(),
  };
  res.on('finish', function() {
    entry.status = res.statusCode;
    entry.ms = Date.now() - entry.start;
    logs.unshift(entry);
    if (logs.length > 50) logs.pop();
    console.log('[' + entry.timestamp + '] ' + entry.method + ' ' + entry.url + ' -> ' + entry.status + ' (' + entry.ms + 'ms)');
  });
  next();
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>Middleware Logger</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#0f172a;color:#e2e8f0;padding:30px}
h1{margin-bottom:6px;color:#a5f3fc}
p.sub{color:#64748b;font-size:14px;margin-bottom:24px}
.btns{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
button{padding:10px 22px;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px}
.b1{background:#667eea;color:white}.b2{background:#48bb78;color:white}
.b3{background:#f6ad55;color:#1a202c}.b4{background:#fc8181;color:white}.b5{background:#b794f4;color:white}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#1e293b;color:#94a3b8;padding:10px 14px;text-align:left;font-size:12px;letter-spacing:1px}
td{padding:10px 14px;border-bottom:1px solid #1e293b;font-family:monospace}
tr:hover td{background:#1e293b}
.GET{color:#68d391}.POST{color:#63b3ed}.PUT{color:#f6ad55}.DELETE{color:#fc8181}
#count{font-size:13px;color:#64748b;margin-bottom:10px}
</style></head><body>
<h1>Assignment 12 - Middleware Logger</h1>
<p class="sub">Click buttons to send requests - watch the log table fill up in real time</p>
<div class="btns">
  <button class="b1" onclick="hit('/users')">GET /users</button>
  <button class="b2" onclick="hit('/about')">GET /about</button>
  <button class="b3" onclick="hit('/products')">GET /products</button>
  <button class="b4" onclick="hit('/contact')">GET /contact</button>
  <button class="b5" onclick="hit('/unknown')">GET /unknown (404)</button>
</div>
<div id="count">Requests logged: 0</div>
<table>
  <thead><tr><th>TIME</th><th>METHOD</th><th>URL</th><th>STATUS</th><th>MS</th></tr></thead>
  <tbody id="tbody">
    <tr><td colspan="5" style="text-align:center;color:#475569;padding:20px">Click a button above to generate requests...</td></tr>
  </tbody>
</table>
<script>
function hit(url) {
  fetch(url).then(function() { loadLogs(); });
}
function loadLogs() {
  fetch('/logs').then(function(r){ return r.json(); }).then(function(data) {
    document.getElementById('count').textContent = 'Requests logged: ' + data.length;
    if (!data.length) return;
    var rows = '';
    for (var i = 0; i < data.length; i++) {
      var l = data[i];
      rows += '<tr><td>' + l.time + '</td><td class="' + l.method + '">' + l.method + '</td><td>' + l.url + '</td><td>' + l.status + '</td><td>' + l.ms + 'ms</td></tr>';
    }
    document.getElementById('tbody').innerHTML = rows;
  });
}
setInterval(loadLogs, 2000);
</script>
</body></html>`);
});

app.get('/logs',     (req, res) => res.json(logs.filter(function(l){ return l.url !== '/logs'; })));
app.get('/users',    (req, res) => res.json({ page: 'users',    data: ['Rahul', 'Priya', 'Amit'] }));
app.get('/about',    (req, res) => res.json({ page: 'about',    message: 'About Us' }));
app.get('/products', (req, res) => res.json({ page: 'products', data: ['Laptop', 'Phone', 'Tablet'] }));
app.get('/contact',  (req, res) => res.json({ page: 'contact',  email: 'info@example.com' }));

app.listen(3000, () => console.log('Server at http://localhost:3000'));
