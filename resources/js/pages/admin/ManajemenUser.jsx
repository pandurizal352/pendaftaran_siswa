import React from "react";
import Table from "../../components/Table";

export default function ManajemenUser() {
  // definisi kolom
  const columns = [
    { key: "id", title: "ID" },
    { key: "nama", title: "Nama" },
    { key: "username", title: "Username" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
  ];

  // data dummy admin
  const data = [
    {
      id: 1,
      nama: "blao",
      username: "admin1",
      email: "admin1@example.com",
      role: "admin",
    },
    {
      id: 2,
      nama: "Admin 2",
      username: "admin2",
      email: "admin2@example.com",
      role: "admin",
    },
    {
      id: 3,
      nama: "Admin 3",
      username: "admin3",
      email: "admin3@example.com",
      role: "admin",
    },
  ];

  // aksi untuk setiap row
  const actions = (row) => (
    <div className="space-x-2">
      <button
        onClick={() => alert(`Edit ${row.username}`)}
        className="rounded-lg bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
      >
        Edit
      </button>
      <button
        onClick={() => alert(`Hapus ${row.username}`)}
        className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      >
        Hapus
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manajemen User - Admin</h1>
      <p className="text-gray-600">Kelola akun admin yang terdaftar di sistem.</p>
      <Table columns={columns} data={data} actions={actions} color="blue" />
    </div>
  );
}
