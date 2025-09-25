<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $video_id
 * @property string $type
 * @property string $name
 * @property array<array-key, mixed> $content
 * @property array<array-key, mixed> $position
 * @property array<array-key, mixed> $styling
 * @property int $start_time
 * @property int|null $end_time
 * @property int|null $duration
 * @property array<array-key, mixed>|null $animation
 * @property array<array-key, mixed>|null $interaction
 * @property bool $is_active
 * @property int $z_index
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Video $video
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereAnimation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereInteraction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereStyling($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereVideoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InteractiveElement whereZIndex($value)
 */
	class InteractiveElement extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $two_factor_confirmed_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string|null $title
 * @property string|null $description
 * @property string $source_type
 * @property string|null $source_url
 * @property string|null $video_path
 * @property string|null $thumbnail_url
 * @property int|null $duration
 * @property string|null $settings
 * @property int $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InteractiveElement> $interactiveElements
 * @property-read int|null $interactive_elements_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereSourceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereSourceUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereThumbnailUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Video whereVideoPath($value)
 */
	class Video extends \Eloquent {}
}

