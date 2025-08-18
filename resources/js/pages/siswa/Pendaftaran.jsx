import React, { useState } from 'react'
import FormInput from '../../components/FormInput'
import { createSiswa } from '../../services/siswaService'

export default function Pendaftaran() {
  const [form, setForm] = useState({
    user_id: '',
    nisn: '',
    nama_lengkap: '',
    jenis_kelamin: 'L',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    alamat: '',
    no_hp: '',
    email: '',
    foto: null,
    nama_ayah: '',
    pekerjaan_ayah: '',
    nama_ibu: '',
    pekerjaan_ibu: '',
    no_hp_ortu: '',
    alamat_ortu: '',
    nama_sekolah_asal: '',
    alamat_sekolah_asal: '',
    rata_rata_nilai: '',
    jenis_dokumen: '',
    tanggal_upload: '',
    file_path: null,
  })
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  const onChange = (e) => {
    const { name, value, files } = e.target
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }))
  }

  const onSubmit = async (e) => {
  e.preventDefault()
  setOk('')
  setErr('')
  try {
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== undefined) fd.append(k, v)
    })
    await createSiswa(fd)
    setOk('Data tersimpan!')
  } catch (e) {
    setErr(e.message || 'Gagal menyimpan')
  }
}


  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-semibold">Pendaftaran Siswa Baru</h1>
      {ok && <div className="rounded bg-green-50 p-2 text-green-700">{ok}</div>}
      {err && <div className="rounded bg-red-50 p-2 text-red-600">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-4 rounded bg-white p-6 shadow" encType="multipart/form-data">
        <FormInput label="User ID" name="user_id" value={form.user_id} onChange={onChange} required />
        <FormInput label="NISN" name="nisn" value={form.nisn} onChange={onChange} required />
        <FormInput label="Nama Lengkap" name="nama_lengkap" value={form.nama_lengkap} onChange={onChange} required />
        <FormInput label="Jenis Kelamin" name="jenis_kelamin" type="select" value={form.jenis_kelamin} onChange={onChange} required>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </FormInput>
        <FormInput label="Tempat Lahir" name="tempat_lahir" value={form.tempat_lahir} onChange={onChange} required />
        <FormInput label="Tanggal Lahir" name="tanggal_lahir" type="date" value={form.tanggal_lahir} onChange={onChange} required />
        <FormInput label="Agama" name="agama" value={form.agama} onChange={onChange} required />
        <FormInput label="Alamat" name="alamat" type="textarea" value={form.alamat} onChange={onChange} required />
        <FormInput label="No HP" name="no_hp" value={form.no_hp} onChange={onChange} required />
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
        <FormInput label="Foto" name="foto" type="file" onChange={onChange} required />

        <h3 className="pt-2 text-lg font-semibold">Data Orang Tua / Wali</h3>
        <FormInput label="Nama Ayah" name="nama_ayah" value={form.nama_ayah} onChange={onChange} required />
        <FormInput label="Pekerjaan Ayah" name="pekerjaan_ayah" value={form.pekerjaan_ayah} onChange={onChange} required />
        <FormInput label="Nama Ibu" name="nama_ibu" value={form.nama_ibu} onChange={onChange} required />
        <FormInput label="Pekerjaan Ibu" name="pekerjaan_ibu" value={form.pekerjaan_ibu} onChange={onChange} required />
        <FormInput label="No HP Ortu" name="no_hp_ortu" value={form.no_hp_ortu} onChange={onChange} required />
        <FormInput label="Alamat Ortu" name="alamat_ortu" type="textarea" value={form.alamat_ortu} onChange={onChange} required />

        <h3 className="pt-2 text-lg font-semibold">Riwayat Pendidikan</h3>
        <FormInput label="Nama Sekolah Asal" name="nama_sekolah_asal" value={form.nama_sekolah_asal} onChange={onChange} required />
        <FormInput label="Alamat Sekolah Asal" name="alamat_sekolah_asal" value={form.alamat_sekolah_asal} onChange={onChange} required />
        <FormInput label="Rata-rata Nilai" name="rata_rata_nilai" value={form.rata_rata_nilai} onChange={onChange} required />

        <h3 className="pt-2 text-lg font-semibold">Dokumen</h3>
        <FormInput label="Jenis Dokumen" name="jenis_dokumen" value={form.jenis_dokumen} onChange={onChange} required />
        <FormInput label="Tanggal Upload" name="tanggal_upload" type="date" value={form.tanggal_upload} onChange={onChange} required />
        <FormInput label="File Dokumen" name="file_path" type="file" onChange={onChange} required />

        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Simpan</button>
      </form>
    </div>
  )
}

