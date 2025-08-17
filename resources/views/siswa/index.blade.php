@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Data Siswa</h1>
    <a href="{{ route('siswa.create') }}" class="btn btn-primary mb-3">Tambah Siswa</a>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>NISN</th>
                <th>Nama</th>
                <th>Email</th>
                <th>User</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($siswa as $s)
            <tr>
                <td>{{ $s->nisn }}</td>
                <td>{{ $s->nama_lengkap }}</td>
                <td>{{ $s->email }}</td>
                <td>{{ $s->user->username ?? '-' }}</td>
                <td>
                    <a href="{{ route('siswa.show', $s->siswa_id) }}" class="btn btn-info btn-sm">Detail</a>
                    <a href="{{ route('siswa.edit', $s->siswa_id) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('siswa.destroy', $s->siswa_id) }}" method="POST" style="display:inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Hapus data ini?')" class="btn btn-danger btn-sm">Hapus</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
