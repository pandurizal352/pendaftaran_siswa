import { createContext, useContext, useState, useEffect } from "react";
import {
    loginRequest,
    registerRequest,
    getProfile,
    logoutRequest,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // cek token di localStorage saat pertama kali load app
    useEffect(() => {
        const initializeUser = async () => {
            if (token) {
                try {
                    const res = await getProfile(token); // ambil profile user dari API
                    setUser(res.user); // user akan berisi role, id, nama, dsb
                } catch (err) {
                    console.error("Gagal ambil profile:", err);
                    logout();
                }
            }
            setLoading(false);
        };
        initializeUser();
    }, [token]);

    const login = async ({ email, password }) => {
        const res = await loginRequest({ email, password });

        if (!res.success) {
            throw new Error(res.message || "Email atau password salah");
        }

        const { token: access_token } = res;

        // simpan token
        setToken(access_token);
        localStorage.setItem("token", access_token);

        // ambil profile user dari API setelah login
        const profile = await getProfile(access_token);
        setUser(profile.user);

        return profile.user;
    };

    const register = async (payload) => {
        const res = await registerRequest(payload);
        const { token: access_token } = res;

        setToken(access_token);
        localStorage.setItem("token", access_token);

        const profile = await getProfile(access_token);
        setUser(profile.user);

        return profile.user;
    };

    const logout = async () => {
        if (token) await logoutRequest(token).catch(() => {});
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                loading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
