// import './bootstrap';
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import Siswa from "./pages/siswa";
// import Pendaftaran from "./component/pendaftaran"; // ini form pendaftaran
// import Navbar from "./component/navbar"; // ini form pendaftaran

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 p-4">
//         {/* Navigasi sederhana */}
//         <nav className="mb-4 space-x-4">
//           <Link to="/Dasboard">Dashboard</Link>
//           <Link to="/pendaftaran">Pendaftaran</Link>
//           <Link to="/Kriteria">Kriteria</Link>
//           <Link to="/perangkingan">Perhitungan</Link>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Siswa />} />
//           <Route path="/pendaftaran" element={<Pendaftaran />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// ReactDOM.createRoot(document.getElementById("app")).render(<App />);

import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />)
