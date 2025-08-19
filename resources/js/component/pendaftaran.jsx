import { useState } from "react";

export default function CreateSiswa() {
    const [formData, setFormData] = useState({
        user_id: "",
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
        jenis_dokumen: "",
        tanggal_upload: "",
        file_path: null,
    });

    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  try {
    const res = await fetch("http://localhost:8000/api/siswa", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server Error:", errorText);
      return;
    }

    const result = await res.json();
    console.log("Sukses:", result);
    alert("Data tersimpan!");
  } catch (err) {
    console.error("Request Error:", err);
  }
};


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //         data.append(key, value);
    //     });

    //     await fetch("/api/siswa", {
    //         method: "POST",
    //         body: data,
    //     });

    //     // alert("Data tersimpan!");
    // };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Tambah Data Siswa Lengkap</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                {/* ===== Data Siswa ===== */}
                <h3 className="text-lg font-semibold">Data Siswa</h3>
                <div>
                    <label className="block">User</label>
                    <select
                        name="user_id"
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    >
                        <option value="">-- Pilih User --</option>
                        {/* ini nanti fetch dari API user */}
                        <option value="1">User 1</option>
                        <option value="2">User 2</option>
                    </select>
                </div>
                <div>
                    <label>NISN</label>
                    <input type="text" name="nisn" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Nama Lengkap</label>
                    <input type="text" name="nama_lengkap" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Jenis Kelamin</label>
                    <select name="jenis_kelamin" onChange={handleChange} className="border rounded p-2 w-full" required>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
                <div >
                    <label>Tempat Lahir</label>
                    <input type="text" name="tempat_lahir" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>

               <div >
                    <label>Tanggal Lahir</label>
                    <input type="date" name="tanggal_lahir" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div >
                    <label>Agama</label>
                    <input type="text" name="agama" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Alamat</label>
                    
                    <textarea name="alamat" onChange={handleChange} className="border rounded p-2 w-full"></textarea>
                </div>
                <div>
                    <label>No HP</label>
                    <input type="text" name="no_hp" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Foto</label>
                    <input type="file" name="foto" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <h3>Data Orang Tua / Wali</h3>
                <div>
                    <label>Nama Ayah</label>
                    <input type="text" name="nama_ayah" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Pekerjaan Ayah</label>
                    <input type="text" name="pekerjaan_ayah" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Nama Ibu</label>
                    <input type="text" name="nama_ibu" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Pekerjaan Ibu</label>
                    <input type="text" name="pekerjaan_ibu" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>No HP Ortu</label>
                    <input type="text" name="no_hp_ortu" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Alamat Ortu</label>
                    <textarea name="alamat_ortu" onChange={handleChange} className="border rounded p-2 w-full"></textarea>
                </div>
                <h3>Riwayat Pendidikan</h3>
                
                <div>
                    <label>Nama Sekolah asal</label>
                    <input type="text" name="nama_sekolah_asal" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>alamat sekolah</label>
                    <input type="text" name="alamat_sekolah_asal" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>rata rata nilai</label>
                    <input type="text" name="rata_rata_nilai" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <h3 className="text-lg font-semibold">Dokumen</h3>
                
                <div>
                    <label>Jenis Dokumen</label>
                    <input type="text" name="jenis_dokumen" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>tanggal upload</label>
                    <input type="date" name="tanggal_upload" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>jenis_dokumen</label>
                    <input type="file" name="jenis_dokumen"  onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                {/* <div>
                    <label>File Dokumen</label>
                    <input type="file" name="file_path" onChange={handleChange} className="border rounded p-2 w-full" required />
                </div> */}

               
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Simpan
                </button>
            </form>
        </div>
    );
}
