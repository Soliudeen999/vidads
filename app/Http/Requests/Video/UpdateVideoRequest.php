<?php

namespace App\Http\Requests\Video;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'source_type' => 'required|string|in:youtube,upload',
            'source_url' => 'sometimes|url|nullable',
            'video_file' => 'sometimes|file|mimes:mp4,mov,avi,wmv,flv,mpeg,mpg,m4v,webm,mkv',
            'thumbnail_url' => 'nullable|url',
            'duration' => 'sometimes|integer',
            'is_published' => 'sometimes|boolean',
        ];
    }
}
