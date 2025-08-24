import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useAuth } from "../../contexts/AuthContext";

export default function ManajemenUser() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const columns = [
    { key: "username", title: "Username" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
  ];

  // Ambil semua user dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // kalau pakai JWT
          },
        });
        let data = await res.json();

        // Filter hanya role admin dan urutkan berdasarkan ID ASC
        data = data
          .filter((u) => u.role === "admin")
          .sort((a, b) => a.id - b.id);

        setUsers(data);
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Manajemen User</h1>
      <p className="text-gray-600">Kelola semua akun yang terdaftar di sistem.</p>
      <Table columns={columns} data={users} color="blue" />
    </div>
  );
}
