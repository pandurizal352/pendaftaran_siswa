<?php

namespace App\Http\Controllers;

use App\Models\Jalur_pendaftaran;
use Illuminate\Http\Request;

class JalurPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jalur = Jalur_pendaftaran::all();
        return response()->json($jalur);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_jalur' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $jalur = Jalur_pendaftaran::create([
            'nama_jalur' => $request->nama_jalur,
            'keterangan' => $request->keterangan,
        ]);

        return response()->json([
            'message' => 'Data berhasil dibuat',
            'data' => $jalur
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jalur = Jalur_pendaftaran::find($id);
        if (!$jalur) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($jalur);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jalur_pendaftaran $jalur_pendaftaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
          $jalur = Jalur_pendaftaran::find($id);
        if (!$jalur) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_jalur' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $jalur->update($request->only(['nama_jalur', 'keterangan']));

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $jalur
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
         $jalur = Jalur_pendaftaran::find($id);
        if (!$jalur) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $jalur->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
