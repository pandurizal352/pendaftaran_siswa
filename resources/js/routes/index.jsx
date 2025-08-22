import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import NotFound from '../pages/NotFound'

// ========== ADMIN ==========
import DashboardAdmin from '../pages/admin/Dashboard'
import ListSiswa from '../pages/admin/ListSiswa'
import Kriteria from '../pages/admin/Kriteria'
import NavbarAdmin from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Laporan from '../pages/admin/Laporan'
import ManajemenUser from '../pages/admin/ManajemenUser'
import ManajemenPendaftaran from '../pages/admin/ManajemenPendaftaran'
import PengaturanSistem from '../pages/admin/PengaturanSistem'
import Perhitungan from '../pages/admin/Perhitungan'

// ========== USER ==========
import Dashboard from '../pages/siswa/HomeSiswa'
import Pendaftaran from '../pages/siswa/Pendaftaran'
import NavbarUser from '../components/NavbarUser'
import FooterUser from '../components/FooterUser'
import JalurNilai from '../pages/siswa/JalurNilai'
import JalurZonasi from '../pages/siswa/JalurZonasi'
import JalurPrestasi from '../pages/siswa/JalurPrestasi'

import { useAuth } from '../contexts/AuthContext'

// ✅ Layout Admin
function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <NavbarAdmin />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 scrollbar-thin scrollbar-thumb-[#189AB4]/50 scrollbar-track-transparent">
          {children}
        </main>
      </div>
    </div>
  )
}

// ✅ Layout User
function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarUser />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </main>
      <FooterUser />
    </div>
  )
}

// ✅ PrivateRoute dengan cek role
function PrivateRoute({ children, role }) {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) return <div className="p-6">Loading...</div>
  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Landing page (info sekolah, akses umum) */}
       <Route
        path="/"
        element={
            <UserLayout>
              <Dashboard />
            </UserLayout>
        }
        />

      {/* ================= USER ROUTES ================= */}
      <Route
        path="/pendaftaran"
        element={
          <PrivateRoute role="user">
            <UserLayout>
              <Pendaftaran />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/jalurnilai"
        element={
          <PrivateRoute role="user">
            <UserLayout>
              <JalurNilai />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/jalurzonasi"
        element={
          <PrivateRoute role="user">
            <UserLayout>
              <JalurZonasi />
            </UserLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/jalurprestasi"
        element={
          <PrivateRoute role="user">
            <UserLayout>
              <JalurPrestasi />
            </UserLayout>
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/siswa"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <ListSiswa />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/kriteria"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <Kriteria />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/laporan"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <Laporan />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/manajemen-user"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <ManajemenUser />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/manajemen-pendaftaran"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <ManajemenPendaftaran />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/pengaturan-sistem"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <PengaturanSistem />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/perhitungan"
        element={
          <PrivateRoute role="admin">
            <AdminLayout>
              <Perhitungan />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
