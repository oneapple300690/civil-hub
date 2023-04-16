<?php

use App\Http\Controllers\API\PostController as APIPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware(['auth:sanctum'])->group(function () {
Route::resource('posts', APIPostController::class);
    // Route::get('/get-post', [APIPostController::class, 'edit'])->name('post.edit');
    // Route::post('/post', [APIPostController::class, 'store'])->name('post.store');
    // Route::patch('/post', [APIPostController::class, 'update'])->name('post.update');
    // Route::delete('/post', [APIPostController::class, 'destroy'])->name('post.destroy');
// });
