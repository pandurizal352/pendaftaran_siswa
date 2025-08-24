<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';
    protected $primaryKey = 'siswa_id';

    protected $fillable = [
        'user_id',
        'nisn',
        'nama_lengkap',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'alamat',
        'no_hp',
        'email',
        'foto',
    ];

    // Relasi ke Users
    public function user()
    {
        $users = User::all();
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

      public function pendaftaran()
    {
        return $this->hasOne(Pendaftaran::class, 'siswa_id', 'siswa_id');
    }

    // Relasi ke OrtuWali
    public function ortuWali()
    {
        return $this->hasOne(OrtuWali::class, 'siswa_id', 'siswa_id');
    }

    // Relasi ke Riwayat Pendidikan
    public function riwayatPendidikan()
    {
        return $this->hasOne(RiwayatPendidikan::class, 'siswa_id', 'siswa_id');
    }

    // Relasi ke Dokumen
    public function dokumen()
    {
        return $this->hasMany(Dokumen::class, 'siswa_id', 'siswa_id');
    }
}
