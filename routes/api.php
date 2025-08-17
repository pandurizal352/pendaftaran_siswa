<?php

use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

Route::apiResource('siswa', SiswaController::class);
