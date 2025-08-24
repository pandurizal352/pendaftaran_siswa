import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import EditSiswaModal from "./EditSiswaModal";
import { deleteSiswa, getSiswa } from "../../services/siswaService";

export default function ListSiswa() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await getSiswa();
                const mapped = data.map((d) => ({
                    ...d,
                    status: d.pendaftaran?.status_pendaftaran || "Belum daftar",
                }));
                setRows(mapped);
            } catch (e) {
                setErr(e.message || "Gagal memuat data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (row) => {
        if (!confirm("Hapus data ini?")) return;
        await deleteSiswa(row.siswa_id);
        setRows((rs) => rs.filter((x) => x.siswa_id !== row.siswa_id));
    };

    const handleDeletePendaftaran = async (row) => {
        if (!row.pendaftaran?.pendaftaran_id) {
            alert("Siswa ini belum memiliki pendaftaran.");
            return;
        }

        if (!confirm("Yakin ingin menghapus pendaftaran ini?")) return;

        try {
            await axios.delete(
                `/api/pendaftaran/${row.pendaftaran.pendaftaran_id}`
            );

            // Update state: hapus status jadi "Belum daftar"
            setRows(
                rows.map((r) =>
                    r.siswa_id === row.siswa_id
                        ? { ...r, status: "Belum daftar", pendaftaran: null }
                        : r
                )
            );

            alert("Pendaftaran berhasil dihapus.");
        } catch (error) {
            console.error("Gagal hapus pendaftaran:", error);
            alert("Gagal menghapus pendaftaran.");
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await axios.put(`/api/pendaftaran/${formData.pendaftaran_id}`, {
                siswa_id: formData.siswa_id,
                jalur_id: formData.jalur_id,
                tanggal_daftar: formData.tanggal_daftar,
                nomor_pendaftaran: formData.nomor_pendaftaran,
                status_pendaftaran: formData.status_pendaftaran,
            });

            // update state lokal
            setRows(
                rows.map((r) =>
                    r.siswa_id === formData.siswa_id
                        ? { ...r, status: formData.status_pendaftaran }
                        : r
                )
            );

            setOpenEdit(false);
        } catch (error) {
            console.error("Gagal update:", error);
            alert("Gagal memperbarui data.");
        }
    };

    const columns = [
        { key: "nisn", title: "NIS" },
        { key: "nama_lengkap", title: "Nama" },
        { key: "email", title: "Email" },
        { key: "status", title: "Status" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Data Siswa</h1>
            </div>

            {loading ? (
                <div>Memuat...</div>
            ) : (
                <Table
                    columns={columns}
                    data={rows}
                    rowKey="siswa_id"
                    color="blue"
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setSelectedRow(row);
                                    setOpenEdit(true);
                                }}
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeletePendaftaran(row)}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    )}
                />
            )}

            <EditSiswaModal
                open={openEdit}
                data={selectedRow}
                onClose={() => setOpenEdit(false)}
                onSave={handleUpdate}
            />
        </div>
    );
}
