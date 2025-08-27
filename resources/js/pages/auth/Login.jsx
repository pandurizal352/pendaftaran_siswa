import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const nav = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false); // 👈 state untuk toggle password

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);

        try {
            const user = await login(form);

            if (user.role === "admin") {
                nav("/admin", { replace: true });
            } else {
                nav("/", { replace: true });
            }
        } catch (e) {
            setErr(e.message || "Login gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-100">
            {/* Container */}
            <div className="relative z-10 flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
                {/* Kolom kiri - gambar */}
                <div className="flex w-1/2 items-center justify-center bg-gray-200">
                    <img
                        src="http://127.0.0.1:8000/img/cover.png"
                        alt="Gambar Sekolah"
                        className="w-full h-full object-contain object-center"
                    />
                </div>

                {/* Kolom kanan - form login */}
                <div className="w-1/2 p-8">
                    <h1 className="mb-6 text-2xl font-bold">Masuk</h1>
                    {err && (
                        <div className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">
                            {err}
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <label className="block">
                            <span className="mb-1 block text-sm">Email</span>
                            <input
                                className="w-full rounded border p-2"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                required
                            />
                        </label>

                        <label className="block relative">
                            <span className="mb-1 block text-sm">Password</span>
                            <input
                                className="w-full rounded border p-2 pr-10"
                                type={showPass ? "text" : "password"} // 👈 toggle
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </label>

                        <button
                            disabled={loading}
                            className="w-full rounded bg-[#189AB4] p-2 text-white hover:bg-[#05445E] disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? "Memproses..." : "Login"}
                        </button>

                        <p className="text-center text-sm">
                            Belum punya akun?{" "}
                            <Link to="/register" className="text-blue-600">
                                Daftar
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
