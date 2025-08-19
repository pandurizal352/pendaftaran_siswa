<?php

namespace App\Http\Controllers;

use App\Models\Dokumen;
use Illuminate\Http\Request;

class DokumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Dokumen::with('siswa')->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
        'siswa_id'      => 'required|exists:siswa,siswa_id',
        'jenis_dokumen' => 'nullable',
        ]);

        if ($request->hasFile('jenis_dokumen')) {
            $pathFile = $request->file('jenis_dokumen')->store('dokumen', 'public');
            $validated['jenis_dokumen'] = '/storage/' . $pathFile;
            $validated['tanggal_upload'] = now();
        } else {
            // kalau hanya string biasa
            $validated['tanggal_upload'] = now();
        }
        $data = Dokumen::create($validated);

        return response()->json([
            'message' => 'Dokumen berhasil diupload',
            'data'    => $data
        ], 201);
        


        // $validated = $request->validate([
        //     'siswa_id'      => 'required|exists:siswa,siswa_id',
        //     'jenis_dokumen' => 'required|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:2048',
        // ]);

        // // Simpan file ke storage/app/public/dokumen
        // $pathFile = $request->file('jenis_dokumen')->store('dokumen', 'public');

        // $data = Dokumen::create([
        //     'siswa_id'      => $request->siswa_id,
        //     'jenis_dokumen' => '/storage/' . $pathFile, // path untuk akses file
        //     'tanggal_upload'=> now(),
        // ]);

        // return response()->json([
        //     'message' => 'Dokumen berhasil diupload',
        //     'data'    => $data
        // ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Dokumen::with('siswa')->findOrFail($id);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dokumen $dokumen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $dokumen = Dokumen::findOrFail($id);

    $validated = $request->validate([
        'siswa_id'      => 'required|exists:siswa,siswa_id',
        'jenis_dokumen' => 'nullable|string',
        'tanggal_upload'=> 'nullable|date'
    ]);

    // kalau ada file baru diupload
    if ($request->hasFile('jenis_dokumen')) {
        $pathFile = $request->file('jenis_dokumen')->store('dokumen', 'public');
        $validated['jenis_dokumen'] = '/storage/' . $pathFile;
        $validated['tanggal_upload'] = now();
    }

    // update semua field yang tervalidasi
    $dokumen->update($validated);

    return response()->json([
        'message' => 'Dokumen berhasil diperbarui',
        'data'    => $dokumen
    ]);
}

    // public function update(Request $request, $id)
    // {
    //      $dokumen = Dokumen::findOrFail($id);

    //      $validated = $request->validate([
    //         'siswa_id'      => 'required|exists:siswa,siswa_id',
    //         'jenis_dokumen' => 'nullable|string', // BISA string
    //         'tanggal_upload'=> 'nullable|date'
    //     ]);

    //     // kalau ada file diupload
    //     if ($request->hasFile('jenis_dokumen')) {
    //         $pathFile = $request->file('jenis_dokumen')->store('dokumen', 'public');
    //         $validated['jenis_dokumen'] = '/storage/' . $pathFile;
    //         $validated['tanggal_upload'] = now();
    //     }

       

    //     $dokumen->siswa_id = $request->siswa_id;
    //     $dokumen->save();

    //     return response()->json([
    //         'message' => 'Dokumen berhasil diperbarui',
    //         'data'    => $dokumen
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
         $dokumen = Dokumen::findOrFail($id);

        // Hapus file dari storage
        if ($dokumen->jenis_dokumen && file_exists(public_path($dokumen->jenis_dokumen))) {
            unlink(public_path($dokumen->jenis_dokumen));
        }

        $dokumen->delete();

        return response()->json([
            'message' => 'Dokumen berhasil dihapus'
        ]);
    }
}
