<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jalur_pendaftaran extends Model
{
     use HasFactory;

    // Nama tabel (kalau tidak pakai default plural)
    protected $table = 'jalur_pendaftaran';

    // Primary key bukan "id", tapi "jalur_id"
    protected $primaryKey = 'jalur_id';

   
    
    // Kolom yang boleh diisi (fillable)
    protected $fillable = [
        'nama_jalur',
        'keterangan',
    ];
}


