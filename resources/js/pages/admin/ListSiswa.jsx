// ListSiswa.jsx
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { deleteSiswa, getSiswa } from "../../services/siswaService";

export default function ListSiswa() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSiswa();
        setRows(data);
      } catch (e) {
        setErr(e.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns = [
    { key: "nisn", title: "NIS" },
    { key: "nama_lengkap", title: "Nama" },
    { key: "email", title: "Email" },
    { key: "status", title: "Status" },
  ];

  const handleDelete = async (row) => {
    if (!confirm("Hapus data ini?")) return;
    await deleteSiswa(row.siswa_id);
    setRows((rs) => rs.filter((x) => x.siswa_id !== row.siswa_id));
  };

  // Filter + search
  const filteredRows = rows
    .filter((r) =>
      filter === "Semua" ? true : r.status === filter
    )
    .filter((r) =>
      r.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
      r.nisn.includes(search)
    );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Data Siswa</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          + Tambah Siswa
        </button>
      </div>

      {/* Search + Filter + Rows */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option>Semua</option>
          <option>Diterima</option>
          <option>Pending</option>
          <option>Ditolak</option>
        </select>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border rounded px-3 py-1"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {err && <div className="rounded bg-red-50 p-3 text-red-600">{err}</div>}
      {loading ? (
        <div>Memuat...</div>
      ) : (
        <Table
          columns={columns}
          data={paginatedRows}
          rowKey="siswa_id"
          color="blue"
          actions={(row) => (
            <div className="flex flex-wrap gap-2">
              <button className="px-2 py-1 text-xs bg-green-500 text-white rounded">
                Detail
              </button>
              <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
                Edit
              </button>
              <button
                onClick={() => handleDelete(row)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              >
                Hapus
              </button>
            </div>
          )}
        />
      )}

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
    </div>
  );
}
