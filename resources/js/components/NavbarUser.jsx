import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Matikan scroll saat menu terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  // Pantau perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false) // otomatis tutup di layar besar
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled
          ? "bg-[#05445E]/95  shadow-lg"
          : "bg-[#05445E]"}
        text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              src="http://127.0.0.1:8000/img/Logo_Sekolah.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-lg sm:text-xl font-bold ml-2">
              SMA Budhi Warman II
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <a href="/#beranda" className="hover:text-[#189AB4] transition-colors">Beranda</a>
            <a href="/#tentang" className="hover:text-[#189AB4] transition-colors">Tentang</a>
            <a href="/#proyek" className="hover:text-[#189AB4] transition-colors">Proyek</a>
            <a href="/#kontak" className="hover:text-[#189AB4] transition-colors">Kontak</a>

            {/* Register & Login */}
            <div className="flex items-center gap-3 ml-4">
              <a
                href="http://127.0.0.1:8000/register"
                className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#05445E] transition"
              >
                Register
              </a>
              <a
                href="http://127.0.0.1:8000/login"
                className="px-4 py-2 bg-[#189AB4] text-white rounded-md hover:bg-[#75E6DA] transition hover:text-[#05445E]"
              >
                Login
              </a>
            </div>
          </div>

          {/* Hamburger Button (Mobile) */}
          <div className="lg:hidden flex items-center">
            {!isOpen && (
              <button onClick={() => setIsOpen(true)}>
                <Menu className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50">
          <div
            className="
              bg-white
              w-full
              rounded-lg shadow-lg p-4
              mt-16 mb-6
              mx-[10px]
              max-w-full
              relative text-black overflow-y-auto
              border-l-4 border-[#05445E]
            "
          >
            {/* Tombol Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Menu items */}
            <div className="flex flex-col space-y-2 mt-5">
              <a
                href="/#beranda"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition"
              >
                Dashboard
              </a>
              <a
                href="/#tentang"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition"
              >
                Team
              </a>
              <a
                href="/#proyek"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition"
              >
                Projects
              </a>
              <a
                href="/#kontak"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition"
              >
                Calendar
              </a>
              <div className="border-t border-black-400 my-4"></div>
              {/* Tambahan: Login dan Register */}
              <a
                href="http://127.0.0.1:8000/login"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-green-600 hover:text-white transition"
              >
                Login
              </a>
              <a
                href="http://127.0.0.1:8000/register"
                onClick={handleClose}
                className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
