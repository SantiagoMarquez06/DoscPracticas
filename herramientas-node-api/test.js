async function run() {
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@admin.com', password: 'admin' })
  });
  const token = (await loginRes.json()).accessToken;

  const putRes = await fetch('http://localhost:3000/api/productos/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ nombre: 'Test Update', precio: null, stock: 5 })
  });
  
  console.log(putRes.status);
  const data = await putRes.text();
  console.log(data);
}
run();
