import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { deleteSiswa, getSiswa } from '../../services/siswaService'

export default function ListSiswa() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const data = await getSiswa()
        setRows(data)
      } catch (e) {
        setErr(e.message || 'Gagal memuat data')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const columns = [
    { key: 'nisn', title: 'NISN' },
    { key: 'nama_lengkap', title: 'Nama' },
    { key: 'email', title: 'Email' },
    { key: 'username', title: 'User', render: (_, r) => r.user?.username || '-' },
  ]

  const handleDelete = async (row) => {
    if (!confirm('Hapus data ini?')) return
    await deleteSiswa(row.siswa_id)
    setRows((rs) => rs.filter((x) => x.siswa_id !== row.siswa_id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Data Siswa</h1>
      {err && <div className="rounded bg-red-50 p-2 text-red-600">{err}</div>}
      {loading ? (
        <div>Memuat...</div>
      ) : (
        <Table
          columns={columns}
          data={rows}
          rowKey="siswa_id"
          actions={(row) => (
            <div className="space-x-2">
              <a href={`#/siswa/${row.siswa_id}`} className="rounded bg-blue-500 px-3 py-1 text-white">Detail</a>
              <a href={`#/siswa/${row.siswa_id}/edit`} className="rounded bg-yellow-500 px-3 py-1 text-white">Edit</a>
              <button onClick={() => handleDelete(row)} className="rounded bg-red-600 px-3 py-1 text-white">Hapus</button>
            </div>
          )}
        />
      )}
    </div>
  )
}
