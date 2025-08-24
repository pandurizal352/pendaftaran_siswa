import { api } from "./api";

// LOGIN: kirim email & password ke backend
export async function loginRequest({ email, password }) {
    try {
        const res = await api.post("/api/login", { email, password });
        // backend mengirim { success, user, token }
        return res;
    } catch (err) {
        // realistis: email/password salah
        throw new Error(err.message || "Email atau password salah");
    }
}

// REGISTER
export async function registerRequest(payload) {
    return api.post("/api/users", payload);
}

// GET PROFILE
export async function getProfile(token) {
    return api.get("/api/me", token);
}

// LOGOUT
export async function logoutRequest(token) {
    return api.post("/api/logout", null, token);
}
