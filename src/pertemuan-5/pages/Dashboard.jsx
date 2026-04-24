import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaShoppingBag, FaWallet, FaUsers, FaBan } from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineLightningBolt, HiOutlineDotsVertical } from "react-icons/hi";

// Tambahkan { searchTerm } sebagai props
export default function Dashboard({ searchTerm = "" }) {
    const [selected, setSelected] = useState(null);

    // Data Simulasi Premium
    const recentOrders = [
        { id: "#EX-9921", item: "Wagyu Steak Signature", customer: "Budi Santoso", status: "Selesai", date: "12 Apr 2026", price: "Rp 1.250.000", img: "https://i.pravatar.cc/150?u=a" },
        { id: "#EX-9922", item: "Truffle Pasta Gold", customer: "Siti Aminah", status: "Menunggu", date: "12 Apr 2026", price: "Rp 850.000", img: "https://i.pravatar.cc/150?u=b" },
        { id: "#EX-9923", item: "Dom Perignon Vintage", customer: "Andi Wijaya", status: "Dibatalkan", date: "11 Apr 2026", price: "Rp 4.500.000", img: "https://i.pravatar.cc/150?u=c" },
    ];

    // LOGIKA FILTER: Menyaring data berdasarkan searchTerm dari Header
    const filteredOrders = recentOrders.filter((order) => {
        const search = searchTerm.toLowerCase();
        return (
            order.item.toLowerCase().includes(search) ||
            order.customer.toLowerCase().includes(search) ||
            order.id.toLowerCase().includes(search)
        );
    });

    return (
        <div className="min-h-screen bg-[#FDFDFD] p-12 font-sans relative overflow-hidden text-slate-900">
            
            {/* --- EFEK CAHAYA LATAR --- */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-50/50 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-50/40 blur-[120px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* --- HEADER --- */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
                    <div className="space-y-4">
                        <h1 className="text-7xl font-black tracking-tighter leading-none italic text-slate-950">
                            Dashboard<span className="text-blue-600">.</span>
                        </h1>
                        <p className="text-gray-400 text-xl font-light tracking-wide">
                            {searchTerm ? (
                                <span>Hasil pencarian untuk: <span className="text-blue-600 font-bold italic">"{searchTerm}"</span></span>
                            ) : (
                                <span>Selamat datang kembali, <span className="text-slate-900 font-medium border-b-2 border-blue-100 pb-1">Muhammad Johan</span></span>
                            )}
                        </p>
                    </div>
                    
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-15 group-hover:opacity-40 transition duration-1000"></div>
                        <button className="relative px-10 py-5 bg-white rounded-2xl flex items-center gap-4 border border-gray-100 shadow-xl shadow-gray-100/50 transition-all group-hover:border-gray-200">
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-700">Analisis Mendalam</span>
                            <HiOutlineArrowRight className="text-blue-600 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </header>

                {/* --- KARTU STATISTIK --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        { label: "Volume Pesanan", val: "75", icon: <FaShoppingBag />, color: "blue", trend: "+12%" },
                        { label: "Revenue Eksekutif", val: "Rp 12.8M", icon: <FaWallet />, color: "emerald", trend: "+8%" },
                        { label: "Pelanggan VIP", val: "1,250", icon: <FaUsers />, color: "purple", trend: "-2%" },
                        { label: "Stabilitas Sistem", val: "99.9%", icon: <HiOutlineLightningBolt />, color: "rose", trend: "Optimal" },
                    ].map((stat, i) => (
                        <div 
                            key={i}
                            onClick={() => setSelected(stat.label)}
                            className="group relative p-10 rounded-[3.5rem] bg-white/80 border border-gray-50 backdrop-blur-xl cursor-pointer transition-all duration-700 hover:-translate-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(59,130,246,0.08)] overflow-hidden"
                        >
                            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-${stat.color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:bg-${stat.color}-500 group-hover:text-white transition-all duration-500 shadow-inner`}>
                                {stat.icon}
                            </div>
                            <div className="space-y-1.5 relative z-10">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">{stat.label}</p>
                                <h2 className="text-4xl font-black tracking-tighter text-slate-950">{stat.val}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- TABEL: HASIL FILTER --- */}
                <div className="relative group mb-12">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[4rem] blur-sm opacity-50"></div>
                    <div className="relative bg-white/90 backdrop-blur-3xl rounded-[4rem] border border-gray-100 p-12 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.04)]">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                            <div>
                                <h3 className="text-3xl font-black tracking-tighter italic text-slate-950">
                                    {searchTerm ? "Hasil Pencarian" : "Laporan Transaksi"}
                                </h3>
                                <p className="text-sm font-medium text-gray-400 mt-1">
                                    Menampilkan {filteredOrders.length} transaksi premium.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">
                                    <tr>
                                        <th className="pb-8 pl-6">Serial</th>
                                        <th className="pb-8">Pelanggan VIP</th>
                                        <th className="pb-8">Menu Pilihan</th>
                                        <th className="pb-8">Status</th>
                                        <th className="pb-8 text-right pr-6">Nilai</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr key={order.id} className="group hover:bg-blue-50/30 transition-all duration-500">
                                                <td className="py-8 pl-6 font-mono text-blue-600 tracking-widest text-xs uppercase group-hover:font-bold">{order.id}</td>
                                                <td className="py-8">
                                                    <div className="flex items-center gap-3">
                                                        <img src={order.img} className="w-10 h-10 rounded-full border-2 border-white shadow-md" alt="" />
                                                        <span className="font-bold text-slate-800">{order.customer}</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-slate-600 font-medium">{order.item}</td>
                                                <td className="py-8">
                                                    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${order.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Selesai' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                        {order.status}
                                                    </div>
                                                </td>
                                                <td className="py-8 text-right font-black text-slate-950 tracking-tighter text-lg pr-6">{order.price}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center">
                                                <p className="text-gray-400 italic font-light text-xl">Tidak ada data yang cocok dengan "{searchTerm}"</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER & MODAL TETAP SAMA --- */}
                <div className="text-center p-10 border-t border-gray-100 opacity-60">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Sedap. Management System — Exec Suite v2.1</p>
                </div>

                {selected && (
                    <div className="fixed inset-0 bg-white/60 backdrop-blur-2xl flex items-center justify-center z-50 p-6 animate-in fade-in duration-500">
                        <div className="relative bg-white/90 p-16 rounded-[5rem] w-full max-w-lg text-center shadow-[0_40px_120px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
                            <div className="mb-10 inline-flex p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-blue-600 text-5xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700">✨</div>
                            <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic text-slate-950">{selected}</h2>
                            <p className="text-gray-500 mb-12 font-light leading-relaxed text-lg italic px-6">Proses dekripsi data <span className="text-slate-950 font-bold">{selected}</span>...</p>
                            <button onClick={() => setSelected(null)} className="w-full py-6 rounded-3xl bg-slate-950 text-white font-black text-[11px] tracking-[0.5em] uppercase hover:bg-blue-600 transition-all shadow-2xl shadow-blue-100 active:scale-95">Tutup Protokol</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}