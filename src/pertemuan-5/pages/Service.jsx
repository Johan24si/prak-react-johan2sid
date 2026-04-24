import { useState } from "react";
import { 
  HiOutlineRocketLaunch, HiOutlineCube, HiOutlineSparkles, 
  HiOutlineFingerPrint, HiOutlineAdjustmentsHorizontal 
} from "react-icons/hi2";

export default function Service() {
    const [services, setServices] = useState([
        { id: 1, title: "Pengiriman Pintar", sub: "Logistik Otonom", icon: <HiOutlineRocketLaunch />, active: true, color: "from-blue-500/20 to-cyan-500/20", glow: "group-hover:shadow-blue-500/40" },
        { id: 2, title: "Reservasi Cerdas", sub: "Prediksi Kursi AI", icon: <HiOutlineFingerPrint />, active: true, color: "from-emerald-500/20 to-teal-500/20", glow: "group-hover:shadow-emerald-500/40" },
        { id: 3, title: "Katering Digital", sub: "Skala Acara Besar", icon: <HiOutlineCube />, active: false, color: "from-purple-500/20 to-pink-500/20", glow: "group-hover:shadow-purple-500/40" },
        { id: 4, title: "Promo Otomatis", sub: "Pertumbuhan Dinamis", icon: <HiOutlineSparkles />, active: true, color: "from-orange-500/20 to-red-500/20", glow: "group-hover:shadow-orange-500/40" },
    ]);

    return (
        <div className="relative p-10 min-h-screen bg-[#fafafa] overflow-hidden">
            {/* --- EFEK CAHAYA LATAR (Aura Melayang) --- */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-100/30 blur-[100px] rounded-full"></div>

            <div className="relative max-w-7xl mx-auto">
                
                {/* --- HEADER --- */}
                <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">Sistem Inti Aktif</span>
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
                            Service Settings
                        </h1>
                    </div>
                    
                    <button className="group flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-3xl font-bold text-sm shadow-xl shadow-gray-200/50 hover:bg-black hover:text-white transition-all duration-500">
                        <HiOutlineAdjustmentsHorizontal className="text-xl group-hover:rotate-180 transition-transform duration-700" />
                        PENGATURAN SISTEM
                    </button>
                </header>

                {/* --- KARTU LAYANAN --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {services.map((svc) => (
                        <div 
                            key={svc.id}
                            className="group relative h-[420px] flex flex-col justify-between p-10 rounded-[4rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-4"
                        >
                            {/* Efek Cahaya saat Hover */}
                            <div className={`absolute inset-0 rounded-[4rem] transition-all duration-700 opacity-0 group-hover:opacity-100 shadow-[0_0_80px_-10px] ${svc.glow}`}></div>

                            {/* Bagian Atas: Ikon & Toggle */}
                            <div className="flex justify-between items-start relative z-10">
                                <div className={`w-16 h-16 rounded-[2rem] bg-gradient-to-br ${svc.color} flex items-center justify-center text-3xl text-gray-800 transition-all duration-700 group-hover:rotate-[360deg]`}>
                                    {svc.icon}
                                </div>
                                <div 
                                    onClick={() => setServices(services.map(s => s.id === svc.id ? {...s, active: !s.active} : s))}
                                    className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 ${svc.active ? 'bg-gray-900' : 'bg-gray-200'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-500 transform ${svc.active ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            {/* Bagian Tengah: Konten */}
                            <div className="relative z-10 space-y-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{svc.sub}</p>
                                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{svc.title}</h3>
                            </div>

                            {/* Bagian Bawah: Indikator & Tombol */}
                            <div className="relative z-10">
                                <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                    <span>Status Beban</span>
                                    <span>{svc.active ? 'Optimal' : 'Nonaktif'}</span>
                                </div>
                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                                    <div className={`h-full bg-gray-900 transition-all duration-1000 ${svc.active ? 'w-full' : 'w-0'}`}></div>
                                </div>
                                <button className="w-full py-4 rounded-2xl border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">
                                    Inisialisasi Modul
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER: PANEL KONTROL GELAP --- */}
                <div className="mt-20 relative p-12 rounded-[4rem] bg-black text-white overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500 blur-[120px] opacity-30 rounded-full"></div>
                    
                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tighter italic">Keunggulan Otomatis.</h2>
                            <p className="text-gray-400 max-w-lg font-medium">
                                Sistem Sedap. menggunakan kecerdasan buatan untuk mengelola restoran Anda. Efisiensi maksimal tanpa perlu pemantauan manual setiap saat.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-8 py-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                                <p className="text-3xl font-black tracking-tighter">99.9%</p>
                                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Waktu Aktif</p>
                            </div>
                            <div className="px-8 py-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                                <p className="text-3xl font-black tracking-tighter">0.2s</p>
                                <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Latensi Respon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}