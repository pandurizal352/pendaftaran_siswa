import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Menu,
    X,
    Home,
    FileText,
    Users,
    Scale,
    BarChart2,
    Settings,
    UserCog,
    ClipboardList,
} from "lucide-react"; // ikon

const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded px-3 py-2 transition duration-200 hover:bg-[#1aa4bb] hover:bg-opacity-60 ${
        isActive ? "bg-[#1aa4bb] font-semibold" : ""
    }`;

export default function Sidebar({ contentRef }) {
    const [sidebarHeight, setSidebarHeight] = useState("100vh");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateHeight = () => {
            if (contentRef?.current) {
                const contentHeight = contentRef.current.offsetHeight;
                setSidebarHeight(`${contentHeight}px`);
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, [contentRef]);

    return (
        <>
            {/* Tombol Hamburger (Mobile) */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md bg-[#06697a] text-white shadow-md"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Overlay Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0  bg-opacity-40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 z-50 transform transition-transform duration-300
          w-64 bg-gradient-to-b from-[#042f40] via-[#06697a] to-[#0ea5a5] flex flex-col shadow-lg
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                style={{ minHeight: sidebarHeight }}
            >
                {/* Header */}
                <div className="p-4 border-b border-white/20 flex flex-col items-center flex-shrink-0">
                    <img
                        src="http://127.0.0.1:8000/img/Logo_Sekolah.png"
                        alt="Logo"
                        className="h-15 w-15 object-contain drop-shadow-md mb-2"
                    />
                    <h1 className="font-bold text-white text-lg drop-shadow text-center w-full">
                        SMA Budhi Warman II
                    </h1>
                </div>

                {/* Navigasi */}
                <nav className="flex-1 p-5 space-y-2 text-white font-medium">
                    <NavLink
                        to="/admin"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <Home size={18} /> Dashboard
                    </NavLink>
                    <NavLink
                        to="/manajemenpendaftaran"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <FileText size={18} /> Manajemen Pendaftaran
                    </NavLink>
                    <NavLink
                        to="/siswa"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <Users size={18} /> Data Siswa
                    </NavLink>
                    <NavLink
                        to="/kriteria"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <Scale size={18} /> Kriteria & Bobot (SPK)
                    </NavLink>
                    <NavLink
                        to="/perhitungan"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <BarChart2 size={18} /> Perhitungan & Hasil Seleksi
                    </NavLink>
                    <NavLink
                        to="/manajemenuser"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <UserCog size={18} /> Manajemen User
                    </NavLink>
                    {/* <NavLink
                        to="/pengaturansistem"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings size={18} /> Pengaturan Sistem
                    </NavLink>
                    <NavLink
                        to="/laporan"
                        className={linkClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <ClipboardList size={18} /> Laporan
                    </NavLink> */}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/20 text-center text-xs text-gray-100">
                    © 2025 SMA Budhi Warman II
                </div>
            </aside>
        </>
    );
}
