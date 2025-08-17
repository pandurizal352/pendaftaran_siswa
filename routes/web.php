<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');


// Route::view('/{any}', 'app')->where('any', '.*');

// Route::resource('siswa', SiswaController::class);
// Route::resource('users', UserController::class);