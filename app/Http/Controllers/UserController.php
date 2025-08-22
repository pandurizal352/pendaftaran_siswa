<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('siswa')->get(); // ikut relasi siswa
        return response()->json($users);
        // $users = User::all();
        // return view('users.index', compact('users'));
    }

    public function create()
    {
        return view('users.create');
    }

    // POST /users → tambah user baru
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:3',
            'role'     => 'required|string'
        ]);

        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password), // hash password
            'role'     => $request->role,
        ]);

        return response()->json([
            'message' => 'User berhasil ditambahkan',
            'data'    => $user
        ], 201);
    }

    // GET /users/{id} → tampilkan detail user
    public function show($id)
    {
        $user = User::with('siswa')->findOrFail($id);
        return response()->json($user);
    }

    // PUT /users/{id} → update data user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'username' => 'sometimes|string|max:255',
            'email'    => 'sometimes|string|email|unique:users,email,' . $user->user_id . ',user_id',
            'password' => 'nullable|string|min:3',
            'role'     => 'sometimes|string'
        ]);

        $user->username = $request->username ?? $user->username;
        $user->email    = $request->email ?? $user->email;
        $user->role     = $request->role ?? $user->role;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'User berhasil diperbarui',
            'data'    => $user
        ]);
    }

    // DELETE /users/{id} → hapus user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'username' => 'required',
    //         'password' => 'required',
    //         'email' => 'required|email|unique:users,email',
    //         'role' => 'required'
    //     ]);

    //     User::create([
    //         'username' => $request->username,
    //         'password' => Hash::make($request->password),
    //         'email'    => $request->email,
    //         'role'     => $request->role,
    //     ]);

    //     return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan');
    // }

}
