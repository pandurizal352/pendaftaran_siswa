<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penilaian_pendaftaran extends Model
{
     use HasFactory;

    // Nama tabel
    protected $table = 'penilaian_pendaftaran';

    // Primary key
    protected $primaryKey = 'penilaian_id';

    // Kolom yang bisa diisi (mass assignment)
    protected $fillable = [
        'pendaftaran_id',
        'nilai_raport',
        'jarak_km',
        'nilai_tes',
        'prestasi',
        'total_nilai',
    ];

    /**
     * Relasi ke tabel pendaftaran
     * Satu penilaian dimiliki oleh satu pendaftaran
     */
    public function pendaftaran()
    {
        return $this->belongsTo(Pendaftaran::class, 'pendaftaran_id', 'pendaftaran_id');
    }
}
