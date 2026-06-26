import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { HiOutlineShoppingCart, HiPlus, HiSearch } from "react-icons/hi";

export default function Orders() {
    const { profile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [search, setSearch] = useState("");
    
    // Modal Form State
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [dataForm, setDataForm] = useState({
        customer_id: "",
        notes: "",
        items: [{ product_id: "", quantity: 1, unit_price: 0 }]
    });

    const loadData = async () => {
        setLoading(true);
        // Load orders beserta nama customernya
        const { data: ord, error: errOrd } = await supabase
            .from("orders")
            .select("*, customers(name)")
            .order("created_at", { ascending: false });

        if (errOrd) setError("Gagal memuat pesanan.");
        else setOrders(ord || []);

        // Load data referensi untuk form tambah order
        const { data: cust } = await supabase.from("customers").select("id, name");
        const { data: prod } = await supabase.from("products").select("id, name, price, stock").eq("is_active", true);
        
        setCustomers(cust || []);
        setProducts(prod || []);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    // Helper untuk generate Order Number unik
    const generateOrderNumber = () => {
        const date = new Date();
        return `ORD-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...dataForm.items];
        newItems[index][field] = value;
        
        // Auto update harga jika product berubah
        if (field === 'product_id') {
            const prod = products.find(p => p.id === value);
            if (prod) newItems[index].unit_price = prod.price;
        }
        
        setDataForm({ ...dataForm, items: newItems });
    };

    const addItemRow = () => {
        setDataForm({
            ...dataForm,
            items: [...dataForm.items, { product_id: "", quantity: 1, unit_price: 0 }]
        });
    };

    const removeItemRow = (index) => {
        const newItems = [...dataForm.items];
        newItems.splice(index, 1);
        setDataForm({ ...dataForm, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            // Validasi
            if (dataForm.items.length === 0 || !dataForm.items[0].product_id) {
                setError("Minimal satu produk harus dipilih.");
                setSubmitting(false);
                return;
            }

            // Hitung total
            const total_amount = dataForm.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

            // 1. Insert Order Header
            const { data: newOrder, error: errOrd } = await supabase
                .from("orders")
                .insert([{
                    order_number: generateOrderNumber(),
                    customer_id: dataForm.customer_id,
                    status: 'completed', // Langsung completed untuk demo/MVP
                    total_amount: total_amount,
                    notes: dataForm.notes,
                    created_by: profile?.id
                }])
                .select()
                .single();

            if (errOrd) throw errOrd;

            // 2. Insert Order Items
            const itemsPayload = dataForm.items.map(item => ({
                order_id: newOrder.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.quantity * item.unit_price
            }));

            const { error: errItems } = await supabase.from("order_items").insert(itemsPayload);
            if (errItems) throw errItems;

            setSuccess("Pesanan berhasil dibuat! Poin loyalty otomatis ditambahkan jika selesai.");
            setShowModal(false);
            loadData();
        } catch (err) {
            setError("Gagal membuat pesanan: " + err.message);
        } finally {
            setTimeout(() => setSuccess(""), 3000);
            setSubmitting(false);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Yakin ingin menghapus pesanan ini secara permanen?")) return;
        
        // 1. Hapus transaksi poin yang terkait pesanan ini agar tidak kena error Foreign Key
        await supabase.from("point_transactions").delete().eq("order_id", id);
        
        // 2. Hapus pesanan (order_items akan otomatis terhapus karena ON DELETE CASCADE)
        const { error: err } = await supabase.from("orders").delete().eq("id", id);
        
        if (err) {
            setError("Gagal menghapus pesanan: " + err.message);
        } else {
            setSuccess("Pesanan berhasil dihapus.");
            loadData();
        }
        setTimeout(() => { setSuccess(""); setError(""); }, 3000);
    };

    const filtered = orders.filter(o => 
        o.order_number.toLowerCase().includes(search.toLowerCase()) || 
        o.customers?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
            <PageHeader title="Pesanan (Orders)" breadcrumb={["Sales", "Pesanan"]}>
                <button
                    onClick={() => {
                        setDataForm({ customer_id: "", notes: "", items: [{ product_id: "", quantity: 1, unit_price: 0 }] });
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-600 transition-all"
                >
                    <HiPlus /> Buat Pesanan Baru
                </button>
            </PageHeader>

            {success && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl">{success}</div>}
            {error && <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl">{error}</div>}

            <div className="mb-6 relative w-full max-w-md">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Cari no. pesanan atau nama pelanggan..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-20"><LoadingSpinner text="Memuat pesanan..." /></div>
                    ) : filtered.length === 0 ? (
                        <div className="py-20"><EmptyState text="Belum ada data pesanan." /></div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">No. Pesanan</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Pelanggan</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Tanggal</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((o) => (
                                    <tr key={o.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-bold text-gray-800">{o.order_number}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-600">{o.customers?.name || "Unknown"}</td>
                                        <td className="px-6 py-4 font-bold text-indigo-600">Rp {o.total_amount.toLocaleString("id-ID")}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                                o.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(o.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDeleteOrder(o.id)}
                                                className="px-3 py-1.5 bg-rose-50 text-rose-600 font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-rose-100 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal Tambah Order */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Pesanan Baru</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pelanggan</label>
                                <select 
                                    value={dataForm.customer_id} 
                                    onChange={e => setDataForm({...dataForm, customer_id: e.target.value})} 
                                    required 
                                    className="w-full p-3 border border-gray-200 rounded-xl"
                                >
                                    <option value="" disabled>-- Pilih Pelanggan --</option>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <label className="block text-sm font-bold text-gray-700 mb-4">Item Produk</label>
                                {dataForm.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-2 mb-3">
                                        <select 
                                            value={item.product_id} 
                                            onChange={e => handleItemChange(idx, 'product_id', e.target.value)}
                                            required
                                            className="flex-1 p-3 border border-gray-200 rounded-xl text-sm"
                                        >
                                            <option value="" disabled>Pilih Produk</option>
                                            {products.map(p => <option key={p.id} value={p.id}>{p.name} - Rp{p.price.toLocaleString()}</option>)}
                                        </select>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            value={item.quantity} 
                                            onChange={e => handleItemChange(idx, 'quantity', parseInt(e.target.value))}
                                            required
                                            className="w-24 p-3 border border-gray-200 rounded-xl text-sm"
                                        />
                                        <button type="button" onClick={() => removeItemRow(idx)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100">✕</button>
                                    </div>
                                ))}
                                <button type="button" onClick={addItemRow} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">+ Tambah Baris Produk</button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
                                <textarea 
                                    value={dataForm.notes} 
                                    onChange={e => setDataForm({...dataForm, notes: e.target.value})} 
                                    className="w-full p-3 border border-gray-200 rounded-xl"
                                    rows="2"
                                />
                            </div>

                            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 text-gray-500 font-bold bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
                                <button type="submit" disabled={submitting} className="flex-1 py-4 text-white font-bold bg-slate-900 rounded-xl hover:bg-indigo-600 disabled:opacity-50">
                                    {submitting ? 'Memproses...' : 'Simpan & Selesaikan Pesanan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}