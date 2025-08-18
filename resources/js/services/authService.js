import { DEV_MODE } from '../utils/config'
import { api } from './api'

export async function loginRequest({ email, password }) {
  if (DEV_MODE) return { token: "dev-token", user: { id: 1, name: email, role: "admin" } }
  return api.post('/api/login', { email, password })
}

export async function registerRequest(payload) {
  if (DEV_MODE) return { message: "Register bypassed in DEV mode" }
  return api.post('/api/register', payload)
}

export async function getProfile(token) {
  if (DEV_MODE) return { id: 1, name: "Developer", role: "admin" }
  return api.get('/api/user', { headers: { Authorization: `Bearer ${token}` } })
}

export async function logoutRequest(token) {
  if (DEV_MODE) return { message: "Logout bypassed in DEV mode" }
  return api.post('/api/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
}
