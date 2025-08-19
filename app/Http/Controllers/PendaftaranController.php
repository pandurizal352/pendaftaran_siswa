<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;

class PendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pendaftaran = Pendaftaran::with(['siswa', 'jalur', 'penilaian'])->get();
        return response()->json($pendaftaran);
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
         $request->validate([
            'siswa_id' => 'required|integer|exists:siswa,siswa_id',
            'jalur_id' => 'required|integer|exists:jalur_pendaftaran,jalur_id',
            'tanggal_daftar' => 'required|date',
            'nomor_pendaftaran' => 'required|string|max:50',
            'status_pendaftaran' => 'required|string|max:50',
        ]);

        $pendaftaran = Pendaftaran::create($request->all());

        return response()->json([
            'message' => 'Data berhasil dibuat',
            'data' => $pendaftaran
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $pendaftaran = Pendaftaran::with(['siswa', 'jalur', 'penilaian'])->find($id);
        if (!$pendaftaran) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($pendaftaran);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pendaftaran $pendaftaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $pendaftaran = Pendaftaran::find($id);
        if (!$pendaftaran) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'siswa_id' => 'required|integer|exists:siswa,siswa_id',
            'jalur_id' => 'required|integer|exists:jalur_pendaftaran,jalur_id',
            'tanggal_daftar' => 'required|date',
            'nomor_pendaftaran' => 'required|string|max:50',
            'status_pendaftaran' => 'required|string|max:50',
        ]);

        $pendaftaran->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $pendaftaran
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pendaftaran = Pendaftaran::find($id);
        if (!$pendaftaran) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $pendaftaran->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    
    }
}
