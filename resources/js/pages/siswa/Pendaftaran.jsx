import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { createSiswa } from "../../services/siswaService";
import { useAuth } from "../../contexts/AuthContext"; // ✅ ambil auth

function AccordionSection({ title, children }) {
    const [open, setOpen] = useState(true);

    return (
        <div className="rounded-lg shadow bg-white mt-4">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center bg-[#05445E] text-white font-semibold px-4 py-2 rounded-t-lg"
            >
                <span>{title}</span>
                <span>{open ? "−" : "+"}</span>
            </button>
            {open && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function Pendaftaran() {
    const { user } = useAuth(); // ✅ ambil user dari context
    console.log("AuthContext user:", user.user_id);

    const [form, setForm] = useState({
        nisn: "",
        nama_lengkap: "",
        jenis_kelamin: "L",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        alamat: "",
        no_hp: "",
        email: "",
        foto: null,
        nama_ayah: "",
        pekerjaan_ayah: "",
        nama_ibu: "",
        pekerjaan_ibu: "",
        no_hp_ortu: "",
        alamat_ortu: "",
        nama_sekolah_asal: "",
        alamat_sekolah_asal: "",
        rata_rata_nilai: "",
        jalur_id: "",
        nilai_tes: "",
        jarak_km: "",
        jenis_dokumen: [],
        tanggal_upload: "",
        file_path: [],
    });
    const [ok, setOk] = useState("");
    const [err, setErr] = useState("");

    const onChange = (e) => {
        const { name, value, files } = e.target;
        setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
    };

    const onSubmit = async (e) => {
  e.preventDefault();
  setOk("");
  setErr("");

  // ✅ cek user_id dari AuthContext
  if (!user?.user_id) {
    setErr("User belum tersedia. Silakan login ulang.");
    return;
  }

  try {
    const fd = new FormData();

    // Kirim semua field kecuali file_path & jenis_dokumen
    for (const [key, value] of Object.entries(form)) {
      if (["file_path", "jenis_dokumen"].includes(key)) continue;
      if (value !== null && value !== undefined) {
        fd.append(key, value);
      }
    }

    // ✅ user_id otomatis dari AuthContext
    fd.append("user_id", user.user_id);

    // Kirim dokumen
    form.file_path.forEach((file) => {
      fd.append("file_path[]", file);
    });
    form.jenis_dokumen.forEach((jenis) => {
      fd.append("jenis_dokumen[]", jenis);
    });

    await createSiswa(fd);
    setOk("Data tersimpan!");
  } catch (e) {
    setErr(e.message || "Gagal menyimpan");
  }
};


    return (
        <div className="mx-auto max-w-5xl p-6  pt-24">
            <h1 className="text-2xl font-semibold mb-6">Profil Saya</h1>

            {ok && (
                <div className="rounded bg-green-50 p-2 text-green-700">
                    {ok}
                </div>
            )}
            {err && (
                <div className="rounded bg-red-50 p-2 text-red-600">{err}</div>
            )}

            <form onSubmit={onSubmit} encType="multipart/form-data">
                {/* Data Pribadi */}
                <AccordionSection title="Data Pribadi">
                    <div className="flex justify-center mb-6 col-span-2">
                        <div className="flex flex-col items-center gap-2">
                            {form.foto ? (
                                <img
                                    src={URL.createObjectURL(form.foto)}
                                    alt="Preview Foto"
                                    className="w-28 h-28 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Foto
                                </div>
                            )}
                            <input
                                type="file"
                                name="foto"
                                accept="image/*"
                                onChange={onChange}
                                className="text-sm ml-26"
                            />
                        </div>
                    </div>

                    {/* ❌ Kolom User ID dihapus */}

                    <FormInput
                        label="NISN"
                        name="nisn"
                        value={form.nisn}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Nama Lengkap"
                        name="nama_lengkap"
                        value={form.nama_lengkap}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Jenis Kelamin"
                        name="jenis_kelamin"
                        type="select"
                        value={form.jenis_kelamin}
                        onChange={onChange}
                        required
                    >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </FormInput>
                    <FormInput
                        label="Tempat Lahir"
                        name="tempat_lahir"
                        value={form.tempat_lahir}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Tanggal Lahir"
                        name="tanggal_lahir"
                        type="date"
                        value={form.tanggal_lahir}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Agama"
                        name="agama"
                        value={form.agama}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Alamat"
                        name="alamat"
                        type="textarea"
                        value={form.alamat}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="No HP"
                        name="no_hp"
                        value={form.no_hp}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />

                    {/* Pilihan Jenis Tes */}
                    <FormInput
                        label="Jenis Tes"
                        name="jalur_id"
                        type="select"
                        value={form.jalur_id}
                        onChange={onChange}
                        required
                    >
                        <option value="">-- Pilih Jenis Tes --</option>
                        <option value="1">Prestasi</option>
                        <option value="2">Nilai</option>
                        <option value="3">Zonasi</option>
                    </FormInput>

                    {/* Kondisional tampil */}
                    {form.jalur_id === "2" && (
                        <FormInput
                            label="Nilai Tes"
                            name="nilai_tes"
                            value={form.nilai_tes ?? ""}
                            onChange={onChange}
                            required
                        />
                    )}

                    {form.jalur_id === "3" && (
                        <FormInput
                            label="Kilometer dari rumah ke sekolah"
                            name="jarak_km"
                            value={form.jarak_km ?? ""}
                            onChange={onChange}
                            required
                        />
                    )}
                </AccordionSection>

                {/* Data Orang Tua */}
                <AccordionSection title="Data Orang Tua / Wali">
                    <FormInput
                        label="Nama Ayah"
                        name="nama_ayah"
                        value={form.nama_ayah}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Pekerjaan Ayah"
                        name="pekerjaan_ayah"
                        value={form.pekerjaan_ayah}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Nama Ibu"
                        name="nama_ibu"
                        value={form.nama_ibu}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Pekerjaan Ibu"
                        name="pekerjaan_ibu"
                        value={form.pekerjaan_ibu}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="No HP Ortu"
                        name="no_hp_ortu"
                        value={form.no_hp_ortu}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Alamat Ortu"
                        name="alamat_ortu"
                        type="textarea"
                        value={form.alamat_ortu}
                        onChange={onChange}
                        required
                    />
                </AccordionSection>

                {/* Riwayat Pendidikan */}
                <AccordionSection title="Riwayat Pendidikan">
                    <FormInput
                        label="Nama Sekolah Asal"
                        name="nama_sekolah_asal"
                        value={form.nama_sekolah_asal}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Alamat Sekolah Asal"
                        name="alamat_sekolah_asal"
                        value={form.alamat_sekolah_asal}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="Rata-rata Nilai"
                        name="rata_rata_nilai"
                        value={form.rata_rata_nilai}
                        onChange={onChange}
                        required
                    />
                </AccordionSection>

                {/* Dokumen */}
                <AccordionSection title="Dokumen">
                    {form.file_path.map((file, idx) => (
                        <div key={idx}>
                            <FormInput
                                label={`Jenis Dokumen ${idx + 1}`}
                                name={`jenis_dokumen[${idx}]`}
                                value={form.jenis_dokumen?.[idx] || ""}
                                onChange={(e) => {
                                    const updated = [
                                        ...(form.jenis_dokumen || []),
                                    ];
                                    updated[idx] = e.target.value;
                                    setForm((f) => ({
                                        ...f,
                                        jenis_dokumen: updated,
                                    }));
                                }}
                                required
                            />
                        </div>
                    ))}
                    <FormInput
                        label="Tanggal Upload"
                        name="tanggal_upload"
                        type="date"
                        value={form.tanggal_upload}
                        onChange={onChange}
                        required
                    />
                    <FormInput
                        label="File Dokumen"
                        name="file_path"
                        type="file"
                        accept="application/pdf"
                        multiple
                        onChange={(e) => {
                            setForm((f) => ({
                                ...f,
                                file_path: Array.from(e.target.files),
                            }));
                        }}
                        required
                    />
                </AccordionSection>

                {/* Submit button */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
