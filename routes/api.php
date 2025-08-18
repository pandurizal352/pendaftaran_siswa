<?php

use App\Http\Controllers\OrtuWaliController;
use App\Http\Controllers\RiwayatPendidikanController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

Route::apiResource('siswa', SiswaController::class);
Route::apiResource('riwayat-pendidikan', RiwayatPendidikanController::class);
Route::apiResource('ortu-wali', OrtuWaliController::class);
