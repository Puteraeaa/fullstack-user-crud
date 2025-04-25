<?php 

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['log.request'])->group(function () {
    // Menambahkan rute apiResource tanpa middleware autentikasi
    Route::apiResource('users', UserController::class);
    Route::put('/api/users/{user}', [UserController::class, 'update']);
});

