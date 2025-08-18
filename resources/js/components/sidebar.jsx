import React from 'react'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `block rounded px-3 py-2 hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-semibold' : ''}`

// PILIH SALAH SATU POLA (A atau B) — jangan dicampur

// (A) Default export
export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <nav className="space-y-1">
        <NavLink to="/" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/pendaftaran" className={linkClass}>Pendaftaran Siswa</NavLink>
        <NavLink to="/siswa" className={linkClass}>Data Siswa</NavLink>
      </nav>
    </aside>
  )
}

// (B) Named export (kalau masih error dengan default, pakai ini)
// export function Sidebar() { ... }
