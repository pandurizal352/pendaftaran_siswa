import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', role: 'user' })
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setOk('')
    try {
      console.log("Form Data:", form)
      await register(form)
      setOk('Registrasi berhasil. Silakan login.')
      setTimeout(() => nav('/login'), 800)
    } catch (e) {
      setErr(e.message || 'Register gagal')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-6 overflow-hidden">

     {/* Background watermark */}
      {/* <div className="absolute inset-0 rotate-[50deg]">
        <div className="grid grid-cols-5 gap-12 opacity-20 text-gray-300 text-4xl font-bold w-full h-full">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              SMA Budhi Warman 2
            </div>
          ))}
        </div>
      </div> */}



      {/* Konten utama */}
      <div className="relative flex w-full max-w-4xl rounded-3xl bg-rose-100 shadow-lg overflow-hidden">

        {/* Kolom kiri - gambar */}
        <div className="flex w-1/2 items-center justify-center bg-gray-200">
         <img
            src="http://127.0.0.1:8000/img/cover.png"
            alt="Gambar Sekolah"
            className="w-full h-full object-contain object-center"
            />

          {/* <span className="text-gray-700 font-medium">Gambar Sekolah</span> */}
        </div>


        {/* Kolom kanan - form */}
        <div className="w-1/2 p-8 bg-white/80">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">Daftar</h1>

          {err && <div className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">{err}</div>}
          {ok && <div className="mb-3 rounded bg-green-50 p-2 text-sm text-green-700">{ok}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              className="w-full rounded border p-2"
              placeholder="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              className="w-full rounded border p-2"
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
            />
            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Konfirmasi Password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
              required
            />

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4" required />
              <span>Saya setuju dengan Syarat & Ketentuan</span>
            </div>

            <button className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
                {/* w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-60 */}
              Daftar
            </button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
