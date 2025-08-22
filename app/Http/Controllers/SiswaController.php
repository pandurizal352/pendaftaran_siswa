<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\OrtuWali;
use App\Models\RiwayatPendidikan;
use App\Models\Dokumen;
use App\Models\Pendaftaran;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class SiswaController extends Controller
{
    // Tampilkan semua siswa
    public function index()
    {
        $siswa = Siswa::with('user')->get();
        return response()->json($siswa);

    }

    // Form tambah siswa
    public function create()
    {
        return view('siswa.create');
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

        // upload foto siswa
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
        Log::info('Data Ortu berhasil dibuat');

        // 3. Simpan riwayat pendidikan
        RiwayatPendidikan::create([
            'siswa_id'            => $siswa->siswa_id,
            'nama_sekolah_asal'   => $request->nama_sekolah_asal,
            'alamat_sekolah_asal' => $request->alamat_sekolah_asal,
            'rata_rata_nilai'     => $request->rata_rata_nilai,
        ]);
        Log::info('Riwayat pendidikan berhasil dibuat');

        // 4. Upload dokumen (selain foto)
        $dokumen = new Dokumen();
        $dokumen->siswa_id = $siswa->siswa_id;

        if ($request->hasFile('jenis_dokumen')) {
            $pathFile = $request->file('jenis_dokumen')->store('dokumen/lainnya', 'public');
            $dokumen->jenis_dokumen = '/storage/' . $pathFile;
        } else {
            $dokumen->jenis_dokumen = $request->jenis_dokumen;
        }

        $dokumen->tanggal_upload = $request->tanggal_upload;
        $dokumen->save();
        Log::info('Dokumen berhasil diupload');

        // 5. Simpan data pendaftaran (🔥 bagian jalur ada di sini)
        $pendaftaran = Pendaftaran::create([
            'siswa_id'           => $siswa->siswa_id,
            'jalur_id'           => $request->jalur_id, // jalur yang dipilih
            'tanggal_daftar'     => now(),
            'nomor_pendaftaran'  => 'PND-' . strtoupper(uniqid()),
            'status_pendaftaran' => 'pending',
        ]);
        Log::info('Pendaftaran berhasil dibuat dengan ID: ' . $pendaftaran->pendaftaran_id);

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


    // public function store(Request $request)
    // {
    //     set_time_limit(120);

    //     DB::beginTransaction();

    //     try {
    //         Log::info('--- MULAI PENDAFTARAN SISWA ---');

    //         // 1. Simpan data siswa
    //         $dataSiswa = [
    //             'user_id'        => $request->user_id,
    //             'nisn'           => $request->nisn,
    //             'nama_lengkap'   => $request->nama_lengkap,
    //             'jenis_kelamin'  => $request->jenis_kelamin,
    //             'tempat_lahir'   => $request->tempat_lahir,
    //             'tanggal_lahir'  => $request->tanggal_lahir,
    //             'agama'          => $request->agama,
    //             'alamat'         => $request->alamat,
    //             'email'          => $request->email,
    //             'no_hp'          => $request->no_hp,
    //         ];

    //         // upload foto siswa ke tabel siswa
    //         if ($request->hasFile('foto')) {
    //             $pathFoto = $request->file('foto')->store('dokumen/foto', 'public');
    //             $dataSiswa['foto'] = '/storage/' . $pathFoto;
    //         }

    //         $siswa = Siswa::create($dataSiswa);

    //         Log::info('Siswa berhasil dibuat ID: ' . $siswa->siswa_id);

    //         // 2. Simpan data orang tua
    //         OrtuWali::create([
    //             'siswa_id'       => $siswa->siswa_id,
    //             'nama_ayah'      => $request->nama_ayah,
    //             'pekerjaan_ayah' => $request->pekerjaan_ayah,
    //             'nama_ibu'       => $request->nama_ibu,
    //             'pekerjaan_ibu'  => $request->pekerjaan_ibu,
    //             'alamat_ortu'    => $request->alamat_ortu,
    //             'no_hp_ortu'     => $request->no_hp_ortu,
    //         ]);
    //         Log::info('Data Ortu berhasil dibuat');

    //         // 3. Simpan riwayat pendidikan
    //         RiwayatPendidikan::create([
    //             'siswa_id'            => $siswa->siswa_id,
    //             'nama_sekolah_asal'   => $request->nama_sekolah_asal,
    //             'alamat_sekolah_asal' => $request->alamat_sekolah_asal,
    //             'rata_rata_nilai'     => $request->rata_rata_nilai,
    //         ]);
    //         Log::info('Riwayat pendidikan berhasil dibuat');

    //         // 4. Upload file dokumen (selain foto siswa)
    //         $dokumen = new Dokumen();
    //         $dokumen->siswa_id = $siswa->siswa_id;
    //         $dokumen->jenis_dokumen = $request->jenis_dokumen;


    //         if ($request->hasFile('jenis_dokumen')) {
    //         $pathFile = $request->file('jenis_dokumen')->store('dokumen/lainnya', 'public');
    //         $dokumen->jenis_dokumen = '/storage/' . $pathFile;
    //         }
    //         $dokumen->tanggal_upload = $request->tanggal_upload;

    //         $dokumen->save();


    //         Log::info('Dokumen berhasil diupload');

    //         DB::commit();

    //         return response()->json([
    //             'status'  => 'success',
    //             'message' => 'Pendaftaran berhasil',
    //             'data'    => [
    //                 'siswa' => $siswa,
    //             ]
    //         ]);

    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         Log::error('Error pendaftaran: ' . $e->getMessage() . ' Line: ' . $e->getLine());

    //         return response()->json([
    //             'status'  => 'error',
    //             'message' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

            }
