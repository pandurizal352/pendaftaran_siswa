<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Login
    public function login(Request $request)
{
   $credentials = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required'],
        ]);


         if (! Auth::attempt($credentials, true)) {
        return response()->json([
            'success' => false,
            'message' => 'Login gagal, email atau password salah',
        ], 401);
    }


        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login berhasil',
            'user'    => Auth::user(),
        ]);
}

   

    // Logout
    public function logout(Request $request)
    {
         Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout berhasil']);
    }

    // User detail (cek siapa yang login)
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
