import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingBag, FaWallet, FaUsers } from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineLightningBolt } from "react-icons/hi";

export default function Dashboard({ searchTerm = "" }) {
    const [selected, setSelected] = useState(null);

    const recentOrders = [
        { id: "#EX-9921", item: "Wagyu Steak Signature", customer: "Budi Santoso", status: "Selesai", price: "Rp 1.250.000", img: "https://i.pravatar.cc/150?u=a" },
        { id: "#EX-9922", item: "Truffle Pasta Gold", customer: "Siti Aminah", status: "Menunggu", price: "Rp 850.000", img: "https://i.pravatar.cc/150?u=b" },
        { id: "#EX-9923", item: "Dom Perignon Vintage", customer: "Andi Wijaya", status: "Dibatalkan", price: "Rp 4.500.000", img: "https://i.pravatar.cc/150?u=c" },
    ];

    const filteredOrders = recentOrders.filter((order) => {
        const search = searchTerm.toLowerCase();
        return (
            order.item.toLowerCase().includes(search) ||
            order.customer.toLowerCase().includes(search) ||
            order.id.toLowerCase().includes(search)
        );
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12 relative overflow-hidden text-slate-900 font-sans">

            {/* BACKGROUND DECORATION - Lebih halus & Premium */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/30 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* ✅ HEADER */}
                <PageHeader
                    title="Dashboard"
                    breadcrumb={["Dashboard", "Overview"]}
                >
                    <button className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 hover:scale-105 active:scale-95">
                        <span className="text-xs font-bold uppercase tracking-wider">Analisis</span>
                        <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </PageHeader>

                {/* SUB TEXT */}
                <p className="text-slate-500 mt-2 mb-10 tracking-tight">
                    {searchTerm
                        ? <span>Menampilkan hasil untuk: <b className="text-blue-600 font-semibold">"{searchTerm}"</b></span>
                        : <span>Selamat datang kembali, <b className="text-slate-800 font-bold">Muhammad Johan</b> 👋</span>}
                </p>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Volume Pesanan", val: "75", icon: <FaShoppingBag />, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Revenue", val: "Rp 12.8M", icon: <FaWallet />, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Pelanggan", val: "1,250", icon: <FaUsers />, color: "text-violet-600", bg: "bg-violet-50" },
                        { label: "Stabilitas", val: "99.9%", icon: <HiOutlineLightningBolt />, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            onClick={() => setSelected(stat.label)}
                            className="group p-6 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h2 className="text-3xl font-black text-slate-800 mt-1">{stat.val}</h2>
                        </div>
                    ))}
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <h3 className="text-lg font-bold text-slate-800">
                            {searchTerm ? "Hasil Pencarian" : "Transaksi Terbaru"}
                        </h3>
                        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                            {filteredOrders.length} Data ditemukan
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-slate-400 text-xs uppercase tracking-widest bg-slate-50/50">
                                    <th className="px-6 py-4 font-semibold">ID Transaksi</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Menu Utama</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 text-right font-semibold">Total Harga</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((o) => (
                                        <tr key={o.id} className="group hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">{o.id}</td>
                                            <td className="px-6 py-4 font-medium text-slate-700">{o.customer}</td>
                                            <td className="px-6 py-4 text-slate-600">{o.item}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter
                                                    ${o.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 
                                                      o.status === 'Menunggu' ? 'bg-amber-100 text-amber-700' : 
                                                      'bg-rose-100 text-rose-700'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-900">{o.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20">
                                            <div className="flex flex-col items-center opacity-40">
                                                <FaShoppingBag className="text-4xl mb-2" />
                                                <p className="text-slate-500 font-medium">Tidak ada data yang ditemukan</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL */}
                {selected && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div 
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setSelected(null)}
                        ></div>
                        <div className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center transform transition-all animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                <HiOutlineLightningBolt />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{selected}</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">Detail informasi untuk metrik <span className="font-bold text-slate-800">{selected}</span> akan segera hadir di modul Analisis Pro.</p>
                            <button
                                onClick={() => setSelected(null)}
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg"
                            >
                                Mengerti
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}