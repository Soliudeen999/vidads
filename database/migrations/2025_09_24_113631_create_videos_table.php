<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('source_type')->default('youtube'); // youtube, upload
            $table->string('source_url')->nullable(); // YouTube URL
            $table->string('video_path')->nullable(); // Local video file path
            $table->string('thumbnail_url')->nullable();
            $table->integer('duration')->nullable(); // Duration in seconds
            $table->json('settings')->nullable(); // Video-specific settings
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
