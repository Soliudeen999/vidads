<?php

use App\Http\Controllers\InteractiveElementController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


Route::group(['middleware' => 'auth'], function () {
    Route::get('dashboard', function () {
        $videos = Video::whereBelongsTo(Auth::user())->limit(6)->get();
        return Inertia::render('Dashboard', [
            'videos' => $videos
        ]);
    })->name('dashboard');

    Route::get('videos/{video}/preview', [VideoController::class, 'preview'])->name('videos.preview');
    Route::get('videos/{video}/publish', [VideoController::class, 'publish'])->name('videos.publish');
    Route::get('videos/{video}/unpublish', [VideoController::class, 'unpublish'])->name('videos.unpublish');
    Route::resource('videos', VideoController::class);

    Route::get('interactive-elements/{interactiveElement}/activate', [InteractiveElementController::class, 'activate'])->name('interactive-elements.activate');

    Route::get('interactive-elements/{interactiveElement}/deactivate', [InteractiveElementController::class, 'deactivate'])->name('interactive-elements.deactivate');

    Route::get('videos/{video}/reorder-elements', [InteractiveElementController::class, 'reorder'])->name('interactive-elements.reorder');

    Route::get('interactive-elements/{interactiveElement}/copy', [InteractiveElementController::class, 'copy'])->name('interactive-elements.copy');

    Route::resource('videos.interactive-elements', InteractiveElementController::class)->except(['index', 'show'])->names('videos.interactive-elements');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
