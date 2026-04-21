const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
  { id: 1, name: 'Laptop',   price: 55000, category: 'Electronics' },
  { id: 2, name: 'Phone',    price: 15000, category: 'Electronics' },
  { id: 3, name: 'T-Shirt',  price: 499,   category: 'Clothing'    },
  { id: 4, name: 'Rice 5kg', price: 350,   category: 'Grocery'     },
];
let nextId = 5;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head><title>PUT and DELETE</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;background:#f0f4f8;padding:30px}
h1{color:#2d3748;margin-bottom:6px}
p.sub{color:#718096;font-size:14px;margin-bottom:26px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:1000px}
.card{background:white;border-radius:14px;padding:22px;box-shadow:0 4px 14px rgba(0,0,0,0.08)}
h2{font-size:15px;color:#4a5568;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
input,select{width:100%;padding:9px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:13px;margin-bottom:10px;box-sizing:border-box}
button{width:100%;padding:10px;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px}
.btn-blue{background:#667eea;color:white}
.btn-orange{background:#ed8936;color:white}
.btn-red{background:#fc8181;color:white}
table{width:100%;border-collapse:collapse;font-size:13px}
th{background:#667eea;color:white;padding:9px 12px;text-align:left}
td{padding:9px 12px;border-bottom:1px solid #e2e8f0}
tr:hover td{background:#f7fafc}
.full{grid-column:1/-1}
#msg{padding:10px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:13px;display:none;max-width:1000px}
.ok{background:#c6f6d5;color:#276749}
.er{background:#fed7d7;color:#9b2c2c}
</style></head><body>
<h1>Assignment 13 - PUT and DELETE Operations</h1>
<p class="sub">Add, Update and Delete products directly from this page</p>
<div id="msg"></div>
<div class="grid">
  <div class="card">
    <h2>Add Product (POST)</h2>
    <input id="an" placeholder="Product Name">
    <input id="ap" placeholder="Price" type="number">
    <select id="ac">
      <option value="">Select Category</option>
      <option>Electronics</option><option>Clothing</option><option>Grocery</option>
    </select>
    <button class="btn-blue" onclick="addProduct()">Add Product</button>
  </div>
  <div class="card">
    <h2>Update Product (PUT)</h2>
    <input id="ui" placeholder="Product ID" type="number">
    <input id="un" placeholder="New Name (optional)">
    <input id="up" placeholder="New Price (optional)" type="number">
    <button class="btn-orange" onclick="updateProduct()">Update Product</button>
  </div>
  <div class="card">
    <h2>Delete Product (DELETE)</h2>
    <input id="di" placeholder="Product ID to delete" type="number">
    <button class="btn-red" onclick="deleteProduct()">Delete Product</button>
  </div>
  <div class="card full">
    <h2>All Products</h2>
    <table>
      <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Category</th></tr></thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>
</div>
<script>
function showMsg(text, ok) {
  var d = document.getElementById('msg');
  d.textContent = text; d.className = ok ? 'ok' : 'er'; d.style.display = 'block';
  setTimeout(function(){ d.style.display = 'none'; }, 3000);
}
function api(url, method, body, cb) {
  var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  fetch(url, opts).then(function(r){ return r.json(); }).then(cb);
}
function addProduct() {
  var name = document.getElementById('an').value.trim();
  var price = document.getElementById('ap').value;
  var category = document.getElementById('ac').value;
  if (!name || !price || !category) { showMsg('Fill all fields', false); return; }
  api('/products', 'POST', { name: name, price: parseInt(price), category: category }, function(r) {
    showMsg(r.message, r.success);
    document.getElementById('an').value = '';
    document.getElementById('ap').value = '';
    document.getElementById('ac').value = '';
    load();
  });
}
function updateProduct() {
  var id = document.getElementById('ui').value;
  if (!id) { showMsg('Enter ID', false); return; }
  var body = {};
  var n = document.getElementById('un').value.trim();
  var p = document.getElementById('up').value;
  if (n) body.name = n;
  if (p) body.price = parseInt(p);
  api('/products/' + id, 'PUT', body, function(r) { showMsg(r.message, r.success); load(); });
}
function deleteProduct() {
  var id = document.getElementById('di').value;
  if (!id) { showMsg('Enter ID', false); return; }
  api('/products/' + id, 'DELETE', null, function(r) {
    showMsg(r.message, r.success);
    document.getElementById('di').value = '';
    load();
  });
}
function load() {
  api('/products', 'GET', null, function(r) {
    if (!r.data || !r.data.length) {
      document.getElementById('tbody').innerHTML = '<tr><td colspan="4" style="text-align:center;color:#a0aec0">No products</td></tr>';
      return;
    }
    var rows = '';
    for (var i = 0; i < r.data.length; i++) {
      var p = r.data[i];
      rows += '<tr><td>' + p.id + '</td><td>' + p.name + '</td><td>Rs.' + p.price + '</td><td>' + p.category + '</td></tr>';
    }
    document.getElementById('tbody').innerHTML = rows;
  });
}
load();
</script>
</body></html>`);
});

app.get('/products', (req, res) => res.json({ success: true, data: products }));
app.post('/products', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) return res.status(400).json({ success: false, message: 'All fields required' });
  const p = { id: nextId++, name, price, category };
  products.push(p);
  res.status(201).json({ success: true, message: '"' + name + '" added successfully', data: p });
});
app.put('/products/:id', (req, res) => {
  const p = products.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ success: false, message: 'Product not found' });
  const { name, price } = req.body;
  if (name) p.name = name;
  if (price) p.price = price;
  res.json({ success: true, message: 'Product #' + p.id + ' updated successfully', data: p });
});
app.delete('/products/:id', (req, res) => {
  const i = products.findIndex(p => p.id === parseInt(req.params.id));
  if (i === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  const removed = products.splice(i, 1)[0];
  res.json({ success: true, message: '"' + removed.name + '" deleted successfully', data: removed });
});

app.listen(3000, () => console.log('Server at http://localhost:3000'));
