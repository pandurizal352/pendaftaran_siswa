<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\OrtuWali;
use App\Models\RiwayatPendidikan;
use App\Models\Dokumen;
use App\Models\Pendaftaran;
use App\Models\Penilaian_pendaftaran;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class SiswaController extends Controller
{
    // Tampilkan semua siswa
    public function index()
    {
      
       $siswa = Siswa::with(['user', 'pendaftaran.jalur'])->get();
return response()->json($siswa);

    }
public function show($id)
{
$siswa = Siswa::with([
        'user',
        'ortuWali',
        'riwayatPendidikan',
        'pendaftaran.jalur',
        'pendaftaran.penilaian',
    ])->findOrFail($id);

    return response()->json($siswa);
}

    // Form tambah siswa
    public function create()
    {
        return view('siswa.create');
    }

public function update(Request $request, $id)
{
    $siswa = Siswa::findOrFail($id);

    $request->validate([
        'status_pendaftaran' => 'required|string|in:pending,terverifikasi,diterima',
        'jalur_id' => 'nullable|exists:jalur, jalur_id',
        'pendaftaran_id' => 'required|exists:pendaftaran,pendaftaran_id'
    ]);

    // Perbaikan disini!
    $pendaftaran = $siswa->pendaftaran()
        ->where('pendaftaran_id', $request->pendaftaran_id)
        ->first();

    if (!$pendaftaran) {
        return response()->json(['message' => 'Pendaftaran tidak ditemukan'], 404);
    }

    $pendaftaran->update([
        'status_pendaftaran' => $request->status_pendaftaran,
        'jalur_id' => $request->jalur_id ?? $pendaftaran->jalur_id,
    ]);

    return response()->json([
        'message' => 'Pendaftaran berhasil diperbarui',
        'pendaftaran' => $pendaftaran
    ]);
}


   
    // simpan data baru
    public function store(Request $request)
{
    set_time_limit(120); 
    DB::beginTransaction();

    try {
        Log::info('--- MULAI PENDAFTARAN SISWA ---');

        // 1. Simpan data siswa
        $dataSiswa = [
            'user_id'        => $request->user_id,
            'nisn'           => $request->nisn,
            'nama_lengkap'   => $request->nama_lengkap,
            'jenis_kelamin'  => $request->jenis_kelamin,
            'tempat_lahir'   => $request->tempat_lahir,
            'tanggal_lahir'  => $request->tanggal_lahir,
            'agama'          => $request->agama,
            'alamat'         => $request->alamat,
            'email'          => $request->email,
            'no_hp'          => $request->no_hp,
        ];

        if ($request->hasFile('foto')) {
            $pathFoto = $request->file('foto')->store('dokumen/foto', 'public');
            $dataSiswa['foto'] = '/storage/' . $pathFoto;
        }

        $siswa = Siswa::create($dataSiswa);
        Log::info('Siswa berhasil dibuat ID: ' . $siswa->siswa_id);

        // 2. Simpan data orang tua
        OrtuWali::create([
            'siswa_id'       => $siswa->siswa_id,
            'nama_ayah'      => $request->nama_ayah,
            'pekerjaan_ayah' => $request->pekerjaan_ayah,
            'nama_ibu'       => $request->nama_ibu,
            'pekerjaan_ibu'  => $request->pekerjaan_ibu,
            'alamat_ortu'    => $request->alamat_ortu,
            'no_hp_ortu'     => $request->no_hp_ortu,
        ]);

        // 3. Simpan riwayat pendidikan
        RiwayatPendidikan::create([
            'siswa_id'            => $siswa->siswa_id,
            'nama_sekolah_asal'   => $request->nama_sekolah_asal,
            'alamat_sekolah_asal' => $request->alamat_sekolah_asal,
            'rata_rata_nilai'     => $request->rata_rata_nilai,
        ]);

        // 4. Upload dokumen
        if ($request->hasFile('file_path')) {
            foreach ($request->file('file_path') as $index => $file) {
                $pathFile = $file->store('dokumen/lainnya', 'public');

                Dokumen::create([
                    'siswa_id'       => $siswa->siswa_id,
                    'jenis_dokumen'  => $request->jenis_dokumen[$index],
                    'file_path'      => '/storage/' . $pathFile,
                    'tanggal_upload' => now(),
                ]);
            }
        }

        // 5. Simpan data pendaftaran
        $pendaftaran = Pendaftaran::create([
            'siswa_id'           => $siswa->siswa_id,
            'jalur_id'           => $request->jalur_id,
            'tanggal_daftar'     => now(),
            'nomor_pendaftaran'  => 'PND-' . strtoupper(uniqid()),
            'status_pendaftaran' => 'pending',
        ]);

        // 6. Simpan penilaian pendaftaran
        Penilaian_pendaftaran::create([
            'pendaftaran_id' => $pendaftaran->pendaftaran_id,
            'nilai_raport'   => $request->nilai_raport,
            'jarak_km'       => $request->jarak_km,
            'nilai_tes'      => $request->nilai_tes,
            'prestasi'       => $request->prestasi,
            'total_nilai'    => $request->total_nilai,
        ]);

        DB::commit();

        return response()->json([
            'status'  => 'success',
            'message' => 'Pendaftaran berhasil',
            'data'    => [
                'siswa'       => $siswa,
                'pendaftaran' => $pendaftaran
            ]
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error pendaftaran: ' . $e->getMessage() . ' Line: ' . $e->getLine());

        return response()->json([
            'status'  => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
}




}