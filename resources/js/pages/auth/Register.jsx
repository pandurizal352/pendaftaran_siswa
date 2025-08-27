import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const nav = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user'
  })

  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')
  const [showPass, setShowPass] = useState(false) // 👈 toggle password
  const [showConfirm, setShowConfirm] = useState(false) // 👈 toggle konfirmasi

  const onChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    try {
      const res = await register(form);

      setOk(res.message || "Registrasi berhasil, silakan login");
      setTimeout(() => nav("/login"), 1000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErr("Email telah terdaftar");
      } else {
        setErr("Email telah terdaftar");
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

            {/* Password dengan toggle */}
            <div className="relative">
              <input
                className="w-full rounded border p-2 pr-10"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Konfirmasi Password dengan toggle */}
            <div className="relative ">
              <input
                className="w-full rounded border p-2 pr-10 "
                type={showConfirm ? "text" : "password"}
                placeholder="Konfirmasi Password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={onChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <input type="hidden" name="role" value={form.role} />

            <div className="flex items-center space-x-2 text-sm text-gray-600 ">
              <input type="checkbox" className="h-4 w-4 cursor-pointer" required />
              <span>Saya setuju dengan Syarat & Ketentuan</span>
            </div>

            <button className="w-full rounded bg-[#189AB4] p-2 text-white hover:bg-[#05445E] cursor-pointer">
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
