import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { FaStar, FaGift, FaShoppingBag, FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { HiOutlineArrowRight, HiSparkles } from "react-icons/hi";

const TIER_CONFIG = {
    Gold:     { color: "from-amber-400 to-yellow-500",   badge: "from-yellow-600 to-amber-500",  icon: <FaCrown />,  textColor: "text-amber-600" },
    Silver:   { color: "from-slate-400 to-gray-500",     badge: "from-slate-600 to-gray-500",    icon: <FaMedal />,  textColor: "text-slate-600" },
    Platinum: { color: "from-purple-400 to-violet-600",  badge: "from-purple-700 to-violet-600", icon: <FaTrophy />, textColor: "text-purple-600" },
    Bronze:   { color: "from-orange-400 to-amber-600",   badge: "from-orange-600 to-amber-500",  icon: <FaStar />,   textColor: "text-orange-600" },
};

export default function MemberDashboard() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentPoints, setRecentPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.role !== "member") return;
        loadData();
    }, [profile]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch data customer + tier milik user yang login
            const { data: cust } = await supabase
                .from("customers")
                .select("*, tiers(name, benefit_description, min_points)")
                .eq("auth_id", profile.id)
                .single();

            setCustomerData(cust);

            if (cust?.id) {
                // Fetch 5 pesanan terbaru
                const { data: orders } = await supabase
                    .from("orders")
                    .select("id, order_number, total_amount, status, created_at, points_earned")
                    .eq("customer_id", cust.id)
                    .order("created_at", { ascending: false })
                    .limit(5);
                setRecentOrders(orders || []);

                // Fetch 5 transaksi poin terbaru
                const { data: pts } = await supabase
                    .from("point_transactions")
                    .select("id, points, type, description, created_at")
                    .eq("customer_id", cust.id)
                    .order("created_at", { ascending: false })
                    .limit(5);
                setRecentPoints(pts || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const tierName = customerData?.tiers?.name || "Bronze";
    const tierConf = TIER_CONFIG[tierName] || TIER_CONFIG["Bronze"];
    const totalPts = customerData?.total_points || 0;
    const nextTierPts = customerData?.tiers?.min_points ? customerData.tiers.min_points * 2 : 500;
    const ptsProgress = Math.min((totalPts / nextTierPts) * 100, 100);

    const formatCurrency = (val) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);
    const formatDate = (d) => new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
                    <p className="text-slate-500 font-medium">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20 p-6 md:p-10">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* GREETING */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">Portal Member</p>
                        <h1 className="text-3xl font-black text-slate-800 mt-1">
                            Halo, {profile?.full_name?.split(" ")[0]} 👋
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">Selamat datang di dashboard loyalty Anda</p>
                    </div>
                    <div className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${tierConf.badge} text-white text-sm font-black flex items-center gap-2 shadow-lg`}>
                        <span>{tierConf.icon}</span>
                        <span>Member {tierName}</span>
                    </div>
                </div>

                {/* LOYALTY CARD (HERO) */}
                <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${tierConf.color} p-8 text-white shadow-2xl`}>
                    {/* Decorative circles */}
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full" />
                    <div className="absolute top-1/2 right-20 w-20 h-20 bg-white/5 rounded-full" />

                    <div className="relative z-10">
                        {/* Chip + Logo */}
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <div className="w-12 h-9 bg-white/30 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <div className="w-8 h-6 bg-gradient-to-br from-white/60 to-white/20 rounded" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                <HiSparkles className="text-white text-lg" />
                                <span className="text-sm font-black tracking-wider">SEDAP LOYALTY</span>
                            </div>
                        </div>

                        {/* Points Display */}
                        <div className="mb-8">
                            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Total Poin Anda</p>
                            <div className="flex items-end gap-3">
                                <h2 className="text-6xl font-black leading-none">{totalPts.toLocaleString("id-ID")}</h2>
                                <span className="text-white/70 text-lg font-bold mb-2">pts</span>
                            </div>
                        </div>

                        {/* Name + tier */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-widest">Nama Pemegang</p>
                                <p className="text-xl font-black tracking-wide mt-0.5">{profile?.full_name?.toUpperCase()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/60 text-xs uppercase tracking-widest">Tier</p>
                                <p className="text-xl font-black mt-0.5">{tierName.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[
                        {
                            label: "Total Poin",
                            value: `${totalPts.toLocaleString("id-ID")} pts`,
                            icon: <FaStar className="text-amber-500 text-2xl" />,
                            bg: "bg-amber-50",
                        },
                        {
                            label: "Total Pesanan",
                            value: `${recentOrders.length} pesanan`,
                            icon: <FaShoppingBag className="text-blue-500 text-2xl" />,
                            bg: "bg-blue-50",
                        },
                        {
                            label: "Benefit Tier",
                            value: customerData?.tiers?.benefit_description || "-",
                            icon: <FaGift className="text-green-500 text-2xl" />,
                            bg: "bg-green-50",
                        },
                    ].map((card, i) => (
                        <div key={i} className={`${card.bg} rounded-2xl p-6 flex items-start gap-4 border border-white shadow-sm`}>
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{card.label}</p>
                                <p className="text-lg font-black text-slate-800 mt-1 leading-tight">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* POIN PROGRESS */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-slate-800">Progress ke Tier Berikutnya</h3>
                        <span className="text-xs text-slate-400">{totalPts} / {nextTierPts} pts</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-gradient-to-r ${tierConf.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${ptsProgress}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{Math.max(0, nextTierPts - totalPts)} poin lagi untuk naik tier</p>
                </div>

                {/* RIWAYAT PESANAN */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Pesanan Terbaru</h3>
                        <button
                            onClick={() => navigate("/member/orders")}
                            className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 transition"
                        >
                            Lihat Semua <HiOutlineArrowRight />
                        </button>
                    </div>
                    {recentOrders.length === 0 ? (
                        <div className="text-center py-16 text-slate-300">
                            <FaShoppingBag className="text-5xl mx-auto mb-3" />
                            <p className="font-medium text-slate-400">Belum ada pesanan</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {recentOrders.map((o) => (
                                <div key={o.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition">
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm">{o.order_number}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{formatDate(o.created_at)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-800">{formatCurrency(o.total_amount)}</p>
                                        {o.points_earned > 0 && (
                                            <p className="text-xs text-amber-500 font-bold mt-0.5">+{o.points_earned} pts</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
