import React from "react";
import Table from "../../components/Table";

export default function Laporan() {
  // Contoh data laporan
  const laporanData = [
    { id: 1, nama: "Ahmad", totalSkor: 0.92, status: "Diterima" },
    { id: 2, nama: "Budi", totalSkor: 0.85, status: "Diterima" },
    { id: 3, nama: "Citra", totalSkor: 0.80, status: "Cadangan" },
    { id: 4, nama: "Dewi", totalSkor: 0.75, status: "Cadangan" },
  ];

  // Kolom tabel
  const laporanColumns = [
    { title: "No", key: "id" },
    { title: "Nama", key: "nama" },
    { title: "Total Skor", key: "totalSkor" },
    { title: "Status", key: "status" },
  ];

  return (
    <div className="space-y-6">
      {/* Judul */}
      <h1 className="text-2xl font-semibold">Laporan Seleksi</h1>
      <p className="text-gray-600">
        Halaman ini menampilkan hasil akhir proses seleksi SPK PPDB.
        Admin dapat melihat daftar siswa yang diterima maupun cadangan,
        serta mengekspor laporan untuk keperluan dokumentasi.
      </p>

      {/* Tabel Laporan */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Ringkasan Hasil Seleksi</h2>
        <Table columns={laporanColumns} data={laporanData} color="blue" />
      </div>

      {/* Statistik Seleksi */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Diterima</h3>
          <p className="text-2xl font-bold text-green-900">2 Siswa</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">Cadangan</h3>
          <p className="text-2xl font-bold text-yellow-900">2 Siswa</p>
        </div>
      </div>

      {/* Fitur Ekspor */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Ekspor Laporan</h2>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Excel
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
