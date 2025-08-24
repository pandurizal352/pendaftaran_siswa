import { api } from "./api";

export async function getSiswa() {
    return api.get("/api/siswa");
}

export async function createSiswa(formData) {
    return api.post("/api/siswa", formData, undefined, true); // isForm=true
}

export async function deleteSiswa(id) {
    return api.del(`/api/siswa/${id}`);
}

export async function getPendaftaran() {
    return api.get("/api/pendaftaran");
}
