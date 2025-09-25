<?php

namespace App\Http\Controllers;

use App\Http\Requests\InteractiveElement\StoreInteractiveElementRequest;
use App\Models\InteractiveElement;
use App\Http\Requests\InteractiveElement\UpdateInteractiveElementRequest;
use App\Models\Video;
use Illuminate\Http\Request;

class InteractiveElementController extends Controller
{
    public function store(StoreInteractiveElementRequest $request, Video $video)
    {
        InteractiveElement::create($request->validated() + ['video_id' => $video->id]);
        return redirect()->back()->with('success', 'Interactive element added successfully');
    }

    public function update(UpdateInteractiveElementRequest $request, Video $video, InteractiveElement $interactiveElement)
    {
        $interactiveElement->update($request->validated() + ['video_id' => $video->id]);
        return redirect()->back()->with('success', 'Interactive element updated successfully');
    }

    public function destroy(Video $video, InteractiveElement $interactiveElement)
    {
        $interactiveElement->delete();
        return redirect()->back()->with('success', 'Interactive element deleted successfully');
    }

    public function activate(InteractiveElement $interactiveElement)
    {
        $interactiveElement->update(['is_active' => true]);
        return redirect()->back()->with('success', 'Interactive element activated successfully');
    }

    public function deactivate(InteractiveElement $interactiveElement)
    {
        $interactiveElement->update(['is_active' => false]);
        return redirect()->back()->with('success', 'Interactive element deactivated successfully');
    }

    public function reorder(Video $video)
    {
        $interactiveElements = InteractiveElement::where('video_id', $video->id)->get();
        foreach ($interactiveElements as $interactiveElement) {
            $interactiveElement->update(['z_index' => $interactiveElement->z_index + 1]);
        }
        return redirect()->back()->with('success', 'Interactive elements reordered successfully');
    }

    public function copy(InteractiveElement $interactiveElement)
    {
        $newElement = $interactiveElement->replicate();
        $newName = $newElement->name . ' Copy 1';
        $lastCopy = InteractiveElement::whereLike('name', $newElement->name . ' Copy %')->latest()->first();

        if($lastCopy) {
            $wordCount = explode(' ', $lastCopy->name);
            $number = array_pop($wordCount);
            if(is_numeric($number)) {
                $newName = $newElement->name . ' Copy ' . ($number + 1);
            }
            else {
                $newName = $newElement->name . ' Copy 2';
            }
        }

        $newElement->name = $newName;
        $newElement->save();
        return redirect()->back()->with('success', 'Interactive element copied successfully');
    }
}
