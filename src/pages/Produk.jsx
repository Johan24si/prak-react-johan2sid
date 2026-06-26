import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { HiPlus, HiPencil, HiTrash, HiSearch, HiCube } from "react-icons/hi";

export default function Produk() {
    const { profile, isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    const [dataForm, setDataForm] = useState({
        name: "", sku: "", price: "", stock: "", category: "", is_active: true
    });

    const loadData = async () => {
        setLoading(true);
        const { data, error: err } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });
        if (err) setError("Gagal memuat data produk.");
        else setProducts(data || []);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDataForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const openAdd = () => {
        setEditTarget(null);
        setDataForm({ name: "", sku: "", price: "", stock: "", category: "", is_active: true });
        setShowModal(true);
    };

    const openEdit = (p) => {
        setEditTarget(p);
        setDataForm({
            name: p.name, sku: p.sku || "", price: p.price, stock: p.stock,
            category: p.category || "", is_active: p.is_active
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const payload = {
                ...dataForm,
                price: Number(dataForm.price),
                stock: Number(dataForm.stock),
                updated_at: new Date().toISOString()
            };

            if (editTarget) {
                const { error: err } = await supabase.from("products").update(payload).eq("id", editTarget.id);
                if (err) setError("Gagal update produk: " + err.message);
                else { setSuccess("Produk diupdate."); setShowModal(false); loadData(); }
            } else {
                payload.created_by = profile?.id;
                const { error: err } = await supabase.from("products").insert([payload]);
                if (err) setError("Gagal tambah produk: " + err.message);
                else { setSuccess("Produk ditambahkan."); setShowModal(false); loadData(); }
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem: " + err.message);
        } finally {
            setTimeout(() => setSuccess(""), 3000);
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
        const { error: err } = await supabase.from("products").delete().eq("id", id);
        
        if (err) {
            // Jika error karena terhubung dengan pesanan (foreign key constraint)
            if (err.code === "23503") {
                setError("Produk tidak bisa dihapus karena sudah ada di riwayat pesanan pelanggan. Silakan klik Edit dan ubah status menjadi 'Nonaktif'.");
            } else {
                setError("Gagal menghapus: " + err.message);
            }
        } else { 
            setSuccess("Produk dihapus."); 
            loadData(); 
        }
        setTimeout(() => setError(""), 6000);
        setTimeout(() => setSuccess(""), 3000);
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
            <PageHeader title="Manajemen Produk" breadcrumb={["Inventory", "Produk"]}>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-all"
                >
                    <HiPlus /> Tambah Produk
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
                    placeholder="Cari produk..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-20"><LoadingSpinner text="Memuat produk..." /></div>
                    ) : filtered.length === 0 ? (
                        <div className="py-20"><EmptyState text="Belum ada data produk." /></div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Produk</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">SKU / Kategori</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Harga</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Stok</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <HiCube size={20} />
                                                </div>
                                                <div className="font-bold text-gray-800">{p.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-semibold">{p.sku || "-"}</div>
                                            <div className="text-xs text-gray-400">{p.category || "-"}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-700">Rp {p.price.toLocaleString("id-ID")}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-700">{p.stock}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {p.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                                    <HiPencil />
                                                </button>
                                                {isAdmin && (
                                                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                        <HiTrash />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{editTarget ? 'Edit Produk' : 'Tambah Produk'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                <input name="name" value={dataForm.name} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                    <input name="sku" value={dataForm.sku} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                    <input name="category" value={dataForm.category} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                                    <input type="number" name="price" value={dataForm.price} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                    <input type="number" name="stock" value={dataForm.stock} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" name="is_active" id="is_active" checked={dataForm.is_active} onChange={handleChange} className="w-4 h-4 text-green-500" />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Produk Aktif</label>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold bg-gray-100 rounded-xl hover:bg-gray-200">Batal</button>
                                <button type="submit" disabled={submitting} className="flex-1 py-3 text-white font-bold bg-green-500 rounded-xl hover:bg-green-600 disabled:opacity-50">
                                    {submitting ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
