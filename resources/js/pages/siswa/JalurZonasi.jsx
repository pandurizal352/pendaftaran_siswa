import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getPendaftaran } from "../../services/siswaService";

export default function ListSiswaZonasi() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await getPendaftaran();
                console.log(data);

                // 🔥 Ambil bobot zonasi dari localStorage (diset dari Kriteria.jsx)
                const minZonasi = Number(localStorage.getItem("minZonasi") || 0);

                // 🔥 Filter hanya siswa jalur zonasi
                let filtered = data.filter(
                    (item) => item.jalur?.nama_jalur === "zonasi"
                );

                // 🔥 Kalau ada aturan bobot zonasi → filter lagi
                if (minZonasi > 0) {
                    filtered = filtered.filter((item) => {
                        // misalnya pakai nilai domisili / jarak (km)
                        const jarak = item.siswa?.jarak_km || 0;
                        return jarak <= minZonasi;
                    });
                }

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
            render: (_, row) => row.penilaian?.[0]?.jarak_km || "-",
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
            <h1 className="text-2xl font-semibold">Data Siswa Jalur Zonasi</h1>
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

                />
            )}
        </div>
    );
}
