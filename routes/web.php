<?php

use App\Http\Controllers\Admin\AdminPostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/dashboard', [AdminPostController::class, 'getAllPosts'])->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/update-post', [AdminPostController::class, 'updatePost'])->middleware(['auth', 'verified'])->name('adminPost.update');
Route::post('/delete-post', [AdminPostController::class, 'deletePost'])->middleware(['auth', 'verified'])->name('adminPost.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
