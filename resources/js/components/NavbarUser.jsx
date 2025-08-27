import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import AlertModal from "../components/AlertModal";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logout, token, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ pisah state dropdown
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // ✅ pisah ref untuk kedua dropdown
  const leaderboardRef = useRef(null);
  const userDropdownRef = useRef(null);

  // ✅ modal states
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const prevIsLoggedIn = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Tutup dropdown klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        leaderboardRef.current &&
        !leaderboardRef.current.contains(event.target)
      ) {
        setShowLeaderboard(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !!user && !!token;
  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    setLogoutModalOpen(true);
  };

  useEffect(() => {
    if (isLoggedIn && !prevIsLoggedIn.current) {
      setLoginModalOpen(true);
    }
    prevIsLoggedIn.current = isLoggedIn;
  }, [isLoggedIn]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-[#05445E]/95 shadow-lg" : "bg-[#05445E]"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              {loading ? (
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  <div className="h-6 w-40 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <img
                    src="http://127.0.0.1:8000/img/Logo_Sekolah.png"
                    alt="Logo"
                    className="h-10 w-10 object-contain"
                  />
                  <h1 className="text-lg sm:text-xl font-bold ml-2">
                    SMA Budhi Warman II
                  </h1>
                </>
              )}
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {loading ? (
                <>
                  <div className="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <a
                    href="/#beranda"
                    className="hover:text-[#189AB4] transition-colors"
                  >
                    Beranda
                  </a>
                  <a
                    href="/#tentang"
                    className="hover:text-[#189AB4] transition-colors"
                  >
                    Tentang
                  </a>
                  <a
                    href="/#proyek"
                    className="hover:text-[#189AB4] transition-colors"
                  >
                    Proyek
                  </a>
                  <a
                    href="/#kontak"
                    className="hover:text-[#189AB4] transition-colors"
                  >
                    Kontak
                  </a>
                </>
              )}

              {loading ? (
                <div className="ml-4 px-8 py-3 bg-gray-300 rounded-md animate-pulse"></div>
              ) : (
                <>
                  {isLoggedIn && (
                    <div className="relative" ref={leaderboardRef}>
                      <button
                        onClick={() => setShowLeaderboard(!showLeaderboard)}
                        className="hover:text-[#189AB4] transition-colors font-semibold cursor-pointer"
                      >
                        Leaderboard
                      </button>
                      <div
                        className={`absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50 overflow-hidden
                                                transform transition-all duration-300 ease-out
                                                ${
                                                  showLeaderboard
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 -translate-y-2 pointer-events-none"
                                                }`}
                      >
                        <NavLink
                          to="/JalurZonasi"
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-[#05445E]"
                        >
                          Jalur Zonasi
                        </NavLink>
                        <NavLink
                          to="/JalurPrestasi"
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-[#05445E]"
                        >
                          Jalur Prestasi
                        </NavLink>
                        <NavLink
                          to="/JalurNilai"
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-[#05445E]"
                        >
                          Jalur Nilai
                        </NavLink>
                      </div>
                    </div>
                  )}

                  {isLoggedIn ? (
                    <div className="relative ml-1" ref={userDropdownRef}>
                      {/* Tombol utama dengan icon user */}
                      <button
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 transition cursor-pointer"
                      >
                        <img
                          src="http://127.0.0.1:8000/img/user.png"
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </button>

                      {/* Dropdown menu */}
                      <div
                        className={`absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden transform transition-all duration-200 ${
                          showUserDropdown
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <NavLink
                          to="/pendaftaran"
                          className="block px-4 py-2 hover:bg-gray-100 hover:text-[#05445E]"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          {user.username}
                        </NavLink>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 ml-4">
                      <a
                        href="http://127.0.0.1:8000/register"
                        className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#05445E] transition"
                      >
                        Register
                      </a>
                      <a
                        href="http://127.0.0.1:8000/login"
                        className="px-4 py-2 bg-[#189AB4] text-white rounded-md hover:bg-[#75E6DA] transition hover:text-[#05445E]"
                      >
                        Login
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Hamburger Mobile */}
            <div className="lg:hidden flex items-center">
              {!isOpen &&
                (loading ? (
                  <div className="w-7 h-7 bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  <button onClick={() => setIsOpen(true)}>
                    <Menu className="w-7 h-7" />
                  </button>
                ))}
            </div>
          </div>
        </div>
   {/* Mobile Menu */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50">
                        <div className="bg-white w-full rounded-lg shadow-lg p-4 mt-16 mb-6 mx-[10px] max-w-full relative text-black overflow-y-auto border-l-4 border-[#05445E]">
                            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-black">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col space-y-2 mt-5">
                                <a href="/#beranda" onClick={handleClose} className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition">Beranda</a>
                                <a href="/#tentang" onClick={handleClose} className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition">Tentang</a>
                                <a href="/#proyek" onClick={handleClose} className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition">Proyek</a>
                                <a href="/#kontak" onClick={handleClose} className="px-3 py-2 rounded hover:bg-[#05445E] hover:text-white transition">Kontak</a>
                                 {isLoggedIn && (
    <>
        <div className="border-t border-black-400 my-4"></div>
        <span className="px-3 py-2 rounded bg-gray-200 cursor-pointer">
            {user.username}
        </span>
        <button
            onClick={() => {
                handleLogout();
                handleClose();
            }}
            className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
        >
            Logout
        </button>
        <div className="mt-2 border-t pt-2">
            <span className="block px-3 py-2 font-semibold text-white bg-[#05445E]">
                Leaderboard
            </span>
            <NavLink
                to="/jalurzonasi"
                onClick={handleClose}
                className={({ isActive }) =>
                    `block px-3 py-2 hover:bg-gray-100 ${
                        isActive ? "font-semibold text-[#189AB4]" : ""
                    }`
                }
            >
                Jalur Zonasi
            </NavLink>
            <NavLink
                to="/jalurprestasi"
                onClick={handleClose}
                className={({ isActive }) =>
                    `block px-3 py-2 hover:bg-gray-100 ${
                        isActive ? "font-semibold text-[#189AB4]" : ""
                    }`
                }
            >
                Jalur Prestasi
            </NavLink>
            <NavLink
                to="/jalurnilai"
                onClick={handleClose}
                className={({ isActive }) =>
                    `block px-3 py-2 hover:bg-gray-100 ${
                        isActive ? "font-semibold text-[#189AB4]" : ""
                    }`
                }
            >
                Jalur Nilai
            </NavLink>
        </div>
    </>
)}


                                {!isLoggedIn && (
                                    <>
                                        <div className="border-t border-black-400 my-4"></div>
                                        <a
                                            href="http://127.0.0.1:8000/login"
                                            onClick={handleClose}
                                            className="px-3 py-2 rounded hover:bg-green-600 hover:text-white transition"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="http://127.0.0.1:8000/register"
                                            onClick={handleClose}
                                            className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition"
                                        >
                                            Register
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

      </nav>
    </>
  );
}


//              <nav>
//                     Navbar content
//                     <AlertModal
//                         isOpen={loginModalOpen}
//                         onClose={() => setLoginModalOpen(false)}
//                         title="Login Berhasil"
//                         message={`Selamat datang, ${user?.username || "User"}!`}
//                         variant="top"
//                         duration={2000}
//                     />
//                     <AlertModal
//                         isOpen={logoutModalOpen}
//                         onClose={() => setLogoutModalOpen(false)}
//                         title="Logout Berhasil"
//                         message="Anda telah berhasil logout dari sistem."
//                         variant="center"
//                         duration={3000}
//                     />
//                 </nav>
