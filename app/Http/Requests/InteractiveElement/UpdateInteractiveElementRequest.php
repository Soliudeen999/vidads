<?php

namespace App\Http\Requests\InteractiveElement;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInteractiveElementRequest extends FormRequest
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
            'type' => 'required|string|in:text,image,button,link',
            'name' => 'required|string|max:255',
            'content' => 'required|array',
            'position' => 'required|array',
            'styling' => 'required|array',
            'start_time' => 'required|integer',
            'duration' => 'required|integer',
            'animation' => 'required|array',
            'interaction' => 'required|array',
            'is_active' => 'sometimes|boolean',
            'z_index' => 'required|integer',
            'end_time' => 'required|integer',
        ];
    }
}
