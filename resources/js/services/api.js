const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

async function request(path, { method = 'GET', token, body, isForm } = {}) {
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isForm) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include', // aman untuk Sanctum (opsional)
  })

  if (!res.ok) {
    let msg = 'Request gagal'
    try { const j = await res.json(); msg = j.message || msg } catch (_) {}
    throw new Error(msg)
  }

  // Beberapa endpoint mungkin kosong (204)
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  get: (path, token) => request(path, { method: 'GET', token }),
  post: (path, body, token, isForm = false) => request(path, { method: 'POST', body, token, isForm }),
  del: (path, token) => request(path, { method: 'DELETE', token }),

  baseURL: "http://127.0.0.1:8000", // alamat backend Laravel
  withCredentials: true, // penting untuk Sanctum
}



