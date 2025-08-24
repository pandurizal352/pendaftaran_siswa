import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

export default function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const [hasilSPK, setHasilSPK] = useState([]);

  const siswa = [
    { id: 1, nama: "Budi", nilai: { nilairapor: 80, prestasi: 70, tesakademik: 90, domisilijarak: 5, metodeintegrasi: 80 } },
    { id: 2, nama: "Siti", nilai: { nilairapor: 90, prestasi: 80, tesakademik: 85, domisilijarak: 10, metodeintegrasi: 90 } },
    { id: 3, nama: "Ahmad", nilai: { nilairapor: 70, prestasi: 60, tesakademik: 80, domisilijarak: 3, metodeintegrasi: 70 } },
  ];

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jalur-pendaftaran") // sesuaikan endpoint
      .then(res => {
        const data = res.data.map(j => ({
          id: j.jalur_id,
          nama_jalur: j.nama_jalur,
          bobot: 0,
          tingkat: "Tinggi"
        }));
        setKriteria(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleBobotChange = (id, value) => {
    setKriteria(prev => prev.map(k => k.id === id ? { ...k, bobot: Number(value) } : k));
  };

  const handleTingkatChange = (id, value) => {
    setKriteria(prev => prev.map(k => k.id === id ? { ...k, tingkat: value } : k));
  };

const hitungSAW = () => {
  const siswaNorm = siswa.map(s => {
    const nilaiNorm = {};
    kriteria.forEach(k => {
      const key = k.nama_jalur.toLowerCase().replace(/\s/g, "");
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

  let hasil = siswaNorm.map(s => {
    let skor = 0;
    kriteria.forEach(k => {
      const key = k.nama_jalur.toLowerCase().replace(/\s/g, "");
      skor += (s.nilaiNorm[key] || 0) * (k.bobot / 100);
    });
    return { ...s, skor };
  });

  // 🔥 Ambil bobot jalur
  const bobotNilai = kriteria.find(k => k.nama_jalur === "nilai")?.bobot || 0;
  const bobotZonasi = kriteria.find(k => k.nama_jalur === "zonasi")?.bobot || 0;
  const bobotPrestasi = kriteria.find(k => k.nama_jalur === "prestasi")?.bobot || 0;

  // 🔥 Simpan threshold ke localStorage
  localStorage.setItem("minNilai", bobotNilai);
  localStorage.setItem("minZonasi", bobotZonasi);
  localStorage.setItem("minPrestasi", bobotPrestasi);

  // 🔥 Filter siswa sesuai jalur
  if (bobotNilai > 0) {
    hasil = hasil.filter(s => s.nilai.nilairapor >= bobotNilai);
  }
  if (bobotZonasi > 0) {
    hasil = hasil.filter(s => s.nilai.jarak_km <= bobotZonasi);
  }
  if (bobotPrestasi > 0) {
    hasil = hasil.filter(s => s.nilai.prestasi >= bobotPrestasi);
  }

  setHasilSPK(hasil.sort((a, b) => b.skor - a.skor));
};

  const kriteriaColumns = [
    { key: "no", title: "No", render: (_, __, idx) => idx + 1 },
    { key: "nama_jalur", title: "Nama Jalur" },
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
