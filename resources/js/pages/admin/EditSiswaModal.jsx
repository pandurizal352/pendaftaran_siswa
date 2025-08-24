import React, { useState, useEffect } from "react";

export default function EditSiswaModal({ open, onClose, data, onSave }) {
    const [form, setForm] = useState({
        siswa_id: "",
        pendaftaran_id: "",
        jalur_id: "",
        status_pendaftaran: "pending",
        nomor_pendaftaran: "",
        tanggal_daftar: "",
    });

    useEffect(() => {
        if (data && open) {
            const pendaftaran = Array.isArray(data.pendaftaran)
                ? data.pendaftaran[0] ?? {}
                : data.pendaftaran ?? {};

            setForm({
                siswa_id: data?.siswa_id ?? "",
                pendaftaran_id: pendaftaran?.pendaftaran_id ?? "",
                jalur_id: pendaftaran?.jalur_id ?? "",
                status_pendaftaran:
                    pendaftaran?.status_pendaftaran || "pending",
                nomor_pendaftaran: pendaftaran?.nomor_pendaftaran ?? "",
                tanggal_daftar: pendaftaran?.tanggal_daftar
                    ? pendaftaran.tanggal_daftar.split("T")[0]
                    : "",
            });
        }
    }, [data, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form); // kirim ke parent
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center">
            <div className="bg-white border-b-2 p-6 rounded-lg w-[500px] border-px-10">
                <h2 className="text-xl font-semibold mb-4">Edit Pendaftaran</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="jalur_id"
                        value={form.jalur_id}
                        onChange={handleChange}
                        readOnly
                        placeholder="Jalur ID"
                        className="border px-2 py-1 w-full mb-2"
                    />

                    <select
                        name="status_pendaftaran"
                        value={form.status_pendaftaran}
                        onChange={handleChange}
                        className="border px-2 py-1 w-full mb-2"
                    >
                        <option value="">-- Pilih Status --</option>
                        <option value="pending">Pending</option>
                        <option value="terverifikasi">Terverifikasi</option>
                        <option value="diterima">Diterima</option>
                    </select>

                    <input
                        name="nomor_pendaftaran"
                        value={form.nomor_pendaftaran}
                        onChange={handleChange}
                        readOnly
                        placeholder="Nomor Pendaftaran"
                        className="border px-2 py-1 w-full mb-2"
                    />

                    <input
                        type="date"
                        name="tanggal_daftar"
                        value={form.tanggal_daftar}
                        readOnly
                        onChange={handleChange}
                        className="border px-2 py-1 w-full mb-2"
                    />

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
