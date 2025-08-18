// contexts/AuthContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { getProfile, loginRequest, registerRequest, logoutRequest } from '../services/authService'
import { DEV_MODE } from '../utils/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
          const me = await getProfile(token)
          setUser(me)
        }
      } catch (e) {
        localStorage.removeItem('token')
        setToken(null)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [token])

  const login = async (payload) => {
    if (DEV_MODE) {
      setToken("dev-token")
      setUser({ id: 1, name: payload.email, role: "admin" })
      return
    }
    const { token: tkn, user: me } = await loginRequest(payload)
    localStorage.setItem('token', tkn)
    setToken(tkn)
    setUser(me)
  }

  const register = async (payload) => {
    if (DEV_MODE) return { message: "Register bypassed in DEV mode" }
    return await registerRequest(payload)
  }

  const logout = async () => {
    if (DEV_MODE) {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      return
    }
    try { await logoutRequest(token) } catch (_) {}
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
