import React, { useState } from "react";
import Table from "../../components/Table";

export default function Kriteria() {
  const [kriteria, setKriteria] = useState([
    { id: 1, nama: "Nilai Rapor", bobot: 30, tingkat: "Tinggi" },
    { id: 2, nama: "Prestasi", bobot: 20, tingkat: "Sedang" },
    { id: 3, nama: "Tes Akademik", bobot: 25, tingkat: "Tinggi" },
    { id: 4, nama: "Domisili/Jarak", bobot: 15, tingkat: "Rendah" },
    { id: 5, nama: "Metode Integrasi", bobot: 10, tingkat: "Tinggi" },
  ]);

  const [hasilSPK, setHasilSPK] = useState([]);

  const siswa = [
    { id: 1, nama: "Budi", nilai: { nilairapor: 80, prestasi: 70, tesakademik: 90, domisilijarak: 5, metodeintegrasi: 80 } },
    { id: 2, nama: "Siti", nilai: { nilairapor: 90, prestasi: 80, tesakademik: 85, domisilijarak: 10, metodeintegrasi: 90 } },
    { id: 3, nama: "Ahmad", nilai: { nilairapor: 70, prestasi: 60, tesakademik: 80, domisilijarak: 3, metodeintegrasi: 70 } },
  ];

  const handleBobotChange = (id, value) => {
    setKriteria(prev => prev.map(k => k.id === id ? { ...k, bobot: Number(value) } : k));
  };

  const handleTingkatChange = (id, value) => {
    setKriteria(prev => prev.map(k => k.id === id ? { ...k, tingkat: value } : k));
  };

  // Fungsi SAW
  const hitungSAW = () => {
    const siswaNorm = siswa.map(s => {
      const nilaiNorm = {};
      kriteria.forEach(k => {
        const key = k.nama.toLowerCase().replace(/\s/g, "");
        if (k.tingkat === "Tinggi") {
          const max = Math.max(...siswa.map(a => a.nilai[key]));
          nilaiNorm[key] = s.nilai[key] / max;
        } else {
          const min = Math.min(...siswa.map(a => a.nilai[key]));
          nilaiNorm[key] = min / s.nilai[key];
        }
      });
      return { ...s, nilaiNorm };
    });

    const hasil = siswaNorm.map(s => {
      let skor = 0;
      kriteria.forEach(k => {
        const key = k.nama.toLowerCase().replace(/\s/g, "");
        skor += s.nilaiNorm[key] * (k.bobot / 100);
      });
      return { ...s, skor };
    });

    setHasilSPK(hasil.sort((a, b) => b.skor - a.skor));
  };

  // Kolom untuk tabel kriteria
  const kriteriaColumns = [
    { key: "no", title: "No", render: (_, __, idx) => idx + 1 },
    { key: "nama", title: "Kriteria" },
    {
      key: "bobot",
      title: "Bobot (%)",
      render: (val, row) => (
        <input
          type="number"
          value={val}
          onChange={e => handleBobotChange(row.id, e.target.value)}
          className="w-20 px-2 py-1 border rounded text-sm"
        />
      ),
    },
    {
      key: "tingkat",
      title: "Tingkat",
      render: (val, row) => (
        <select
          value={val}
          onChange={e => handleTingkatChange(row.id, e.target.value)}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value="Tinggi">Tinggi</option>
          <option value="Sedang">Sedang</option>
          <option value="Rendah">Rendah</option>
        </select>
      ),
    },
  ];

  // Kolom untuk tabel hasil SPK
  const hasilColumns = [
    { key: "peringkat", title: "Peringkat", render: (_, __, idx) => idx + 1 },
    { key: "nama", title: "Nama Siswa" },
    { key: "skor", title: "Skor", render: val => val.toFixed(3) },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Atur Kriteria & Bobot SPK</h1>
      <p className="text-gray-600 mb-6">
        Sesuaikan bobot dan tingkat masing-masing kriteria untuk metode SAW
      </p>

      <Table columns={kriteriaColumns} data={kriteria} color="blue" />

      <div className="mt-4 flex justify-end">
        <button
          onClick={hitungSAW}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-green-600"
        >
          Hitung SPK
        </button>
      </div>

      {hasilSPK.length > 0 && (
        <Table columns={hasilColumns} data={hasilSPK} color="green" />
      )}
    </div>
  );
}
