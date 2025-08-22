import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#05445E] text-white px-6 sm:px-10 lg:px-20 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Map */}
        <div className="w-full h-[250px] sm:h-[300px] order-1 lg:order-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4698.60383895108!2d106.8632367112611!3d-6.340246993623008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ecff88d34139%3A0xbcb7966c7c089e58!2sSMA-SMK%20Budi%20Warman%202!5e1!3m2!1sid!2sid!4v1755492723248!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Info Sekolah */}
        <div className="flex flex-col gap-6 order-2 lg:order-2">
          {/* Tentang Sekolah */}
          <div>
            <h3 className="text-lg font-bold mb-2">Tentang Sekolah</h3>
            <p className="text-sm text-white">
              SMA Budhi Warman II berkomitmen memberikan pendidikan berkualitas dengan lingkungan
              belajar yang mendukung perkembangan akademik maupun non-akademik siswa.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-2">Kontak</h3>
            <p className="text-sm">Jl. Raya Bogor No. 123, Jakarta Timur</p>
            <p className="text-sm">Telp: (021) 871-1833</p>
            <p className="text-sm">Email: info@smabudhiwarman2.sch.id</p>
          </div>

          {/* Media Sosial */}
          <div>
            <h3 className="text-lg font-bold mb-2">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/smabw2.official" className="hover:text-yellow-300">Facebook</a>
              <a href="https://www.instagram.com/smkbw2.official" className="hover:text-yellow-300">Instagram</a>
              <a href="https://www.youtube.com/@SMABUDHIWARMAN2" className="hover:text-yellow-300">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-sm text-gray-300 border-t border-gray-500 pt-5">
        © 2025 SMA Budhi Warman II. All rights reserved.
      </div>
    </footer>
  )
}
