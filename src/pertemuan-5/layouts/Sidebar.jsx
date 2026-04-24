import { useState } from "react";
import { AiFillAppstore, AiFillCustomerService } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { FaPlus, FaChevronRight } from "react-icons/fa";

export default function Sidebar({ activePage, setActivePage }) {
    // List menu disesuaikan dengan ID yang ada di main.jsx
    const menuList = [
        { id: "Dashboard", name: "Dashboard", icon: <AiFillAppstore size={22} /> },
        { id: "Details", name: "Details", icon: <TbListDetails size={22} /> },
        { id: "Services", name: "Services", icon: <AiFillCustomerService size={22} /> },
    ];

    return (
        <div className="w-72 bg-[#F8F9FA] min-h-screen flex flex-col justify-between border-r border-gray-200/60 p-4 sticky top-0 h-screen">
            
            <div>
                {/* Logo Section */}
                <div className="px-4 py-8 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 leading-none">
                                Sedap<span className="text-green-500">.</span>
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium mt-1">MANAGEMENT SYSTEM</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 ml-4 mb-4 uppercase tracking-[2px]">Overview</p>
                    <ul className="space-y-2">
                        {menuList.map((item) => (
                            <li 
                                key={item.id}
                                onClick={() => setActivePage(item.id)} // Mengubah halaman saat diklik
                                className={`group relative flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-500
                                ${activePage === item.id 
                                    ? "bg-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] text-gray-900" 
                                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-700"}`}
                            >
                                <div className="flex items-center gap-4 z-10">
                                    <span className={`${activePage === item.id ? "text-green-500" : "text-gray-400 group-hover:text-green-400"} transition-colors duration-300`}>
                                        {item.icon}
                                    </span>
                                    <span className={`font-semibold text-sm ${activePage === item.id ? "opacity-100" : "opacity-80"}`}>
                                        {item.name}
                                    </span>
                                </div>

                                {activePage === item.id && (
                                    <>
                                        <FaChevronRight size={10} className="text-green-500" />
                                        {/* Indikator Garis Hijau di Samping */}
                                        <div className="absolute left-0 w-1.5 h-6 bg-green-500 rounded-r-full"></div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Footer: Profile Card Section */}
            <div className="relative mt-auto pt-10">
                <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 text-center relative">
                    {/* Floating Avatar */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <div className="relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                                className="w-20 h-20 rounded-3xl border-4 border-white shadow-2xl object-cover rotate-3 hover:rotate-0 transition-transform duration-500"
                                alt="avatar"
                            />
                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h4 className="font-bold text-gray-800 text-sm">Organize Menus</h4>
                        <p className="text-[11px] text-gray-400 mt-1 mb-5">Update your restaurant <br/>list in seconds.</p>
                        
                        <button className="group w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-green-600 text-white text-[11px] font-bold py-3 rounded-2xl transition-all duration-300 active:scale-95">
                            <FaPlus className="group-hover:rotate-90 transition-transform" />
                            ADD NEW MENU
                        </button>
                    </div>
                </div>

                {/* Version Label */}
                <div className="mt-8 px-2 flex justify-between items-center opacity-40 grayscale">
                   <span className="text-[9px] font-bold text-gray-500">SEDAP V.2.0</span>
                   <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                   </div>
                </div>
            </div>
        </div>
    );
}