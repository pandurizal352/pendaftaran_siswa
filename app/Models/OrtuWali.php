<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class OrtuWali extends Model
{
    use HasFactory;

    protected $table = 'ortu_wali';
    protected $primaryKey = 'wali_id';

    protected $fillable = [
        'siswa_id',
        'nama_ayah',
        'pekerjaan_ayah',
        'nama_ibu',
        'pekerjaan_ibu',
        'alamat_ortu',
        'no_hp_ortu'

    ];

    public function siswa() {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }
}
