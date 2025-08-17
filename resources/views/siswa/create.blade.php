@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Tambah Data Siswa Lengkap</h1>
        <form action="{{ route('siswa.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    {{-- ====== Data Siswa ====== --}}
    <h3>Data Siswa</h3>
    <div class="mb-3">
        <label>User</label>
        <select name="user_id">
            @foreach(\App\Models\User::all() as $user)
                <option value="{{ $user->user_id }}">{{ $user->username }}</option>
            @endforeach
        </select>
    </div>
    <div class="mb-3">
        <label>NISN</label>
        <input type="text" name="nisn" required>
    </div>
    <div class="mb-3">
        <label>Nama Lengkap</label>
        <input type="text" name="nama_lengkap" required>
    </div>
    <div class="mb-3">
        <label>Jenis Kelamin</label>
        <select name="jenis_kelamin" required>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
        </select>
    </div>
    <div class="mb-3">
        <label>Tempat Lahir</label>
        <input type="text" name="tempat_lahir">
    </div>
    <div class="mb-3">
        <label>Tanggal Lahir</label>
        <input type="date" name="tanggal_lahir">
    </div>
    <div class="mb-3">
        <label>Agama</label>
        <input type="text" name="agama">
    </div>
    <div>
        <label>Alamat</label>
        <textarea name="alamat"></textarea>
    </div>
    <div>
        <label>No HP</label>
        <input type="text" name="no_hp">
    </div>
    <div>
        <label>Email</label>
        <input type="email" name="email">
    </div>
    <div>
        <label>Foto</label>
        <input type="file" name="foto">
    </div>

    <hr>

    {{-- ====== Data Ortu / Wali ====== --}}
    <h3>Data Orang Tua / Wali</h3>
    <div>
        <label>Nama Ayah</label>
        <input type="text" name="nama_ayah">
    </div>
    <div>
        <label>Pekerjaan Ayah</label>
        <input type="text" name="pekerjaan_ayah">
    </div>
    <div>
        <label>Nama Ibu</label>
        <input type="text" name="nama_ibu">
    </div>
    <div>
        <label>Pekerjaan Ibu</label>
        <input type="text" name="pekerjaan_ibu">
    </div>
    <div>
        <label>No HP Ortu</label>
        <input type="text" name="no_hp">
    </div>
    <div>
        <label>Alamat Ortu</label>
        <textarea name="alamat_ortu"></textarea>
    </div>
    <hr>
    {{-- ====== Riwayat Pendidikan ====== --}}
    <h3>Riwayat Pendidikan</h3>
    
    <div>
        <label>Nama Sekolah asal</label>
        <input type="text" name="nama_sekolah_asal">
    </div>
    <div>
        <label>alamat sekolah</label>
        <input type="text" name="alamat_sekolah_asal">
    </div>
    <div>
        <label>rata rata nilai</label>
        <input type="text" name="rata_rata_nilai">
    </div>

    <hr>

    {{-- ====== Dokumen ====== --}}
    <h3>Dokumen</h3>
    <div>
        <label>Jenis Dokumen</label>
        <input type="text" name="jenis_dokumen">
    </div>
     <div>
        <label>tanggal upload</label>
        <input type="date" name="tanggal_upload">
    </div>
    <div>
        <label>jenis_dokumen</label>
        <input type="text" name="jenis_dokumen">
    </div>
    <div>
        <label>File Dokumen</label>
        <input type="file" name="file_path">
    </div>
    <br>
    <button type="submit">Simpan</button>
</form>

</div>
@endsection



