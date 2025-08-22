import React, { useState, useMemo } from "react";
import Table from "../../components/Table";

export default function ManajemenPendaftaran() {
  const [pendaftaran, setPendaftaran] = useState([
    { id: 1, nama: "Budi", usia: 7, status: "Menunggu", dokumen: { ktp: "ktp-budi.png", akta: null } },
    { id: 2, nama: "Siti", usia: 6, status: "Diverifikasi", dokumen: { ktp: "ktp-siti.png", akta: "akta-siti.png" } },
    { id: 3, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 4, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 5, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 6, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 7, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 8, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 9, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 10, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 11, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 12, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 13, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 14, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    { id: 15, nama: "Ahmad", usia: 8, status: "Menunggu", dokumen: { ktp: null, akta: null } },
    // Tambahkan data lain untuk demo pagination
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10; // jumlah data per halaman

  const isDokumenLengkap = (dok) => dok.ktp && dok.akta;

  const handleVerifikasi = (id) => {
    setPendaftaran((prev) =>
      prev.map((anak) =>
        anak.id === id ? { ...anak, status: "Diverifikasi" } : anak
      )
    );
  };

  const handleBatchVerifikasi = () => {
    setPendaftaran((prev) =>
      prev.map((anak) =>
        selectedIds.includes(anak.id) ? { ...anak, status: "Diverifikasi" } : anak
      )
    );
    setSelectedIds([]);
  };

  const filteredData = useMemo(() => {
    return pendaftaran.filter((anak) => {
      const matchesSearch = anak.nama.toLowerCase().includes(search.toLowerCase());
      let matchesFilter = true;
      if (filter === "Menunggu") matchesFilter = anak.status === "Menunggu";
      else if (filter === "Diverifikasi") matchesFilter = anak.status === "Diverifikasi";
      else if (filter === "Dokumen Lengkap") matchesFilter = isDokumenLengkap(anak.dokumen);
      return matchesSearch && matchesFilter;
    });
  }, [pendaftaran, search, filter]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const currentData = filteredData.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const columns = [
    {
      title: "Pilih",
      key: "select",
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelect(row.id)}
        />
      )
    },
    { title: "No", key: "no", render: (_, row, idx) => (page - 1) * perPage + idx + 1 },
    { title: "Nama", key: "nama" },
    { title: "Usia", key: "usia" },
    { title: "Status", key: "status", render: (val) => (
        <span className={val === "Diverifikasi" ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
          {val}
        </span>
      )
    },
    { title: "Dokumen Lengkap", key: "dokumen", render: (_, row) => (
        <button
          onClick={() => setModalData(row.dokumen)}
          className="text-blue-500 font-medium px-2 py-1 rounded-md hover:bg-blue-100 transition"
        >
          {isDokumenLengkap(row.dokumen) ? "✅ Lihat" : "❌ Lihat"}
        </button>
      )
    },
  ];

  const actions = (row) => (
    row.status !== "Diverifikasi" && (
      <button
        onClick={() => handleVerifikasi(row.id)}
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 rounded-lg shadow-md transition hover:scale-105"
      >
        Verifikasi
      </button>
    )
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manajemen Pendaftaran</h1>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 border rounded shadow-sm w-full sm:w-auto"
        >
          <option value="Semua">Semua</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Diverifikasi">Diverifikasi</option>
          <option value="Dokumen Lengkap">Dokumen Lengkap</option>
        </select>
        <input
          type="text"
          placeholder="Cari nama anak..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-4 py-2 border rounded shadow-sm w-full sm:max-w-xs"
        />
      </div>

      {/* Tombol Batch */}
      {selectedIds.length > 0 && (
        <button
          onClick={handleBatchVerifikasi}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-md mb-2 hover:scale-105 transition"
        >
          Verifikasi Terpilih ({selectedIds.length})
        </button>
      )}

      {/* Table */}
      <Table columns={columns} data={currentData} actions={actions} color="blue" />

      {/* Pagination */}
    {/* Pagination */}
      <div className="flex gap-2 justify-center mt-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`
              px-2 py-1 border rounded
              ${page === i + 1 ? "bg-blue-500 text-white" : ""}
            `}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal Dokumen */}
      {modalData && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl z-10">
            <h2 className="text-xl font-semibold mb-4">Dokumen Anak</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium">KTP: </span>
                {modalData.ktp ? <img src={modalData.ktp} alt="KTP" className="max-h-48 rounded shadow"/> : "Belum ada"}
              </div>
              <div>
                <span className="font-medium">Akta: </span>
                {modalData.akta ? <img src={modalData.akta} alt="Akta" className="max-h-48 rounded shadow"/> : "Belum ada"}
              </div>
            </div>
            <button
              onClick={() => setModalData(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
