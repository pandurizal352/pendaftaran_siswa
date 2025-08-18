import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-lg font-semibold">SPK PPDB</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name}</span>
        <button onClick={logout} className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">Logout</button>
      </div>
    </header>
  )
}

