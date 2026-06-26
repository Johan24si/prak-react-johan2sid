import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import LoadingSpinner from "../components/LoadingSpinner";
import { HiArrowLeft, HiStar, HiShoppingBag } from "react-icons/hi";

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [historyOrders, setHistoryOrders] = useState([]);
    const [pointHistory, setPointHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetail = async () => {
            setLoading(true);
            
            // 1. Load data customer & tier
            const { data: custData } = await supabase
                .from("customers")
                .select("*, tiers(name, benefit_description)")
                .eq("id", id)
                .single();
            setCustomer(custData);

            // 2. Load riwayat order untuk customer ini
            const { data: ordData } = await supabase
                .from("orders")
                .select("*")
                .eq("customer_id", id)
                .order("created_at", { ascending: false });
            setHistoryOrders(ordData || []);

            // 3. Load riwayat transaksi poin
            const { data: ptData } = await supabase
                .from("point_transactions")
                .select("*")
                .eq("customer_id", id)
                .order("created_at", { ascending: false });
            setPointHistory(ptData || []);

            setLoading(false);
        };

        if (id) loadDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center"><LoadingSpinner text="Memuat detail intelligence..." /></div>;
    if (!customer) return <div className="min-h-screen bg-[#F8F9FA] p-8 text-center text-red-500 font-bold">Data customer tidak ditemukan.</div>;

    const isGold = customer.tiers?.name === "Gold";
    const tierBg = isGold ? "bg-gradient-to-br from-amber-200 to-orange-400" : "bg-gradient-to-br from-slate-200 to-slate-300";

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
            <button onClick={() => navigate("/customers")} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 mb-6">
                <HiArrowLeft /> Kembali ke Daftar Client
            </button>
            
            <PageHeader title="Client Profile" breadcrumb={["Clients", customer.name]} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
                {/* Kolom Kiri: Profil & Loyalty Card */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Loyalty Card (Tampilan Fisik) */}
                    <div className={`relative w-full aspect-[1.6/1] rounded-[2rem] p-6 text-white shadow-2xl overflow-hidden ${tierBg}`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-80">Sedap. Loyalty</h3>
                                    <p className="text-2xl font-black mt-1 drop-shadow-md">{customer.tiers?.name || "Bronze"} Member</p>
                                </div>
                                <HiStar className="text-4xl text-white/80 drop-shadow-lg" />
                            </div>
                            
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Poin</p>
                                <p className="text-4xl font-black drop-shadow-md">{customer.total_points.toLocaleString()}</p>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <p className="text-lg font-bold tracking-tight">{customer.name}</p>
                                <p className="text-xs font-mono opacity-60">ID: {customer.id.split('-')[0].toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Benefit Info */}
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Benefit Anda saat ini</h4>
                        <p className="text-gray-700 font-medium leading-relaxed">
                            {customer.tiers?.benefit_description || "Tidak ada deskripsi benefit tersedia."}
                        </p>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Informasi Kontak</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-400 font-bold mb-1">Email</p>
                                <p className="text-sm font-semibold text-gray-800">{customer.email || "-"}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold mb-1">No. Telepon</p>
                                <p className="text-sm font-semibold text-gray-800">{customer.phone || "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: History & Ledger */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Riwayat Belanja */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <HiShoppingBag size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Riwayat Pembelian</h3>
                        </div>

                        {historyOrders.length === 0 ? (
                            <p className="text-gray-500 py-4">Belum ada riwayat pembelian.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-gray-100">
                                        <tr>
                                            <th className="py-3 text-xs font-bold text-gray-400 uppercase">No. Pesanan</th>
                                            <th className="py-3 text-xs font-bold text-gray-400 uppercase">Tanggal</th>
                                            <th className="py-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                                            <th className="py-3 text-xs font-bold text-gray-400 uppercase text-right">Total (Rp)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {historyOrders.map(o => (
                                            <tr key={o.id}>
                                                <td className="py-4 font-bold text-gray-800">{o.order_number}</td>
                                                <td className="py-4 text-sm text-gray-500">{new Date(o.created_at).toLocaleDateString('id-ID')}</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right font-bold text-indigo-600">{o.total_amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Buku Poin (Ledger) */}
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                                <HiStar size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Aktivitas Poin</h3>
                        </div>

                        {pointHistory.length === 0 ? (
                            <p className="text-gray-500 py-4">Belum ada aktivitas poin.</p>
                        ) : (
                            <div className="space-y-4">
                                {pointHistory.map(pt => (
                                    <div key={pt.id} className="flex justify-between items-center p-4 rounded-xl border border-gray-50 hover:border-gray-200 transition-colors">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{pt.description}</p>
                                            <p className="text-xs text-gray-400">{new Date(pt.created_at).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <div className={`font-black text-lg ${pt.type === 'earn' ? 'text-green-500' : pt.type === 'redeem' ? 'text-rose-500' : 'text-blue-500'}`}>
                                            {pt.type === 'earn' ? '+' : pt.type === 'redeem' ? '-' : ''}{pt.points}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
