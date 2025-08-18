import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p>Halaman tidak ditemukan</p>
      <Link to="/" className="text-blue-600">Kembali ke Dashboard</Link>
    </div>
  )
}
