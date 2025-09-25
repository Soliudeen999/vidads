<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InteractiveElement extends Model
{
    use HasFactory;

    protected $fillable = [
        'video_id',
        'type',
        'name',
        'content',
        'position',
        'styling',
        'start_time',
        'end_time',
        'duration',
        'animation',
        'interaction',
        'is_active',
        'z_index',
    ];

    protected $casts = [
        'content' => 'array',
        'position' => 'array',
        'styling' => 'array',
        'animation' => 'array',
        'interaction' => 'array',
        'is_active' => 'boolean',
    ];

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    public function getEffectiveEndTime(): int
    {
        if ($this->end_time) {
            return $this->end_time;
        }

        if ($this->duration) {
            return $this->start_time + $this->duration;
        }

        // Default to 5 seconds if no end time specified
        return $this->start_time + 5;
    }

    public function isVisibleAtTime(int $currentTime): bool
    {
        if (!$this->is_active) {
            return false;
        }

        return $currentTime >= $this->start_time && $currentTime <= $this->getEffectiveEndTime();
    }

    public function getPositionStyle(): string
    {
        $position = $this->position;
        $styling = $this->styling;

        $styles = [
            'position' => 'absolute',
            'left' => ($position['x'] ?? 0) . 'px',
            'top' => ($position['y'] ?? 0) . 'px',
            'width' => ($position['width'] ?? 'auto') . 'px',
            'height' => ($position['height'] ?? 'auto') . 'px',
            'z-index' => $this->z_index,
        ];

        if ($styling) {
            if (isset($styling['backgroundColor'])) {
                $styles['background-color'] = $styling['backgroundColor'];
            }
            if (isset($styling['textColor'])) {
                $styles['color'] = $styling['textColor'];
            }
            if (isset($styling['fontSize'])) {
                $styles['font-size'] = $styling['fontSize'] . 'px';
            }
            if (isset($styling['fontFamily'])) {
                $styles['font-family'] = $styling['fontFamily'];
            }
            if (isset($styling['borderRadius'])) {
                $styles['border-radius'] = $styling['borderRadius'] . 'px';
            }
            if (isset($styling['padding'])) {
                $styles['padding'] = $styling['padding'] . 'px';
            }
        }

        return implode('; ', array_map(fn($key, $value) => "$key: $value", array_keys($styles), $styles));
    }
}
