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
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id('pendaftaran_id');
            $table->foreignId('siswa_id')->constrained('siswa', 'siswa_id')->onDelete('cascade');
            $table->foreignId('jalur_id')->constrained('jalur_pendaftaran', 'jalur_id')->onDelete('cascade');
            $table->date('tanggal_daftar');
            $table->string('nomor_pendaftaran');
            $table->string('status_pendaftaran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
