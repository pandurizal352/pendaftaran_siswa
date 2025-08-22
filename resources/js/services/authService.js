import { api } from './api'

// LOGIN
export async function loginRequest({ email, password }) {
  try {
    // wajib ambil CSRF cookie dulu
    await api.get('/sanctum/csrf-cookie')

    // lalu login (cookies otomatis tersimpan karena credentials: 'include')
    return await api.post('/api/login', { email, password })
  } catch (err) {
    throw err
  }
}

// REGISTER
export async function registerRequest(payload) {
  try {
    return await api.post('/api/users', payload)
  } catch (err) {
    throw err
  }
}

// GET PROFILE (cek user dari sanctum cookie)
export async function getProfile() {
  return api.get('/api/user')
}

// LOGOUT
export async function logoutRequest() {
  return api.post('/api/logout')
}
