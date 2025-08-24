<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:100|unique:users,username',
            'email'    => 'required|string|email|max:100|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role'     => 'nullable|string'
        ]);

        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role ?? 'user',
        ]);

        // $token = JWTAuth::fromUser($user);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil',
            'user'    => $user,
            'token'   => $token
        ], 201);
    }

    // LOGIN
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string'
        ]);

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email atau password salah'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak bisa membuat token'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'user'    => Auth::user(),
            'token'   => $token
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Logout berhasil'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token invalid atau sudah expired'
            ], 500);
        }
    }

    // GET USER LOGIN (PROFILE)
    public function me(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            return response()->json([
                'success' => true,
                'user'    => $user
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid'
            ], 401);
        }
    }
}
