import React, { useEffect } from "react";

export default function AlertModal({
    isOpen,
    onClose,
    title,
    message,
    duration = 3000,
    variant = "center", // posisi (top/center)
    role = "user", // 🔹 tambahan untuk role
}) {
    useEffect(() => {
        if (isOpen && duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    // 🔹 Style mapping sesuai role
    const roleStyles = {
        admin: "bg-sky-100 border border-sky-300 text-sky-800", // admin => merah
        user: "bg-sky-100 border border-sky-300 text-sky-800", // user => biru
        success: "bg-emerald-100 border border-emerald-300 text-emerald-800", // success => hijau
    };

    const currentStyle = roleStyles[role] || roleStyles.user;

    // 🔹 Jika variant = "top", tampilkan sebagai toast di atas navbar
    if (variant === "top") {
        return (
            <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50">
                <div
                    className={`${currentStyle} px-6 py-3 rounded-xl shadow-md`}
                >
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
        );
    }

    // 🔹 Default (center modal)
    return (
        <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50">
            <div
                className={`${currentStyle} px-6 py-4 rounded-xl shadow-lg max-w-sm text-center`}
            >
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-sm mt-2">{message}</p>
            </div>
        </div>
    );
}
