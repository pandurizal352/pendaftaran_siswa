import React, { useState } from "react";
import Table from "../../components/Table";

export default function PengaturanSistem() {
  const [notifikasi, setNotifikasi] = useState(true);

  // Dummy data bobot kriteria
  const kriteriaData = [
    { id: 1, kriteria: "Nilai Rapor", bobot: 30 },
    { id: 2, kriteria: "Prestasi Akademik", bobot: 20 },
    { id: 3, kriteria: "Tes Tulis", bobot: 25 },
    { id: 4, kriteria: "Wawancara", bobot: 25 },
  ];

  // Kolom untuk Table
  const kriteriaColumns = [
    { title: "ID", key: "id" },
    { title: "Kriteria", key: "kriteria" },
    { title: "Bobot (%)", key: "bobot" },
  ];

  return (
    <div className="space-y-6">
      {/* Judul */}
      <h1 className="text-2xl font-semibold">Pengaturan Sistem</h1>
      <p className="text-gray-600">
        Halaman ini digunakan untuk mengatur sistem seleksi SPK PPDB,
        mulai dari bobot kriteria, jadwal pendaftaran, kuota,
        hingga pengaturan notifikasi dan backup data.
      </p>

      {/* Tabel Kriteria */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Bobot Kriteria Seleksi</h2>
        <Table columns={kriteriaColumns} data={kriteriaData} color="blue" />
      </div>

      {/* Jadwal */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Pengaturan Jadwal</h2>
        <p className="text-gray-600">Atur jadwal pendaftaran siswa baru.</p>
        <div className="flex gap-4 mt-2">
          <input
            type="date"
            className="border rounded p-2"
            defaultValue="2025-09-01"
          />
          <input
            type="date"
            className="border rounded p-2"
            defaultValue="2025-09-30"
          />
        </div>
      </div>

      {/* Kuota */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Pengaturan Kuota</h2>
        <input
          type="number"
          defaultValue={100}
          className="border rounded p-2"
        />
        <span className="ml-2 text-gray-600">siswa</span>
      </div>

      {/* Notifikasi */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Pengaturan Notifikasi</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifikasi}
            onChange={() => setNotifikasi(!notifikasi)}
          />
          <span>Aktifkan notifikasi ke peserta</span>
        </label>
      </div>

      {/* Backup Data */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Backup Data</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Export ke Excel
        </button>
      </div>
    </div>
  );
}
