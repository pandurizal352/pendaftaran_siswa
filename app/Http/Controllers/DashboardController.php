<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Jalur_pendaftaran;
use App\Models\Penilaian_pendaftaran;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary()
{
    try {
        $totalSiswa = Siswa::count();
        $totalKriteria = Jalur_pendaftaran::count();
        $totalPenilaian = Penilaian_pendaftaran::count();

      $topSiswa = Penilaian_pendaftaran::select('penilaian_pendaftaran.*')
    ->selectRaw('GREATEST(
        COALESCE(nilai_raport, 0),
        COALESCE(jarak_km, 0),
        COALESCE(nilai_tes, 0),
        COALESCE(prestasi, 0)
    ) as nilai_tertinggi')
    ->orderByDesc('nilai_tertinggi')
    ->with('pendaftaran.siswa')
    ->first();


        return response()->json([
            'totalSiswa' => $totalSiswa,
            'totalKriteria' => $totalKriteria,
            'totalPenilaian' => $totalPenilaian,
            'siswaTeratas' => $topSiswa && $topSiswa->pendaftaran && $topSiswa->pendaftaran->siswa
    ? $topSiswa->pendaftaran->siswa->nama_lengkap
    : '-'

        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function topSiswaPerJalur()
{
    try {
        $data = DB::table('penilaian_pendaftaran as pp')
            ->join('pendaftaran as p', 'pp.pendaftaran_id', '=', 'p.pendaftaran_id') // ganti sesuai pk
            ->join('siswa as s', 'p.siswa_id', '=', 's.siswa_id') // ganti sesuai pk
            ->join('jalur_pendaftaran as j', 'p.jalur_id', '=', 'j.jalur_id') // ganti sesuai pk
            ->select(
                'j.nama_jalur',
                's.nama_lengkap',
                DB::raw('GREATEST(
                    COALESCE(pp.nilai_raport, 0),
                    COALESCE(pp.jarak_km, 0),
                    COALESCE(pp.nilai_tes, 0),
                    COALESCE(pp.prestasi, 0)
                ) as nilai_tertinggi')
            )
            ->orderBy('j.nama_jalur')
            ->orderByDesc('nilai_tertinggi')
            ->get()
            ->groupBy('nama_jalur')
            ->map(function ($items) {
                return $items->first(); // ambil siswa nilai tertinggi tiap jalur
            })
            ->values();

        return response()->json($data);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
}



}
