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
        Schema::create('riwayat_pendidikan', function (Blueprint $table) {
            $table->id('riwayat_id');
            $table->foreignId('siswa_id')->constrained('siswa', 'siswa_id')->onDelete('cascade');
            $table->string('nama_sekolah_asal');
            $table->text('alamat_sekolah_asal');
            $table->string('rata_rata_nilai');
            $table->timestamps();
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_pendidikan');
    }
};
