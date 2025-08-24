<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // tambahkan ini

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    public function setRememberToken($value) {}
    public function getRememberToken() { return null; }
    public function getRememberTokenName() { return null; }

    protected $table = 'users';
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'username',
        'email',
        'password',
        'role'
    ];

    public function siswa()
    {
        return $this->hasOne(Siswa::class, 'user_id', 'user_id');
    }

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // ==========================
    // JWT Required Functions
    // ==========================
    public function getJWTIdentifier()
    {
        return $this->getKey(); // biasanya user_id
    }

    public function getJWTCustomClaims(): array
    {
        return []; // bisa tambahkan role dsb jika mau
    }
}
