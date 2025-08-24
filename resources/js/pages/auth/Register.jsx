import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const nav = useNavigate()
  const { register } = useAuth()

  // gunakan "username" agar sesuai dengan backend
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
     password_confirmation: '', // tambahkan ini biar konsisten
    role: 'user'
  })

  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')

  const onChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

const onSubmit = async (e) => {
  e.preventDefault();
  setErr("");
  setOk("");

  try {
    const res = await register(form); // panggil fungsi register

    // Jika berhasil
    setOk(res.message || "Registrasi berhasil, silakan login");
    setTimeout(() => nav("/login"), 1000);

  } catch (error) {
    // Tangani semua error duplikat email tanpa menampilkan error backend
    if (error.response && error.response.status === 409) {
      setErr("Email telah terdaftar"); // override pesan error
    } else {
      setErr("Email telah terdaftar"); // pesan generic untuk error lain
    }
  }
};

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-6 overflow-hidden">
      <div className="relative flex w/full max-w-4xl rounded-3xl bg-rose-100 shadow-lg overflow-hidden">
        <div className="flex w-1/2 items-center justify-center bg-gray-200">
          <img
            src="http://127.0.0.1:8000/img/cover.png"
            alt="Gambar Sekolah"
            className="w-full h-full object-contain object-center"
          />
        </div>

        <div className="w-1/2 p-8 bg-white/80">
          <h1 className="mb-4 text-2xl font-semibold text-gray-700">Daftar</h1>

          {err && <div className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">{err}</div>}
          {ok && <div className="mb-3 rounded bg-green-50 p-2 text-sm text-green-700">{ok}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              className="w-full rounded border p-2"
              placeholder="Username / Nama Lengkap"
              name="username"
              value={form.username}
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
            {/* optional: kalau backend pakai 'confirmed' */}
            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Konfirmasi Password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
            />

            {/* Role (hidden default user) atau jadikan select */}
            <input type="hidden" name="role" value={form.role} />

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4" required />
              <span>Saya setuju dengan Syarat & Ketentuan</span>
            </div>

            <button className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
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
