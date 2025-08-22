<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\OrtuWali;
use App\Models\Dokumen;
use App\Models\RiwayatPendidikan;
use Illuminate\Http\Request;

class RiwayatPendidikanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = RiwayatPendidikan::with('siswa')->get();
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
            'siswa_id' => 'required|exists:siswa,siswa_id',
            'nama_sekolah_asal' => 'required|string|max:255',
            'alamat_sekolah_asal' => 'required|string|max:255',
            'rata_rata_nilai' => 'required|numeric|min:0|max:100',
        ]);

        $data = RiwayatPendidikan::create($validated);

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(RiwayatPendidikan $riwayatPendidikan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatPendidikan $riwayatPendidikan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,siswa_id',
            'nama_sekolah_asal' => 'required|string|max:255',
            'alamat_sekolah_asal' => 'required|string|max:255',
            'rata_rata_nilai' => 'required|numeric|min:0|max:100',
        ]);

        $data = RiwayatPendidikan::findOrFail($id);
        $data->update($validated);

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = RiwayatPendidikan::findOrFail($id);
        $data->delete();

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}
