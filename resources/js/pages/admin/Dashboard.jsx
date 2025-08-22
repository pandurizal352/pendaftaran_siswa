import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#189AB4", "#05445E", "#07677F", "#43C6DB"];

export default function Dashboard() {
  const jalurData = [
    { nama_jalur: "Reguler", jumlah: 220 },
    { nama_jalur: "Prestasi", jumlah: 80 },
    { nama_jalur: "Afirmasi", jumlah: 50 },
    { nama_jalur: "Zonasi", jumlah: 50 }
  ];

  const rataNilaiData = [
    { nama_jalur: "Reguler", rata: 78 },
    { nama_jalur: "Prestasi", rata: 85 },
    { nama_jalur: "Afirmasi", rata: 70 },
    { nama_jalur: "Zonasi", rata: 75 }
  ];

  const statusData = [
    { status: "Diterima", jumlah: 300 },
    { status: "Ditolak", jumlah: 70 },
    { status: "Menunggu", jumlah: 30 }
  ];

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-semibold">Dashboard SPK</h1>

      {/* Grafik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Jumlah siswa per jalur */}
        <div className="rounded-lg border bg-white p-6 shadow h-80">
          <h2 className="text-lg font-semibold">Jumlah Siswa per Jalur</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={jalurData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nama_jalur" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#189AB4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rata-rata nilai per jalur */}
        <div className="rounded-lg border bg-white p-6 shadow h-80">
          <h2 className="text-lg font-semibold">Rata-rata Nilai per Jalur</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={rataNilaiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nama_jalur" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rata" fill="#07677F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Pendaftaran + Box Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Kiri - Chart */}
        <div className="rounded-lg border bg-white p-4 shadow h-[400px]">
          <h2 className="text-lg font-semibold">Status Pendaftaran</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="jumlah"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Kanan - Box Statistik Vertikal */}
        <div className="flex flex-col justify-between gap-4">
          <div className="rounded-lg border bg-white p-4 shadow">
            <div className="text-sm text-gray-500">Total Alternatif</div>
            <div className="text-2xl font-bold">150 Pendaftar</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow">
            <div className="text-sm text-gray-500">Kriteria</div>
            <div className="text-2xl font-bold">4</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow">
            <div className="text-sm text-gray-500">Data Penilaian</div>
            <div className="text-2xl font-bold">120</div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow">
            <div className="text-sm text-gray-500">Rekomendasi Teratas</div>
            <div className="text-2xl font-bold">Citra</div>
          </div>
        </div>
      </div>

      {/* Tabel Ringkasan */}
      <div className="rounded-lg border bg-white p-6 shadow w-full">
        <h2 className="text-lg font-semibold mb-4">Ringkasan Hasil SPK</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Alternatif</th>
                <th className="px-4 py-2 border">Nilai</th>
                <th className="px-4 py-2 border">Ranking</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">—</td>
                <td className="px-4 py-2 border">—</td>
                <td className="px-4 py-2 border">—</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">2</td>
                <td className="px-4 py-2 border">—</td>
                <td className="px-4 py-2 border">—</td>
                <td className="px-4 py-2 border">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Tambahan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        <div className="rounded-lg border bg-white p-4 shadow">
          <h3 className="font-medium mb-2">Notifikasi</h3>
          <p className="text-sm text-gray-500">Tidak ada notifikasi terbaru.</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow">
          <h3 className="font-medium mb-2">Aktivitas Sistem</h3>
          <p className="text-sm text-gray-500">Belum ada aktivitas terbaru.</p>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow">
          <h3 className="font-medium mb-2">Catatan Admin</h3>
          <p className="text-sm text-gray-500">—</p>
        </div>
      </div>
    </div>
  )
}
