// contexts/AuthContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { getProfile, loginRequest, registerRequest, logoutRequest } from '../services/authService'
import { DEV_MODE } from '../utils/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // INIT USER
  useEffect(() => {
    async function init() {
      if (DEV_MODE) {
        setUser({ id: 1, name: "Developer", role: "admin" })
        setToken("dev-token")
        setLoading(false)
        return
      }

      try {
        if (token) {
          const { data } = await getProfile()
          setUser(data)
        }
      } catch (_) {
        localStorage.removeItem('token')
        setToken(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [token])

  // LOGIN
  const login = async (payload) => {
    if (DEV_MODE) {
      setUser({ id: 1, name: payload.email, role: "admin" })
      setToken("dev-token")
      localStorage.setItem("token", "dev-token")
      return
    }

    const res = await loginRequest(payload)
    if (res.status !== 200) throw new Error(res.data?.message || "Login gagal")

    // setelah login, ambil profile
    const { data: me } = await getProfile()
    setUser(me)
    setToken("session")
    localStorage.setItem("token", "session")
  }

  // REGISTER
  const register = async (payload) => {
    if (DEV_MODE) return { message: "Register bypassed in DEV mode" }
    const res = await registerRequest(payload)
    if (!res || res.status >= 400) {
      throw new Error(res.data?.message || "Register gagal")
    }
    return res.data
  }

  // LOGOUT
  const logout = async () => {
    if (DEV_MODE) {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      return
    }
    try {
      await logoutRequest()
    } catch (_) {}
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ token, user, loading, isAuthenticated: !!token, login, register, logout }),
    [token, user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
