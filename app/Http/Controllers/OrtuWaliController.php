<?php

namespace App\Http\Controllers;

use App\Models\Siswa;

use App\Models\RiwayatPendidikan;
use App\Models\Dokumen;
use App\Models\OrtuWali;
use Illuminate\Http\Request;

class OrtuWaliController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = OrtuWali::with('siswa')->get();
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
            'nama_ayah'     => 'required|string|max:255',
            'pekerjaan_ayah'=> 'nullable|string|max:255',
            'nama_ibu'      => 'required|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'alamat_ortu'   => 'required|string|max:255',
            'no_hp_ortu'    => 'required|string|max:20',
        ]);

        $data = OrtuWali::create($validated);

        return response()->json([
            'message' => 'Data ortu/wali berhasil ditambahkan',
            'data'    => $data
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
         $data = OrtuWali::with('siswa')->findOrFail($id);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrtuWali $ortuWali)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrtuWali $id)
    {
        $validated = $request->validate([
            'siswa_id'      => 'required|exists:siswa,siswa_id',
            'nama_ayah'     => 'required|string|max:255',
            'pekerjaan_ayah'=> 'nullable|string|max:255',
            'nama_ibu'      => 'required|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'alamat_ortu'   => 'required|string|max:255',
            'no_hp_ortu'    => 'required|string|max:20',
        ]);

        $data = OrtuWali::findOrFail($id);
        $data->update($validated);

        return response()->json([
            'message' => 'Data ortu/wali berhasil diupdate',
            'data'    => $data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = OrtuWali::findOrFail($id);
        $data->delete();

        return response()->json([
            'message' => 'Data ortu/wali berhasil dihapus'
        ]);
    }
}
