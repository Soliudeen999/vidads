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
        Schema::create('interactive_elements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->constrained()->onDelete('cascade');
            $table->string('type'); // text, image, button, link, etc.
            $table->string('name'); // Element name/identifier
            $table->json('content'); // Element content (text, image URL, etc.)
            $table->json('position'); // x, y coordinates and dimensions
            $table->json('styling'); // colors, fonts, sizes, etc.
            $table->integer('start_time'); // When element appears (seconds)
            $table->integer('end_time')->nullable(); // When element disappears (seconds)
            $table->integer('duration')->nullable(); // How long element stays visible
            $table->json('animation')->nullable(); // Animation settings
            $table->json('interaction')->nullable(); // Click actions, hover effects
            $table->boolean('is_active')->default(true);
            $table->integer('z_index')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interactive_elements');
    }
};
