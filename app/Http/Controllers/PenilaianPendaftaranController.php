<?php

namespace App\Http\Controllers;

use App\Models\Penilaian_pendaftaran;
use Illuminate\Http\Request;

class PenilaianPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $penilaian = Penilaian_pendaftaran::with('pendaftaran')->get();
        return response()->json($penilaian);
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
            'pendaftaran_id' => 'required|integer|exists:pendaftaran,pendaftaran_id',
            'nilai_raport'   => 'required|numeric|min:0',
            'jarak_km'       => 'required|string|min:0',
            'nilai_tes'      => 'required|numeric|min:0',
            'prestasi'       => 'nullable|numeric|min:0',
            'total_nilai'    => 'required|numeric|min:0',
        ]);

        $penilaian = Penilaian_pendaftaran::create($request->all());

        return response()->json([
            'message' => 'Data berhasil dibuat',
            'data' => $penilaian
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $penilaian = Penilaian_pendaftaran::with('pendaftaran')->find($id);
        if (!$penilaian) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($penilaian);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penilaian_pendaftaran $penilaian_pendaftaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $penilaian = Penilaian_pendaftaran::find($id);
        if (!$penilaian) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'pendaftaran_id' => 'required|integer|exists:pendaftaran,pendaftaran_id',
            'nilai_raport'   => 'required|numeric|min:0',
            'jarak_km'       => 'required|string|min:0',
            'nilai_tes'      => 'required|numeric|min:0',
            'prestasi'       => 'nullable|numeric|min:0',
            'total_nilai'    => 'required|numeric|min:0',
        ]);

        $penilaian->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $penilaian
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $penilaian = Penilaian_pendaftaran::find($id);
        if (!$penilaian) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $penilaian->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
