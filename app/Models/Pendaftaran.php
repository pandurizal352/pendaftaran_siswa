<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'pendaftaran';

    // Primary key
    protected $primaryKey = 'pendaftaran_id';

    // Kolom yang bisa diisi
    protected $fillable = [
        'siswa_id',
        'jalur_id',
        'tanggal_daftar',
        'nomor_pendaftaran',
        'status_pendaftaran',
    ];

    /**
     * Relasi ke siswa
     * Satu pendaftaran dimiliki oleh satu siswa
     */
    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id', 'siswa_id');
    }

    /**
     * Relasi ke jalur pendaftaran
     * Satu pendaftaran menggunakan satu jalur pendaftaran
     */
    public function jalur()
    {
        return $this->belongsTo(Jalur_pendaftaran::class, 'jalur_id', 'jalur_id');
    }

    /**
     * Relasi ke penilaian
     * Satu pendaftaran bisa punya satu atau lebih penilaian
     */
    public function penilaian()
    {
        return $this->hasMany(Penilaian_pendaftaran::class, 'pendaftaran_id', 'pendaftaran_id');
    }
}
