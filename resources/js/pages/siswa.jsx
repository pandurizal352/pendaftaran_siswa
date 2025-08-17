import React, { useEffect, useState } from "react";

function Siswa() {
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari API Laravel
  
  useEffect(() => {
    
    fetch("http://localhost:8000/api/siswa")
      .then((res) => res.json())
      .then((data) => {
        setSiswa(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>

      <a
        href="/siswa/create"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Tambah Siswa
      </a>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">NISN</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswa.map((s) => (
              <tr key={s.siswa_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{s.nisn}</td>
                <td className="px-4 py-2 border">{s.nama_lengkap}</td>
                <td className="px-4 py-2 border">{s.email}</td>
                <td className="px-4 py-2 border">
                  {s.user?.username || "-"}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <a
                    href={`/siswa/${s.siswa_id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Detail
                  </a>
                  <a
                    href={`/siswa/${s.siswa_id}/edit`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => {
                      if (confirm("Hapus data ini?")) {
                        fetch(`/api/siswa/${s.siswa_id}`, {
                          method: "DELETE",
                        })
                          .then(() =>
                            setSiswa(siswa.filter((x) => x.siswa_id !== s.siswa_id))
                          )
                          .catch((err) => alert("Gagal hapus: " + err));
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Siswa;
