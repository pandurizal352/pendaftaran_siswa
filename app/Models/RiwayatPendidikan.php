<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatPendidikan extends Model
{
   use HasFactory;

    protected $table = 'riwayat_pendidikan';
    protected $primaryKey = 'riwayat_id';

    protected $fillable = [
        'siswa_id',
        'nama_sekolah_asal',
        'alamat_sekolah_asal',
        'rata_rata_nilai'
    ];

    public function siswa() {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

}
