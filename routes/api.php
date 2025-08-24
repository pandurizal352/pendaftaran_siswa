<?php

use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\PenilaianPendaftaranController;
use App\Http\Controllers\JalurPendaftaranController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\OrtuWaliController;
use App\Http\Controllers\RiwayatPendidikanController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;



// Route::post('/login', [AuthController::class, 'login']);

// Route::middleware(['auth:sanctum'])->group(function () {

//     // Semua role bisa logout & lihat profil dirinya
//     Route::get('/me', [AuthController::class, 'me']);
//     Route::post('/logout', [AuthController::class, 'logout']);

//     // Hanya role admin
//     Route::middleware('role:admin')->group(function () {
//         Route::apiResource('users', UserController::class);
//         Route::apiResource('siswa', SiswaController::class);
//         Route::apiResource('jalur-pendaftaran', JalurPendaftaranController::class);
//         Route::apiResource('penilaian', PenilaianPendaftaranController::class);
//         Route::apiResource('pendaftaran', PendaftaranController::class);
//     });

//  Route::middleware('role:siswa')->group(function () {
//         Route::apiResource('riwayat-pendidikan', RiwayatPendidikanController::class);
//         Route::apiResource('ortu-wali', OrtuWaliController::class);
//         Route::apiResource('dokumen', DokumenController::class);
//     });
// });


Route::apiResource('siswa', SiswaController::class);
Route::apiResource('riwayat-pendidikan', RiwayatPendidikanController::class);
Route::apiResource('ortu-wali', OrtuWaliController::class);
Route::apiResource('dokumen', DokumenController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('jalur-pendaftaran', JalurPendaftaranController::class);
Route::apiResource('penilaian', PenilaianPendaftaranController::class);
Route::apiResource('pendaftaran', PendaftaranController::class);
Route::get('/top-siswa-jalur', [DashboardController::class, 'topSiswaPerJalur']);
Route::get('/summary', [DashboardController::class, 'summary']);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/me', [AuthController::class, 'me']);
//     Route::post('/logout', [AuthController::class, 'logout']);
// });
