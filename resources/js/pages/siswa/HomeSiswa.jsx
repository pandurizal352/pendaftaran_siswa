import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules"; // ✅ perbaikan
import { Link } from "react-router-dom"


export default function HomeSiswa() {
//   const kenapaItems = [
//     {
//       title: "Kenapa BW II",
//       subtitle: "Kenapa BW II",
//       img: "http://127.0.0.1:8000/img/Section/Fasilitas.jpg",
//       description:
//         "",
//     },
//     {
//       title: "Unit Sekolah",
//       subtitle: "Unit Sekolah",
//       img: "http://127.0.0.1:8000/img/Section/KenapaBW2.jpg",
//       description:
//         "",
//     },
//     {
//       title: "Fasilitas",
//       subtitle: "Fasilitas",
//       img: "http://127.0.0.1:8000/img/Section/UnitSekolah.jpg",
//       description:
//         "",
//     },
//   ];

  return (
    <div className="flex flex-col min-h-screen scroll-smooth pt-20 -m-5">

      {/* Hero / Gambar Sekolah */}
 <section id="beranda" className="relative w-full h-screen overflow-hidden">
  <img
    src="http://127.0.0.1:8000/img/Landing-img.jpg"
    alt="Gambar Sekolah"
    className="w-full h-[60vh] md:h-screen object-cover"

  />

  {/* Overlay semi-transparent */}
  <div className="absolute inset-0"></div>

  {/* Tombol di tengah gambar */}
  <div className="absolute inset-0 flex items-center justify-center">
    <Link
      to="/pendaftaran"
      className="
        bg-[#05445E] text-white
        px-6 py-3 text-lg   /* default mobile */
        md:px-10 md:py-4 md:text-2xl /* medium screen ke atas */
        rounded-xl shadow-xl font-bold
        transition-transform duration-200 ease-in-out
        hover:bg-[#189AB4] hover:scale-110
        active:bg-[#033F4D] active:scale-95
        focus:outline-none focus:ring-4 focus:ring-[#189AB4] focus:ring-offset-2
        animate-pulse-scale
      "
    >
      Daftar Sekarang !!
    </Link>
  </div>

  <style jsx>{`
    @keyframes pulse-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .animate-pulse-scale {
      animation: pulse-scale 1.5s infinite ease-in-out;
    }
  `}</style>
</section>


      {/* Carousel 3 Poin Kenapa BW II */}
      {/* Carousel 3 Poin Kenapa BW II */}
{/* <section className="py-12 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-8 text-[#05445E]">
      Kenapa
    </h2>
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000 }}
      modules={[Autoplay]}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {kenapaItems.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section> */}

<section className="py-10 bg-gray-50">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-6xl mx-auto px-4">

    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
      <section id="tentang" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">

          {/* Header: Logo + Nama Sekolah */}
          <div className="flex items-center gap-4">
            <img
              src="http://127.0.0.1:8000/img/Logo_Sekolah.png"
              alt="Logo Budhi Warman II"
              className="w-24 h-24 object-contain"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-[#05445E]">SMA Budhi Warman II</h1>
          </div>

          {/* Teks Visi & Misi */}
          <div className="w-full md:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#05445E] text-center">Visi dan Misi</h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Visi</h3>
              <p className="text-gray-700 text-justify">
                Lembaga pendidikan yang unggul dalam proses pendidikan berkeseimbangan,
                dan berprestasi melalui kepeloporan dalam pembaharuan pendidikan yang profesional,
                berkualitas, dan menjadi teladan bagi para peserta didik dan masyarakat semata-mata
                mengharap ridho Allah Yang Maha Esa.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Misi</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Tercapainya proses dan prestasi pendidikan berkualitas dan peningkatan berkelanjutan.</li>
                <li>Tercapainya profesionalisme pelayanan pendidikan.</li>
                <li>Mewujudkan kinerja dan prestasi kinerja pendidikan Yayasan dilandasi keteladanan.</li>
                <li>Terwujudkan proses pendidikan berbasis keseimbangan kompetensi peserta didik; material dan spiritual, serta berkarakter dan berkripadian tangguh (Indonesia).</li>
                <li>Mewujudkan pendidikan praktis agama secara konsisten dalam kegiatan pendidikan.</li>
                <li>Mewujudkan proses pendidikan yang musyawarah dan mufakat (demokratis).</li>
                <li>Mewujudkan akomodasi (fasilitas) pendidikan yang efektif, efisien, dan berkualitas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
  {/* Gallery */}
<div
  id="proyek"
  className="w-full flex justify-center gap-6 py-6 bg-[#05445E] m-0"
>
  <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
    Images
  </div>
  <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
    Images
  </div>
  <div className="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
    Images
  </div>
</div>



      {/* Prestasi Sekolah */}
      <section className="py-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Prestasi Sekolah</h2>
        <div className="bg-gray-300 h-32 flex items-center justify-center">Carousel</div>
      </section>

      {/* Data Jumlah Siswa */}
      <section id="kontak" className="py-6 text-center bg-gray-100">
        <p>Data jumlah siswa yang terdaftar</p>
      </section>

    </div>
  );
}
