import { useState } from "react";
// PASTIKAN SEMUA ICON INI SUDAH DI IMPORT
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { HiOutlineLightningBolt } from "react-icons/hi"; // <--- INI SERING TERLUPA

export default function Header({ searchTerm, setSearchTerm }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-100">
                
                {/* Search Bar - Trigger Modal */}
                <div className="relative w-full max-w-lg group">
                    <input
                        onClick={() => setShowModal(true)}
                        readOnly // Biar user ngetiknya di dalam modal
                        type="text"
                        placeholder="Cari sesuatu..."
                        className="border border-gray-100 p-2 pr-10 bg-gray-50 w-full rounded-xl outline-none cursor-pointer hover:bg-white transition-all"
                    />
                    <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>

                {/* Icons tetap */}
                <div className="flex items-center space-x-4 ml-4">
                    <div className="relative p-3 bg-blue-50 rounded-2xl text-blue-500">
                        <FaBell />
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold">
                            50
                        </span>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-2xl">
                        <FcAreaChart />
                    </div>

                    <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                        <SlSettings />
                    </div>

                    <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                        <span className="hidden md:inline text-sm">
                            Hello, <span className="font-bold">Muhammad Johan</span>
                        </span>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>

            {/* MODAL SEARCH PREMIUM */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-start justify-center z-[999] pt-20 p-4">
                    <div className="bg-white p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black italic tracking-tighter">Pencarian Dashboard</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-red-500 text-xs font-black uppercase tracking-widest"
                            >
                                Tutup
                            </button>
                        </div>
                        
                        <div className="relative">
                            <input
                                autoFocus
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update state di main.jsx
                                placeholder="Ketik nama makanan, pelanggan, atau ID..."
                                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl text-lg outline-none focus:border-blue-500 transition-all"
                            />
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                                <HiOutlineLightningBolt className="text-amber-500 animate-pulse" />
                                Hasil pencarian akan terupdate otomatis di dashboard
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}