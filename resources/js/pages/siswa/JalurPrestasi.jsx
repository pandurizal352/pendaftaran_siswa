import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getPendaftaran } from "../../services/siswaService";

export default function ListSiswaNilai() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await getPendaftaran();
                console.log(data);

                // 🔥 Filter hanya siswa yang jalur pendaftarannya = "Jalur Nilai"
                const filtered = data.filter(
                    (item) => item.jalur?.nama_jalur === "prestasi"
                );
                setRows(filtered);
            } catch (e) {
                setErr(e.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const columns = [
        {
            key: "nama_lengkap",
            title: "Nama Lengkap",
            render: (_, row) => row.siswa?.nama_lengkap || "-",
        },
        {
            key: "nisn",
            title: "NISN",
            render: (_, row) => row.siswa?.nisn || "-",
        },
        {
            key: "jenis_kelamin",
            title: "Jenis Kelamin",
            render: (_, row) => row.siswa?.jenis_kelamin || "-",
        },
        {
            key: "total_nilai",
            title: "Nilai",
            render: (_, row) => row.penilaian?.[0]?.nilai_tes || "-",
        },
        { key: "nomor_pendaftaran", title: "Nomor Pendaftaran" },
        { key: "status_pendaftaran", title: "Status Pendaftaran" },
        {
            key: "nama_jalur",
            title: "Jalur Pendaftaran",
            render: (_, row) => row.jalur?.nama_jalur || "-",
        },
    ];

    const handleDelete = async (row) => {
        if (!confirm("Hapus data ini?")) return;
        await deleteSiswa(row.siswa_id);
        setRows((rs) => rs.filter((x) => x.siswa_id !== row.siswa_id));
    };

    return (
        <div className="space-y-4 mt-20">
            <h1 className="text-2xl font-semibold">Data Siswa Jalur Nilai</h1>
            {err && (
                <div className="rounded bg-red-50 p-2 text-red-600">{err}</div>
            )}
            {loading ? (
                <div>Memuat...</div>
            ) : (
                <Table
                    columns={columns}
                    data={rows}
                    rowKey="siswa_id"
                    actions={(row) => (
                        <div className="space-x-2">
                            <a
                                href={`#/siswa/${row.siswa_id}`}
                                className="rounded bg-blue-500 px-3 py-1 text-white"
                            >
                                Detail
                            </a>
                            <a
                                href={`#/siswa/${row.siswa_id}/edit`}
                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                            >
                                Edit
                            </a>
                            <button
                                onClick={() => handleDelete(row)}
                                className="rounded bg-red-600 px-3 py-1 text-white"
                            >
                                Hapus
                            </button>
                        </div>
                    )}
                />
            )}
        </div>
    );
}

// import React, { useEffect, useState } from 'react'
// import Table from '../../components/Table'
// import { getPendaftaran } from '../../services/siswaService'

// export default function ListSiswa() {
//   const [rows, setRows] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [err, setErr] = useState('')

//  useEffect(() => {
//   (async () => {
//     try {
//       const data = await getPendaftaran()
//       console.log(data)
//       setRows(data)
//     } catch (e) {
//       setErr(e.message || 'Gagal memuat data')
//     } finally {
//       setLoading(false)
//     }
//   })()
// }, [])

//   // Kolom sesuai permintaan
// const columns = [
//   { key: 'nama_lengkap', title: 'Nama Lengkap', render: (_, row) => row.siswa?.nama_lengkap || '-' },
//   { key: 'nisn', title: 'NISN', render: (_, row) => row.siswa?.nisn || '-' },
//   { key: 'jenis_kelamin', title: 'Jenis Kelamin', render: (_, row) => row.siswa?.jenis_kelamin || '-' },
//  { key: 'total_nilai', title: 'Nilai', render: (_, row) => row.penilaian?.[0]?.nilai_tes || '-' },

//   { key: 'nomor_pendaftaran', title: 'Nomor Pendaftaran' },
//   { key: 'status_pendaftaran', title: 'Status Pendaftaran' },
//   { key: 'nama_jalur', title: 'Jalur Pendaftaran', render: (_, row) => row.jalur?.nama_jalur || '-' }
// ]

//   const handleDelete = async (row) => {
//     if (!confirm('Hapus data ini?')) return
//     await deleteSiswa(row.siswa_id)
//     setRows((rs) => rs.filter((x) => x.siswa_id !== row.siswa_id))
//   }

//   return (
//   <div className="space-y-4 mt-8">
//     <h1 className="text-2xl font-semibold">Data Siswa</h1>
//     {err && <div className="rounded bg-red-50 p-2 text-red-600">{err}</div>}
//     {loading ? (
//       <div>Memuat...</div>
//     ) : (
//       <Table
//         columns={columns}
//         data={rows}
//         rowKey="siswa_id"
//         actions={(row) => (
//           <div className="space-x-2">
//             <a
//               href={`#/siswa/${row.siswa_id}`}
//               className="rounded bg-blue-500 px-3 py-1 text-white"
//             >
//               Detail
//             </a>
//             <a
//               href={`#/siswa/${row.siswa_id}/edit`}
//               className="rounded bg-yellow-500 px-3 py-1 text-white"
//             >
//               Edit
//             </a>
//             <button
//               onClick={() => handleDelete(row)}
//               className="rounded bg-red-600 px-3 py-1 text-white"
//             >
//               Hapus
//             </button>
//           </div>
//         )}
//       />
//     )}
//   </div>
// )

// }
