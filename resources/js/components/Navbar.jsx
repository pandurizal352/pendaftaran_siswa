import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-gradient-to-r from-[#043142] via-[#07677F] to-[#189AB4] text-white px-6 py-4 shadow-md">
      {/* Tombol Hamburger (mobile only) */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-white/20 transition"
        onClick={onToggleSidebar}
      >
        <Menu size={22} />
      </button>

      {/* Judul */}
      <h1 className="text-lg font-semibold tracking-wide">SPK PPDB</h1>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{user?.name}</span>
        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
