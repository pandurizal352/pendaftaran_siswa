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
        Schema::create('penilaian_pendaftaran', function (Blueprint $table) {
            $table->id('penilaian_id');
            $table->foreignId('pendaftaran_id')->constrained('pendaftaran', 'pendaftaran_id')->onDelete('cascade');
            $table->string('nilai_raport')->nullable();
            $table->string('jarak_km')->nullable();
            $table->string('nilai_tes')->nullable();
            $table->string('prestasi')->nullable();
            $table->string('total_nilai')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaian_pendaftaran');
    }
};
