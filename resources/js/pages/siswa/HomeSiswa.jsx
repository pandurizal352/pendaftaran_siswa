import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Users, UserPlus, ChevronDown } from "lucide-react";

import "swiper/css/navigation";
import "swiper/css/pagination";

import { getPendaftaran } from "../../services/siswaService"; // ✅ panggil service

export default function HomeSiswa() {
    const [openIndex, setOpenIndex] = useState(null);
    const [totalPendaftar, setTotalPendaftar] = useState(0);

    const faqs = [
        {
            question: "Apa saja program unggulan di SMA Budhi Warman 2?",
            answer: "SMA Budhi Warman 2 memiliki program unggulan seperti kelas unggulan akademik, ekstrakurikuler beragam (olahraga, seni, dan sains), serta pembinaan karakter dan keagamaan.",
        },
        {
            question: "Bagaimana cara pendaftaran siswa baru?",
            answer: "Pendaftaran dapat dilakukan secara online melalui website resmi sekolah atau langsung datang ke bagian administrasi dengan membawa dokumen persyaratan.",
        },
        {
            question: "Apakah tersedia beasiswa di SMA Budhi Warman 2?",
            answer: "Ya, sekolah menyediakan berbagai program beasiswa baik dari internal maupun kerja sama dengan pihak eksternal bagi siswa berprestasi maupun kurang mampu.",
        },
        {
            question: "Fasilitas apa saja yang dimiliki sekolah?",
            answer: "Fasilitas meliputi ruang kelas modern, laboratorium IPA & komputer, perpustakaan, lapangan olahraga, ruang seni & musik, serta jaringan internet untuk mendukung pembelajaran.",
        },
    ];

    // ✅ ambil total pendaftar dari service
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPendaftaran();
                setTotalPendaftar(data.length); // asumsi API mengembalikan array
            } catch (error) {
                console.error("Gagal ambil total pendaftar:", error);
            }
        };
        fetchData();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // ✅ animasi on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fadeInUp");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".scroll-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col min-h-screen scroll-smooth pt-20 -m-6">
            {/* Hero / Gambar Sekolah */}
            <section
                id="beranda"
                className="relative w-full h-screen overflow-hidden "
            >
                <img
                    src="http://127.0.0.1:8000/img/Landing-img.jpg"
                    alt="Gambar Sekolah"
                    className="w-full h-[60vh] md:h-screen object-cover"
                />
                <div className="absolute inset-0"></div>
                <div className="absolute inset-0 flex items-center justify-center scroll-animate opacity-0">
                    <Link
                        to="/Pendaftaran"
                        className="bg-[#05445E] text-white px-6 py-3 text-lg md:px-10 md:py-4 md:text-2xl rounded-xl shadow-xl font-bold transition-transform duration-200 ease-in-out hover:bg-[#189AB4] hover:scale-110 active:bg-[#033F4D] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#189AB4] focus:ring-offset-2 animate-pulse-scale"
                    >
                        Daftar Sekarang !!
                    </Link>
                </div>
            </section>

            {/* Section 1 */}
            <section className="py-10 bg-gray-50 scroll-animate opacity-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-6xl mx-auto px-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
                        <img
                            src="http://127.0.0.1:8000/img/Section/Fasilitas.jpg"
                            alt="Kenapa BW II"
                            className="w-full h-60 object-contain bg-gray-100"
                        />
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-lg">Fasilitas</h3>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
                        <img
                            src="http://127.0.0.1:8000/img/Section/KenapaBW2.jpg"
                            alt="Unit Sekolah"
                            className="w-full h-60 object-contain bg-gray-100"
                        />
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-lg">Kenapa BW II</h3>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-500">
                        <img
                            src="http://127.0.0.1:8000/img/Section/UnitSekolah.jpg"
                            alt="Fasilitas"
                            className="w-full h-60 object-contain bg-gray-100"
                        />
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-lg">Unit Sekolah</h3>
                        </div>
                    </div>
                </div>
            </section>


            {/* Nama Sekolah + Visi & Misi */}
            <section id="tentang" className="py-16 bg-gray-100 ">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8 ">
                    {/* Header: Logo + Nama Sekolah */}
                    <div className="flex items-center gap-4 scroll-animate opacity-0">
                        <img
                            src="http://127.0.0.1:8000/img/Logo_Sekolah.png"
                            alt="Logo Budhi Warman II"
                            className="w-24 h-24 object-contain"
                        />
                        <h1 className="text-3xl md:text-4xl font-bold text-[#05445E]">
                            SMA Budhi Warman II
                        </h1>
                    </div>

                    {/* Teks Visi & Misi */}
                    <div className="w-full md:w-3/4 ">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#05445E] text-center scroll-animate opacity-0">
                            Visi dan Misi
                        </h2>

                        <div className="mb-6 scroll-animate opacity-0">
                            <h3 className="text-xl font-semibold mb-2">Visi</h3>
                            <p className="text-gray-700 text-justify">
                                Lembaga pendidikan yang unggul dalam proses
                                pendidikan berkeseimbangan, dan berprestasi
                                melalui kepeloporan dalam pembaharuan pendidikan
                                yang profesional, berkualitas, dan menjadi
                                teladan bagi para peserta didik dan masyarakat
                                semata-mata mengharap ridho Allah Yang Maha Esa.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 scroll-animate opacity-0">Misi</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 scroll-animate opacity-0">
                                <li>
                                    Tercapainya proses dan prestasi pendidikan
                                    berkualitas dan peningkatan berkelanjutan.
                                </li>
                                <li>
                                    Tercapainya profesionalisme pelayanan
                                    pendidikan.
                                </li>
                                <li>
                                    Mewujudkan kinerja dan prestasi kinerja
                                    pendidikan Yayasan dilandasi keteladanan.
                                </li>
                                <li>
                                    Terwujudkan proses pendidikan berbasis
                                    keseimbangan kompetensi peserta didik;
                                    material dan spiritual, serta berkarakter
                                    dan berkripadian tangguh (Indonesia).
                                </li>
                                <li>
                                    Mewujudkan pendidikan praktis agama secara
                                    konsisten dalam kegiatan pendidikan.
                                </li>
                                <li>
                                    Mewujudkan proses pendidikan yang musyawarah
                                    dan mufakat (demokratis).
                                </li>
                                <li>
                                    Mewujudkan akomodasi (fasilitas) pendidikan
                                    yang efektif, efisien, dan berkualitas.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* Gambar Fasilitas sekola */}
            <div
                id="proyek"
                className="w-full flex flex-col items-center py-12 bg-[#05445E] "
            >
                {/* Judul */}
                <h2 className="text-3xl font-bold text-white mb-8 tracking-wide scroll-animate opacity-0">
                    Fasilitas Sekolah
                </h2>

                {/* Grid Gambar */}
                <div className="w-full flex flex-wrap justify-center gap-8 scroll-animate opacity-0">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div
                            key={num}
                            className="w-48 h-48 sm:w-50 sm:h-50 bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border-4 border-transparent hover:border-yellow-400"
                        >
                            <img
                                src={`http://127.0.0.1:8000/img/fasilitas/fasilitas_sekolah${num}.jpg`}
                                alt={`Fasilitas ${num}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Prestasi Sekolah */}
            <section className="py-10 px-4 text-center bg-gray-50">
                <h2 className="text-2xl font-bold mb-8 text-[#05445E] scroll-animate opacity-0">
                    Prestasi Sekolah
                </h2>

                <div className="space-y-12 max-w-5xl mx-auto">
                    {/* Prestasi 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-6 text-left scroll-animate opacity-0">
                        <img
                            src="http://127.0.0.1:8000/img/prestasi/prestasi1.jpg"
                            alt="Public Speaking"
                            className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                                SMA Budhi Warman 2 Jakarta, Juara 3 Round Public
                                Speaking Championship 2025
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Prestasi ini diraih oleh salah satu siswa dalam
                                ajang Public Speaking Championship 2025,
                                menunjukkan kemampuan komunikasi, retorika, dan
                                kepercayaan diri siswa. Keberhasilan ini
                                membuktikan bahwa siswa tidak hanya unggul dalam
                                akademik, tetapi juga dalam keterampilan
                                non-akademik yang dibutuhkan di era modern.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                24 June 2025
                            </p>
                        </div>
                    </div>

                    {/* Prestasi 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-6 text-left scroll-animate opacity-0">
                        <img
                            src="http://127.0.0.1:8000/img/prestasi/prestasi2.png"
                            alt="Solo Vokal"
                            className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Juara 1 Solo Vokal FLS2N 2025
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Siswa SMA Budhi Warman 2 Jakarta berhasil meraih
                                Juara 1 Solo Vokal pada Festival dan Lomba Seni
                                Siswa Nasional (FLS2N) 2025. Pencapaian ini
                                mencerminkan pembinaan seni budaya sekolah
                                sekaligus membuktikan kreativitas serta bakat
                                seni siswa.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                18 June 2025
                            </p>
                        </div>
                    </div>

                    {/* Prestasi 3 */}
                    <div className="text-left scroll-animate opacity-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 ">
                            Keterserapan Lulusan SMA Budhi Warman 2 Jakarta
                            Tahun Pelajaran 2024-2025
                        </h3>
                        <p className="text-gray-600">
                            Lulusan sekolah ini berhasil melanjutkan ke berbagai
                            perguruan tinggi ternama, akademi, maupun langsung
                            terserap di dunia kerja sesuai minat dan bakat.
                            Dokumentasi dalam bentuk foto (7 gambar) menampilkan
                            momen siswa yang telah diterima di berbagai
                            universitas dan lembaga, sebagai bukti nyata
                            kualitas pendidikan sekolah.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            12 June 2025
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                <img
                                    key={num}
                                    src={`http://127.0.0.1:8000/img/prestasi/prestasi3-${num}.jpeg`}
                                    alt={`Prestasi 3 - ${num}`}
                                    className="w-full h-40 object-cover rounded-lg shadow"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Pertanyaan */}
            <section className="py-12 bg-[#05445E] " id="faq">
                <div id="kontak" className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-white mb-8 scroll-animate opacity-0">
                        Kenapa Memilih Budhi Warman II
                    </h2>

                    <div className="space-y-4 scroll-animate opacity-0">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-lg shadow-sm bg-gray-50 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    {faq.question}
                                    <ChevronDown
                                        className={`w-5 h-5 transform transition-transform duration-300 ${
                                            openIndex === index
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                <div
                                    className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
                                        openIndex === index
                                            ? "max-h-40 py-2"
                                            : "max-h-0"
                                    }`}
                                >
                                    <p className="text-gray-600">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Jumlah Siswa */}
            <section className="py-10 bg-gray-100 scroll-animate opacity-10">
                <div className="max-w-5xl mx-auto text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Statistik Pendaftaran
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Data jumlah siswa dan pendaftar yang terdaftar saat ini
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Jumlah Siswa */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                        <div>
                            <h3 className="text-gray-600 text-sm">
                                Jumlah Siswa/Siswi SMA Budhi Warman II 25/26
                            </h3>
                            <p className="text-3xl font-bold text-indigo-600">
                                661
                            </p>
                        </div>
                        <Users className="w-10 h-10 text-indigo-500" />
                    </div>

                    {/* Jumlah Pendaftar */}
                    <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
                        <div>
                            <h3 className="text-gray-600 text-sm">
                                Calon Siswa Pendaftar
                            </h3>
                            <p className="text-3xl font-bold text-green-600">
                                {totalPendaftar}
                            </p>
                        </div>
                        <UserPlus className="w-10 h-10 text-green-500" />
                    </div>
                </div>
            </section>
        </div>
    );
}
