import React from 'react'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Total Pendaftar</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Lulus Seleksi</div>
          <div className="text-2xl font-bold">—</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow">
          <div className="text-sm text-gray-500">Ditolak</div>
          <div className="text-2xl font-bold">—</div>
        </div>
      </div>
    </div>
  )
}
