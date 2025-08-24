import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "lucide-react";
import AlertModal from "./AlertModal"; // pastikan path sesuai
import { LayoutDashboard } from "lucide-react"; // tambahin impo

export default function Navbar({ onToggleSidebar }) {
    const { user, logout } = useAuth();

    const [alert, setAlert] = useState({
        isOpen: false,
        title: "",
        message: "",
        role: "admin",
    });

    // ✅ Trigger notif ketika admin baru masuk
    useEffect(() => {
        if (user) {
            setAlert({
                isOpen: true,
                title: "Login Berhasil",
                message: `Selamat datang kembali, Admin ${user?.username}!`,
                role: "admin",
            });
        }
    }, [user]); // jalan ketika user berubah (misalnya setelah login)

    const handleLogout = () => {
        logout();
        setAlert({
            isOpen: true,
            title: "Logout Berhasil",
            message: `Admin ${user?.username} berhasil keluar.`,
            role: "admin",
        });
    };

    return (
        <>
            <header className="flex items-center justify-between border-b bg-gradient-to-r from-[#043142] via-[#07677F] to-[#189AB4] text-white px-6 py-4 shadow-md">
                {/* Tombol Hamburger (mobile only) */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-white/20 transition"
                    onClick={onToggleSidebar}
                >
                    <Menu size={22} />
                </button>

                {/* Judul */}
                <h1 className="text-lg font-semibold tracking-wide">
                    SPK PPDB
                </h1>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                        <LayoutDashboard className="w-5 h-5 text-white" />
                        <span className="text-gray-800 dark:text-gray-200">
                            Administrator || {user?.username}
                        </span>
                    </span>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium shadow hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Alert Modal */}
            <AlertModal
                isOpen={alert.isOpen}
                onClose={() => setAlert({ ...alert, isOpen: false })}
                title={alert.title}
                message={alert.message}
                role={alert.role}
                variant="top"
            />
        </>
    );
}
