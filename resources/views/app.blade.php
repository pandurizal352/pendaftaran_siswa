<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    {{-- favicon sekolah --}}
    <link rel="icon" href="{{ asset('img/Logo_Sekolah.png') }}" type="image/png">

    <title>SMA Budhi Warman II</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-gray-100">
    <div id="app"></div>
</body>
</html>
