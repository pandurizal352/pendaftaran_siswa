<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\OrtuWali;
use App\Models\RiwayatPendidikan;
use App\Models\Dokumen;
use Illuminate\Support\Facades\DB;


use Illuminate\Support\Facades\Storage;

use Illuminate\Http\Request;

class SiswaController extends Controller
{
    // Tampilkan semua siswa
    public function index()
    {
        $siswa = Siswa::with('user')->get();
        return response()->json($siswa);
        //blade
        // $siswa = Siswa::with('user')->get();
        // // return view('siswa.index', ('siswa'));
    }

    // Form tambah siswa
    public function create()
    {
        return view('siswa.create');
    }
    // Simpan siswa baru
public function store(Request $request)
    {
        // dd($request->all());
        DB::beginTransaction();
    try {
        // 1️⃣ Simpan Siswa
        $siswa = Siswa::create([
            'user_id'       => $request->user_id,
            'nisn'          => $request->nisn,
            'nama_lengkap'  => $request->nama_lengkap,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tempat_lahir'  => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'agama'         => $request->agama,
            'alamat'        => $request->alamat,
            'no_hp'         => $request->no_hp,
            'email'         => $request->email,
            'foto'          => $request->file('foto')->store('foto_siswa', 'public'),
        ]);

        // 2️⃣ Simpan OrtuWali
        OrtuWali::create([
            'siswa_id'       => $siswa->siswa_id,
            'nama_ayah'      => $request->nama_ayah,
            'pekerjaan_ayah' => $request->pekerjaan_ayah,
            'nama_ibu'       => $request->nama_ibu,
            'pekerjaan_ibu'  => $request->pekerjaan_ibu,
            'no_hp_ortu'          => $request->no_hp_ortu,
            'alamat_ortu'         => $request->alamat_ortu,
        ]);

        // 3️⃣ Simpan Riwayat Pendidikan
        RiwayatPendidikan::create([
            'siswa_id'     => $siswa->siswa_id,
            'nama_sekolah_asal' => $request->nama_sekolah_asal,
            'alamat_sekolah_asal'  => $request->alamat_sekolah_asal,     
            'rata_rata_nilai'  => $request->rata_rata_nilai ,
        ]);

        // 4️⃣ Simpan Dokumen (contoh untuk KK dan Ijazah)
        if ($request->hasFile('kk')) {
            Dokumen::create([
                'siswa_id'      => $siswa->siswa_id,
                'jenis_dokumen' => 'KK',
                'file_path'     => $request->file('kk')->store('dokumen/kk', 'public'),
            ]);
        }

        if ($request->hasFile('ijazah')) {
            Dokumen::create([
                'siswa_id'      => $siswa->siswa_id,
                'jenis_dokumen' => 'Ijazah',
                'file_path'     => $request->file('ijazah')->store('dokumen/ijazah', 'public'),
            ]);
        }

        DB::commit();

        return redirect()->back()->with('success', 'Data siswa berhasil disimpan');

    } catch (\Exception $e) {
    DB::rollBack();
    dd($e->getMessage()); // langsung hentikan dan tampilkan error
}
    }
}



//     public function store(Request $request)
//     {
//         $request->validate([
//             'user_id' => 'required|exists:users,user_id',
//             'nisn' => 'required|unique:siswa,nisn',
//             'nama_lengkap' => 'required',
//             'jenis_kelamin' => 'required',
//             'tempat_lahir' => 'required',
//             'tanggal_lahir' => 'required|date',
//             'agama' => 'required',
//             'alamat' => 'required',
//             'no_hp' => 'required',
//             'email' => 'required|email',
//             'foto' => 'nullable|image|max:2048',
//         ]);

//         $data = $request->all();

//         // Upload foto jika ada
//         if ($request->hasFile('foto')) {
//             $data['foto'] = $request->file('foto')->store('foto_siswa', 'public');
//         }

//         Siswa::create($data);

//         return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil ditambahkan');
//     }

//     // Tampilkan detail siswa
//     public function show($id)
//     {
//         $siswa = Siswa::with('user')->findOrFail($id);
//         return view('siswa.show', compact('siswa'));
//     }

//     // Form edit siswa
//     public function edit($id)
//     {
//         $siswa = Siswa::findOrFail($id);
//         return view('siswa.edit', compact('siswa'));
//     }

//     // Update data siswa
//    public function update(Request $request, $id)
//     {
//         $siswa = Siswa::findOrFail($id);

//         $request->validate([
//             'nisn' => 'required|unique:siswa,nisn,' . $id . ',siswa_id',
//             'nama_lengkap' => 'required',
//             'jenis_kelamin' => 'required',
//             'tempat_lahir' => 'required',
//             'tanggal_lahir' => 'required|date',
//             'agama' => 'required',
//             'alamat' => 'required',
//             'no_hp' => 'required',
//             'email' => 'required|email',
//             'foto' => 'nullable|image|max:2048',
//         ]);

//         $data = $request->all();

//         // Jika upload foto baru
//         if ($request->hasFile('foto')) {
//             // Hapus foto lama
//             if ($siswa->foto && Storage::disk('public')->exists($siswa->foto)) {
//                 Storage::disk('public')->delete($siswa->foto);
//             }
//             $data['foto'] = $request->file('foto')->store('foto_siswa', 'public');
//         }

//         $siswa->update($data);

//         return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil diperbarui');
//     }
//     // Hapus siswa
//     public function destroy($id)
//     {
//         $siswa = Siswa::findOrFail($id);

//         // Hapus foto dari storage
//         if ($siswa->foto && Storage::disk('public')->exists($siswa->foto)) {
//             Storage::disk('public')->delete($siswa->foto);
//         }

//         $siswa->delete();

//         return redirect()->route('siswa.index')->with('success', 'Data siswa berhasil dihapus');
//     }


