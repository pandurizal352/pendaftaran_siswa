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
use Illuminate\Support\Facades\Route;

Route::apiResource('siswa', SiswaController::class);
Route::apiResource('riwayat-pendidikan', RiwayatPendidikanController::class);
Route::apiResource('ortu-wali', OrtuWaliController::class);
Route::apiResource('dokumen', DokumenController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('jalur-pendaftaran', JalurPendaftaranController::class);
Route::apiResource('penilaian', PenilaianPendaftaranController::class);
Route::apiResource('pendaftaran', PendaftaranController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
