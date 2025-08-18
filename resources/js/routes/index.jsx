import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/Dashboard'
import Pendaftaran from '../pages/siswa/Pendaftaran'
import ListSiswa from '../pages/admin/ListSiswa'
import NotFound from '../pages/NotFound'
import Navbar from '../components/NavbarUser'   // ✅ huruf besar sesuai file
import Footer from '../components/FooterUser'   // ✅ huruf besar sesuai file
// import Navbar from '../components/Navbar'   // ✅ huruf besar sesuai file
import Sidebar from '../components/Sidebar' // ✅ konsisten
import { useAuth } from '../contexts/AuthContext'
import { DEV_MODE } from '../utils/config'


// ✅ Layout untuk halaman yang butuh login
function PrivateLayout({ children }) {
  return (
    (
    <div className="flex flex-col min-h-screen">
      {/* Navbar di atas */}
      <Navbar />

      {/* Konten utama */}
      <main className="flex-2 p-4 bg-gray-50">
        {children}
      </main>
      <Footer />

    </div>
  )
    // <div className="flex min-h-screen">
    //   <Sidebar />
    //   <div className="flex-1">
    //     <Navbar />
    //     <main className="p-6">{children}</main>
    //   </div>
    // </div>
  )
}

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (DEV_MODE) return children
  if (loading) return <div className="p-6">Loading...</div>
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Layout untuk halaman yang butuh login
// function PrivateLayout({ children }) {
//   return
//   (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <main className="p-6">{children}</main>
//       </div>
//     </div>
//   )
// }

// Route guard
// function PrivateRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth()
//   if (loading) return <div className="p-6">Loading...</div>
//   return isAuthenticated ? children : <Navigate to="/login" replace />
// }

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <Dashboard />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      {/* Pendaftaran */}
      <Route
        path="/pendaftaran"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <Pendaftaran />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      {/* Data Siswa */}
      <Route
        path="/siswa"
        element={
          <PrivateRoute>
            <PrivateLayout>
              <ListSiswa />
            </PrivateLayout>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
