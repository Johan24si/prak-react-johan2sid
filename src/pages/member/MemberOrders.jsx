import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";
import { FaShoppingBag, FaStar, FaPlus, FaTrash } from "react-icons/fa";
import { HiOutlineChevronLeft, HiX, HiCheck } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const STATUS_MAP = {
    completed: { label: "Selesai",    cls: "bg-emerald-100 text-emerald-700" },
    draft:     { label: "Draft",      cls: "bg-slate-100 text-slate-600" },
    cancelled: { label: "Dibatalkan", cls: "bg-rose-100 text-rose-700" },
};

const generateOrderNumber = () => {
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(Math.random() * 9000 + 1000);
    return `MBR-${y}${m}${d}-${rand}`;
};

export default function MemberOrders() {
    const { profile, refreshProfile } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [orderItems, setOrderItems] = useState({});

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([{ product_id: "", quantity: 1, unit_price: 0, name: "" }]);
    const [notes, setNotes] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (profile?.role !== "member") return;
        loadAll();
    }, [profile]);

    const loadAll = async () => {
        setLoading(true);
        try {
            // Get customer milik user ini
            const { data: cust } = await supabase
                .from("customers")
                .select("id, total_points, name, tiers(name)")
                .eq("auth_id", profile.id)
                .single();

            if (!cust) return;
            setCustomerId(cust.id);
            setCustomerData(cust);

            // Get orders
            const { data: ordersData } = await supabase
                .from("orders")
                .select("id, order_number, total_amount, status, points_earned, notes, created_at")
                .eq("customer_id", cust.id)
                .order("created_at", { ascending: false });
            setOrders(ordersData || []);

            // Get aktif products untuk dropdown
            const { data: prods } = await supabase
                .from("products")
                .select("id, name, price, stock")
                .eq("is_active", true)
                .gt("stock", 0)
                .order("name");
            setProducts(prods || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ── Item management ──────────────────────────────
    const handleProductChange = (index, productId) => {
        const product = products.find(p => p.id === productId);
        setItems(prev => prev.map((item, i) =>
            i === index
                ? { ...item, product_id: productId, unit_price: product?.price || 0, name: product?.name || "" }
                : item
        ));
    };

    const handleQtyChange = (index, qty) => {
        setItems(prev => prev.map((item, i) =>
            i === index ? { ...item, quantity: Math.max(1, Number(qty)) } : item
        ));
    };

    const addItem = () => setItems(prev => [...prev, { product_id: "", quantity: 1, unit_price: 0, name: "" }]);
    const removeItem = (index) => setItems(prev => prev.filter((_, i) => i !== index));

    const totalAmount = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    const estimatedPoints = Math.floor(totalAmount / 10000);

    const resetModal = () => {
        setItems([{ product_id: "", quantity: 1, unit_price: 0, name: "" }]);
        setNotes("");
        setError("");
        setShowModal(false);
    };

    // ── Submit Order ─────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validItems = items.filter(i => i.product_id);
        if (validItems.length === 0) {
            setError("Pilih minimal satu produk.");
            return;
        }

        setSubmitting(true);
        try {
            // 1. Insert order header (langsung completed)
            const { data: newOrder, error: errOrder } = await supabase
                .from("orders")
                .insert({
                    order_number: generateOrderNumber(),
                    customer_id: customerId,
                    status: "completed",
                    total_amount: totalAmount,
                    points_earned: estimatedPoints,
                    notes: notes || null,
                    created_by: profile.id,
                })
                .select()
                .single();

            if (errOrder) throw errOrder;

            // 2. Insert order items
            const itemsPayload = validItems.map(item => ({
                order_id: newOrder.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.unit_price * item.quantity,
            }));
            const { error: errItems } = await supabase.from("order_items").insert(itemsPayload);
            if (errItems) throw errItems;

            // 3. Tambahkan poin secara manual (karena trigger hanya berjalan saat UPDATE)
            if (estimatedPoints > 0) {
                // Insert ke point_transactions
                await supabase.from("point_transactions").insert({
                    customer_id: customerId,
                    order_id: newOrder.id,
                    points: estimatedPoints,
                    type: "earn",
                    description: `Poin dari pesanan ${newOrder.order_number}`,
                    created_by: profile.id,
                });

                // Update total_points di customers + cek tier
                const { data: updatedCust } = await supabase
                    .from("customers")
                    .update({ total_points: (customerData?.total_points || 0) + estimatedPoints })
                    .eq("id", customerId)
                    .select("total_points")
                    .single();

                // Update tier berdasarkan total poin
                if (updatedCust) {
                    const { data: newTier } = await supabase
                        .from("tiers")
                        .select("id")
                        .lte("min_points", updatedCust.total_points)
                        .order("min_points", { ascending: false })
                        .limit(1)
                        .single();

                    if (newTier) {
                        await supabase.from("customers")
                            .update({ tier_id: newTier.id })
                            .eq("id", customerId);
                    }
                }
            }

            setSuccess(`Pesanan berhasil! Anda mendapat +${estimatedPoints} poin 🎉`);
            setTimeout(() => setSuccess(""), 4000);
            resetModal();
            loadAll();
            refreshProfile();
        } catch (err) {
            setError("Gagal membuat pesanan: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Expand detail items ───────────────────────────
    const loadItems = async (orderId) => {
        if (orderItems[orderId]) return;
        const { data } = await supabase
            .from("order_items")
            .select("id, quantity, unit_price, subtotal, products(name)")
            .eq("order_id", orderId);
        setOrderItems(prev => ({ ...prev, [orderId]: data || [] }));
    };

    const toggleExpand = async (orderId) => {
        if (expanded === orderId) {
            setExpanded(null);
        } else {
            setExpanded(orderId);
            await loadItems(orderId);
        }
    };

    const formatCurrency = (val) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(val);
    const formatDate = (d) =>
        new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/30 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
                    <p className="text-slate-500 font-medium">Memuat riwayat belanja...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20 p-6 md:p-10">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="flex items-start justify-between">
                    <div>
                        <button
                            onClick={() => navigate("/member")}
                            className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 font-medium mb-3 transition"
                        >
                            <HiOutlineChevronLeft /> Kembali ke Dashboard
                        </button>
                        <h1 className="text-3xl font-black text-slate-800">Pesanan Saya</h1>
                        <p className="text-slate-500 text-sm mt-1">Buat pesanan baru atau lihat riwayat belanja Anda</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-green-200 hover:scale-105 active:scale-95 mt-8"
                    >
                        <FaPlus size={12} /> Buat Pesanan
                    </button>
                </div>

                {/* NOTIF SUCCESS */}
                {success && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                            <HiCheck className="text-white font-bold" />
                        </div>
                        <p className="text-emerald-700 font-medium text-sm">{success}</p>
                    </div>
                )}

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                            <FaShoppingBag className="text-blue-500 text-lg" />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Total Pesanan</p>
                        <p className="text-3xl font-black text-slate-800 mt-1">{orders.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                            <FaStar className="text-amber-500 text-lg" />
                        </div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Total Poin</p>
                        <p className="text-3xl font-black text-slate-800 mt-1">
                            {(customerData?.total_points || 0).toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>

                {/* ORDER LIST */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm">
                        <FaShoppingBag className="text-5xl text-slate-200 mx-auto mb-4" />
                        <p className="font-bold text-slate-400">Belum ada pesanan</p>
                        <p className="text-sm text-slate-300 mt-1">Klik "Buat Pesanan" untuk mulai belanja!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.map((order) => {
                            const status = STATUS_MAP[order.status] || { label: order.status, cls: "bg-slate-100 text-slate-500" };
                            const isExpanded = expanded === order.id;

                            return (
                                <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all">
                                    <button
                                        onClick={() => toggleExpand(order.id)}
                                        className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                                <FaShoppingBag className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{order.order_number}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{formatDate(order.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-800">{formatCurrency(order.total_amount)}</p>
                                            <div className="flex items-center gap-2 justify-end mt-1">
                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${status.cls}`}>
                                                    {status.label}
                                                </span>
                                                {order.points_earned > 0 && (
                                                    <span className="text-[10px] font-black text-amber-500">
                                                        +{order.points_earned} pts
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>

                                    {isExpanded && (
                                        <div className="border-t border-slate-100 px-6 pb-5 pt-4 bg-slate-50/50">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Item Pesanan</p>
                                            {orderItems[order.id] ? (
                                                orderItems[order.id].length > 0 ? (
                                                    <div className="space-y-2">
                                                        {orderItems[order.id].map((item) => (
                                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                                <span className="text-slate-700 font-medium">
                                                                    {item.products?.name || "Produk"} × {item.quantity}
                                                                </span>
                                                                <span className="font-bold text-slate-800">{formatCurrency(item.subtotal)}</span>
                                                            </div>
                                                        ))}
                                                        <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-black text-slate-800">
                                                            <span>Total</span>
                                                            <span>{formatCurrency(order.total_amount)}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-slate-400">Tidak ada item.</p>
                                                )
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                                    Memuat item...
                                                </div>
                                            )}
                                            {order.notes && (
                                                <p className="text-xs text-slate-400 mt-3 italic">Catatan: {order.notes}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── MODAL BUAT PESANAN ─────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={resetModal} />
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Buat Pesanan Baru</h3>
                                <p className="text-xs text-slate-400 mt-0.5">Pilih produk untuk dipesan</p>
                            </div>
                            <button
                                onClick={resetModal}
                                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition"
                            >
                                <HiX className="text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Item produk */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700">Produk yang dipesan</label>
                                {items.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <select
                                            value={item.product_id}
                                            onChange={(e) => handleProductChange(index, e.target.value)}
                                            className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                            required
                                        >
                                            <option value="">-- Pilih Produk --</option>
                                            {products.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} — Rp{Number(p.price).toLocaleString("id-ID")}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQtyChange(index, e.target.value)}
                                            className="w-16 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                                        />
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-400 rounded-xl flex items-center justify-center transition shrink-0"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="flex items-center gap-2 text-sm text-green-600 font-bold hover:text-green-700 transition"
                                >
                                    <FaPlus size={10} /> Tambah Produk
                                </button>
                            </div>

                            {/* Catatan */}
                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-1 block">Catatan (opsional)</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                                    placeholder="Tambahkan catatan pesanan..."
                                />
                            </div>

                            {/* Summary */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-600 font-medium">Total Pembayaran</span>
                                    <span className="text-xl font-black text-slate-800">{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Poin yang akan didapat</span>
                                    <span className="text-sm font-black text-amber-500 flex items-center gap-1">
                                        <FaStar size={10} /> +{estimatedPoints} pts
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2">*Setiap Rp 10.000 = 1 poin</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={resetModal}
                                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {submitting
                                        ? <><ImSpinner2 className="animate-spin" /> Memproses...</>
                                        : "Pesan Sekarang 🛒"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
