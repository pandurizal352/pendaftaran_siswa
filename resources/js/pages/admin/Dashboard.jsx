import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import AlertModal from "../../components/AlertModal"; // 🔹 import modal yang sudah kamu buat
import { useAuth } from "../../contexts/AuthContext"; // 🔹 hook auth, asumsi sudah ada

const COLORS = ["#189AB4", "#05445E", "#07677F", "#43C6DB"];

export default function Dashboard() {
    const { user, role, logout } = useAuth(); // 🔹 ambil user & role
    const [siswaData, setSiswaData] = useState([]);
    const [jalurData, setJalurData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [topSiswaJalur, setTopSiswaJalur] = useState([]);
    const [summary, setSummary] = useState({
        totalSiswa: 0,
        totalKriteria: 0,
        totalPenilaian: 0,
        siswaTeratas: "-",
    });

    // 🔹 state untuk modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
    });

    // ✅ tampilkan modal login saat Dashboard pertama kali diakses
    useEffect(() => {
        if (user && role === "admin") {
            setModalContent({
                title: "Login Berhasil",
                message: `Selamat datang, ${user.name} 👋`,
            });
            setModalOpen(true);
        }
    }, [user, role]);

    // ✅ handle logout
    const handleLogout = () => {
        logout();
        setModalContent({
            title: "Logout Berhasil",
            message: `Sampai jumpa, ${user?.name || "Admin"} 👋`,
        });
        setModalOpen(true);
    };

    // 🔹 Fetch data siswa
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/siswa")
            .then((res) => {
                setSiswaData(res.data);
            })
            .catch((err) => {
                console.error("Error fetch siswa:", err);
            });
    }, []);

    // 🔹 Fetch data summary
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/summary")
            .then((res) => {
                setSummary(res.data);
            })
            .catch((err) => {
                console.error("Error fetch summary:", err);
            });
    }, []);

    // 🔹 Hitung data setelah siswaData terisi
    useEffect(() => {
        if (siswaData.length > 0) {
            const groupJalur = {};
            siswaData.forEach((item) => {
                const jalur =
                    item.pendaftaran?.jalur?.nama_jalur || "Tidak Ada Jalur";
                groupJalur[jalur] = (groupJalur[jalur] || 0) + 1;
            });
            setJalurData(
                Object.keys(groupJalur).map((j) => ({
                    nama_jalur: j,
                    jumlah: groupJalur[j],
                }))
            );

            const groupStatus = {};
            siswaData.forEach((item) => {
                const status =
                    item.pendaftaran?.status_pendaftaran || "Menunggu";
                groupStatus[status] = (groupStatus[status] || 0) + 1;
            });
            setStatusData(
                Object.keys(groupStatus).map((s) => ({
                    status: s,
                    jumlah: groupStatus[s],
                }))
            );
        }
    }, [siswaData]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/top-siswa-jalur")
            .then((res) => setTopSiswaJalur(res.data))
            .catch((err) =>
                console.error("Error fetch top siswa per jalur:", err)
            );
    }, []);

    return (
        <div className="space-y-6 w-full">
            <h1 className="text-2xl font-semibold">Dashboard SPK</h1>

            {/* Tombol Logout (contoh untuk test) */}
            {role === "admin" && (
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Logout
                </button>
            )}

            {/* --- Dashboard Charts seperti biasa --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Jumlah siswa per jalur */}
                <div className="rounded-lg border bg-white p-6 shadow h-80">
                    <h2 className="text-lg font-semibold">
                        Jumlah Siswa per Jalur
                    </h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={jalurData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nama_jalur" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="jumlah" fill="#189AB4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Siswa tertinggi per jalur */}
                <div className="rounded-lg border bg-white p-6 shadow h-80">
                    <h2 className="text-lg font-semibold">
                        Siswa Tertinggi per Jalur
                    </h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={topSiswaJalur}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nama_jalur" />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    `${value}`,
                                    `${props.payload.nama_lengkap}`,
                                ]}
                            />
                            <Bar dataKey="nilai_tertinggi" fill="#07677F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Status Pendaftaran + Box Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Chart */}
                <div className="rounded-lg border bg-white p-4 shadow h-[400px]">
                    <h2 className="text-lg font-semibold">
                        Status Pendaftaran
                    </h2>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                dataKey="jumlah"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                label
                            >
                                {statusData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Statistik */}
                <div className="flex flex-col justify-between gap-4">
                    <div className="rounded-lg border bg-white p-4 shadow">
                        <div className="text-sm text-gray-500">
                            Total siswa pendaftar
                        </div>
                        <div className="text-2xl font-bold">
                            {summary.totalSiswa} Pendaftar
                        </div>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow">
                        <div className="text-sm text-gray-500">Kriteria</div>
                        <div className="text-2xl font-bold">
                            {summary.totalKriteria}
                        </div>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow">
                        <div className="text-sm text-gray-500">
                            Data Penilaian
                        </div>
                        <div className="text-2xl font-bold">
                            {summary.totalPenilaian}
                        </div>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow">
                        <div className="text-sm text-gray-500">
                            Siswa nilai teratas
                        </div>
                        <div className="text-2xl font-bold">
                            {summary.siswaTeratas}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Modal muncul login/logout */}
            <AlertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
                message={modalContent.message}
            />
        </div>
    );
}
