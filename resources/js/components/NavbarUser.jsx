import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
<div className="navbar py-7 px-20 flex items-center justify-between bg-[#05445E] text-white shadow-md">
  {/* Logo */}
  <div className="logo">
      <h1 className="text-xl font-bold">SMA Budhi Warman II</h1>
  </div>

  {/* Menu */}
  <ul className="menu flex items-center gap-10">
      <li>
          <a href="#" className="hover:text-yellow-300 transition-colors">Beranda</a>
      </li>
      <li>
          <a href="#" className="hover:text-yellow-300 transition-colors">Tentang</a>
      </li>
      <li>
          <a href="#" className="hover:text-yellow-300 transition-colors">Proyek</a>
      </li>
      <li>
          <a href="#" className="hover:text-yellow-300 transition-colors">Kontak</a>
      </li>
      {/* Profil */}
      <li>

          <a href="#">
              <img
                  src="http://127.0.0.1:8000/img/profile.png"
                  alt="Profil"
                  className="w-7 h-7 rounded-full border-2 border-white"
              />
          </a>
      </li>
  </ul>
</div>

  )
}

