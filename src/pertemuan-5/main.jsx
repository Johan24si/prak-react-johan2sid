import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./assets/tailwind.css";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Service from "./pages/Service";

function App() {
    // State untuk Navigasi Halaman
    const [activePage, setActivePage] = useState("Dashboard");
    
    // State untuk Fitur Pencarian (Wajib ada di sini agar bisa diakses Header & Dashboard)
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] font-sans overflow-hidden">
            {/* Sidebar untuk Navigasi */}
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            <div className="flex-1 flex flex-col relative h-screen overflow-hidden">
                {/* Header menerima searchTerm untuk mengisi data, dan setSearchTerm untuk mengubahnya */}
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
                {/* Area Konten Utama */}
                <div className="flex-1 overflow-y-auto">
                    {/* Halaman Dashboard menerima searchTerm untuk memfilter tabelnya */}
                    {activePage === "Dashboard" && <Dashboard searchTerm={searchTerm} />}
                    
                    {activePage === "Details" && <Details />}
                    {activePage === "Services" && <Service />}
                </div>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);