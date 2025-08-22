import React from "react";
import Table from "../../components/Table";

export default function Perhitungan() {
  // Contoh kriteria dengan bobot
  const kriteria = [
    { id: 1, nama: "Nilai Rapor", bobot: 0.4 },
    { id: 2, nama: "Prestasi Akademik", bobot: 0.3 },
    { id: 3, nama: "Prestasi Non-Akademik", bobot: 0.2 },
    { id: 4, nama: "Absensi", bobot: 0.1 },
  ];

  // Contoh data alternatif siswa
  const alternatif = [
    { id: 1, nama: "Ahmad", skor: { 1: 85, 2: 90, 3: 75, 4: 95 } },
    { id: 2, nama: "Budi", skor: { 1: 78, 2: 80, 3: 85, 4: 88 } },
    { id: 3, nama: "Citra", skor: { 1: 92, 2: 95, 3: 80, 4: 90 } },
  ];

  // Normalisasi & hitung total skor berdasarkan bobot
  const normalisasi = alternatif.map((a) => {
    let total = 0;
    kriteria.forEach((k) => {
      const maxK = Math.max(...alternatif.map((al) => al.skor[k.id]));
      total += (a.skor[k.id] / maxK) * k.bobot;
    });
    return { ...a, totalSkor: parseFloat(total.toFixed(3)) };
  });

  // Ranking
  const ranking = [...normalisasi].sort((a, b) => b.totalSkor - a.totalSkor);

  // Kuota diterima
  const kuota = 2;
  const diterima = ranking.slice(0, kuota);
  const cadangan = ranking.slice(kuota);

  // Kolom untuk tabel detail perhitungan
  const columns = [
    { title: "Nama Siswa", key: "nama" },
    ...kriteria.map((k) => ({
      title: k.nama,
      key: `skor${k.id}`,
      render: (_, row) => row.skor[k.id],
    })),
    { title: "Total Skor", key: "totalSkor" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Perhitungan dan Hasil Seleksi</h1>
      <p className="text-gray-600">
        Halaman ini digunakan untuk menghitung hasil seleksi siswa baru dengan
        metode <span className="font-medium">Sistem Pendukung Keputusan (SPK)</span>.
        Setiap kriteria (Nilai Rapor, Prestasi Akademik, Non-Akademik, dan Absensi)
        memiliki bobot tertentu. Nilai siswa dinormalisasi, dihitung total skor,
        kemudian diperingkatkan sesuai hasil terbaik hingga kuota penerimaan terpenuhi.
      </p>

      {/* Bobot Kriteria */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Bobot Kriteria</h2>
        <Table
          columns={[
            { title: "Kriteria", key: "nama" },
            { title: "Bobot", key: "bobot" },
          ]}
          data={kriteria}
          color="blue"
        />
      </div>

      {/* Detail Perhitungan */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Detail Perhitungan Normalisasi</h2>
        <Table columns={columns} data={normalisasi} color="blue" />
      </div>

      {/* Ranking Siswa */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Ranking Akhir</h2>
        <Table
          columns={[
            { title: "Ranking", key: "ranking", render: (_, row, idx) => idx + 1 },
            { title: "Nama", key: "nama" },
            { title: "Total Skor", key: "totalSkor" },
          ]}
          data={ranking}
          color="green"
        />
      </div>

      {/* Siswa Diterima */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-green-600">Siswa Diterima</h2>
        <Table
          columns={[
            { title: "Nama", key: "nama" },
            { title: "Total Skor", key: "totalSkor" },
          ]}
          data={diterima}
          color="green"
        />
      </div>

      {/* Siswa Cadangan */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-yellow-600">Siswa Cadangan</h2>
        <Table
          columns={[
            { title: "Nama", key: "nama" },
            { title: "Total Skor", key: "totalSkor" },
          ]}
          data={cadangan}
          color="blue"
        />
      </div>

      {/* Fitur tambahan */}
      <div className="flex space-x-3">
        <button
          onClick={() => alert("Export hasil seleksi ke Excel")}
          className="rounded-lg bg-[#189AB4] px-4 py-2 text-white shadow hover:bg-[#107285]"
        >
          📊 Export Excel
        </button>
        <button
          onClick={() => alert("Cetak hasil seleksi")}
          className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
        >
          🖨️ Cetak
        </button>
      </div>
    </div>
  );
}
