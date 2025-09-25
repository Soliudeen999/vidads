<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Http\Requests\Video\StoreVideoRequest;
use App\Http\Requests\Video\UpdateVideoRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::query()
                    ->whereBelongsTo(Auth::user())
                    ->withCount('interactiveElements')
                    ->paginate();

        return Inertia::render('videos/Index', [
            'videos' => $videos
        ]);
    }

    public function create()
    {
        return Inertia::render('videos/Create');
    }

    public function store(StoreVideoRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        if ($request->hasFile('video_file')) {
            $data['video_path'] = $request->file('video_file')->store('videos', 'public');
        }
        $video = Video::create($data);
        return redirect()->route('videos.edit', $video)->with('success', 'Video created successfully');
    }

    public function edit(Video $video)
    {
        return Inertia::render('videos/Edit', [
            'video' => $video->loadMissing('interactiveElements')
        ]);
    }

    public function show(Video $video)
    {
        return Inertia::render('videos/Show', [
            'video' => $video->loadMissing('interactiveElements')
        ]);
    }

    public function update(UpdateVideoRequest $request, Video $video)
    {
        $video->update($request->validated());
        return redirect()->back()->with('success', 'Video updated successfully');
    }

    public function destroy(Video $video)
    {
        if ($video->source_type === 'upload') {
            Storage::delete($video->video_path);
        }

        $video->delete();
        return redirect()->route('videos.index');
    }

    public function publish(Video $video)
    {
        $video->update(['is_published' => true]);
        return redirect()->back()->with('success', 'Video published successfully');
    }

    public function unpublish(Video $video)
    {
        $video->update(['is_published' => false]);
        return redirect()->back()->with('success', 'Video unpublished successfully');
    }

    public function preview(Video $video)
    {
        return Inertia::render('videos/Preview', [
            'video' => $video->loadMissing('interactiveElements')
        ]);
    }
}
