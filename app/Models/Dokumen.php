<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Dokumen extends Model
{
   use HasFactory;

    protected $table = 'dokumen';
    protected $primaryKey = 'dokumen_id';

    protected $fillable = [
        'siswa_id',
        'jenis_dokumen',
        'tanggal_upload'
    ];

    public function siswa() {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }
}