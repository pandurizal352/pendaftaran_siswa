

import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Siswa from "./pages/siswa";
import Pendaftaran from "./component/pendaftaran"; // ini form pendaftaran

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Navigasi sederhana */}
        <nav className="mb-4 space-x-4">
          <Link to="/">Home</Link>
          <Link to="/pendaftaran">Pendaftaran</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Siswa />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
