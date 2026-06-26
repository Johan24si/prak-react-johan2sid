import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
    HiUserAdd, HiMail, HiPhone, HiBadgeCheck,
    HiDotsVertical, HiSearch, HiFilter, HiOutlineCloudDownload,
    HiTrendingUp, HiPencil, HiTrash, HiEye
} from "react-icons/hi";

const TIER_STYLES = {
    Gold:   "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)]",
    Silver: "bg-slate-200 text-slate-700",
    Bronze: "bg-white text-slate-500 border border-slate-100",
};

export default function Customers() {
    const { profile, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);
    const [dataForm, setDataForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [submitting, setSubmitting] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const [custRes, tierRes] = await Promise.all([
            supabase.from("customers").select("*, tiers(name)").order("created_at", { ascending: false }),
            supabase.from("tiers").select("*").order("sort_order"),
        ]);
        if (custRes.error) setError("Gagal memuat data customer.");
        else setCustomers(custRes.data || []);
        if (!tierRes.error) setTiers(tierRes.data || []);
        setLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm(prev => ({ ...prev, [name]: value }));
    };

    const openAdd = () => {
        setEditTarget(null);
        setDataForm({ name: "", email: "", phone: "", address: "" });
        setShowModal(true);
    };

    const openEdit = (c) => {
        setEditTarget(c);
        setDataForm({ name: c.name, email: c.email || "", phone: c.phone || "", address: c.address || "" });
        setMenuOpen(null);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            if (editTarget) {
                // UPDATE
                const { error: err } = await supabase
                    .from("customers")
                    .update({ ...dataForm, updated_at: new Date().toISOString() })
                    .eq("id", editTarget.id);
                if (err) setError("Gagal mengupdate customer: " + err.message);
                else { setSuccess("Customer berhasil diupdate."); setShowModal(false); loadData(); }
            } else {
                // INSERT
                const { error: err } = await supabase
                    .from("customers")
                    .insert([{ ...dataForm, created_by: profile?.id }]);
                if (err) setError("Gagal menambah customer: " + err.message);
                else { setSuccess("Customer berhasil ditambahkan."); setShowModal(false); loadData(); }
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem: " + err.message);
        } finally {
            setTimeout(() => setSuccess(""), 3000);
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus customer ini?")) return;
        const { error: err } = await supabase.from("customers").delete().eq("id", id);
        if (err) setError("Gagal menghapus: " + err.message);
        else { setSuccess("Customer dihapus."); loadData(); }
        setMenuOpen(null);
        setTimeout(() => setSuccess(""), 3000);
    };

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.email || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F4F7FA] p-8 md:p-12 relative overflow-hidden text-slate-900 font-sans">
            <div className="absolute top-[-15%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-200/20 blur-[160px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-200/20 blur-[140px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {success && <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium">{success}</div>}
                {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium">{error}</div>}

                <PageHeader title="Client Intelligence" breadcrumb={["Core", "Directory", "Clients"]}>
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-md border border-white text-slate-500 rounded-2xl hover:text-indigo-600 hover:shadow-lg transition-all font-bold text-xs uppercase tracking-widest">
                            <HiOutlineCloudDownload className="text-lg" />
                            Export
                        </button>
                        <button
                            onClick={openAdd}
                            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:bg-indigo-600 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 font-black text-sm"
                        >
                            <HiUserAdd className="text-lg group-hover:scale-125 transition-transform" />
                            <span>Register New Client</span>
                        </button>
                    </div>
                </PageHeader>

                {/* Search Bar */}
                <div className="mt-12 mb-8 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-6">
                    <div className="relative w-full lg:w-[500px] group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 border-r border-slate-100 pr-3">
                            <HiSearch className="text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari customer berdasarkan nama atau email..."
                            className="w-full bg-white border-none rounded-[1.5rem] py-5 pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-tighter border border-emerald-100 shadow-sm">
                            <HiTrendingUp />
                            {customers.length} Total Client
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="py-20"><LoadingSpinner text="Memuat data customer..." /></div>
                        ) : filtered.length === 0 ? (
                            <div className="py-20"><EmptyState text="Belum ada customer. Tambahkan client baru!" /></div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/50 border-b border-white/20">
                                        <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400">Client Profile</th>
                                        <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400">Connectivity</th>
                                        <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400 text-center">Tier & Poin</th>
                                        <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400 text-right">Options</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20">
                                    {filtered.map((c) => (
                                        <tr key={c.id} className="group hover:bg-white/80 transition-all duration-300">
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-[1.4rem] bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center font-black text-white text-xl shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">{c.name}</div>
                                                        <div className="inline-block text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md mt-1 tracking-widest uppercase">ID: {c.id.slice(0, 8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                        <HiMail className="text-slate-300" />
                                                        {c.email || "-"}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                                                        <HiPhone className="text-slate-200" />
                                                        {c.phone || "-"}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] ${TIER_STYLES[c.tiers?.name] || "bg-white text-slate-500 border border-slate-100"}`}>
                                                        {c.tiers?.name || "Bronze"}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-semibold">{c.total_points} poin</div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7 text-right">
                                                <div className="relative inline-block">
                                                    <button
                                                        onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}
                                                        className="w-12 h-12 inline-flex items-center justify-center bg-transparent text-slate-300 rounded-2xl hover:bg-slate-900 hover:text-white hover:shadow-xl transition-all duration-300"
                                                    >
                                                        <HiDotsVertical />
                                                    </button>
                                                    {menuOpen === c.id && (
                                                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden">
                                                            <button onClick={() => navigate(`/customers/${c.id}`)} className="flex items-center gap-2 w-full px-4 py-3 text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                                                <HiEye /> Lihat Detail
                                                            </button>
                                                            <button onClick={() => openEdit(c)} className="flex items-center gap-2 w-full px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                                <HiPencil /> Edit
                                                            </button>
                                                            {isAdmin && (
                                                                <button onClick={() => handleDelete(c.id)} className="flex items-center gap-2 w-full px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
                                                                    <HiTrash /> Hapus
                                                                </button>
                                                            )}
                                                        </div>
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

                {/* Modal Add/Edit */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" onClick={() => setShowModal(false)}></div>
                        <div className="relative bg-white border border-white/40 rounded-[4rem] shadow-[0_60px_150px_-30px_rgba(0,0,0,0.5)] max-w-xl w-full p-16 animate-in zoom-in slide-in-from-bottom-20 duration-500">
                            <div className="absolute top-12 right-12">
                                <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center font-black cursor-pointer hover:bg-rose-50 hover:text-rose-500 transition-all" onClick={() => setShowModal(false)}>✕</div>
                            </div>
                            <div className="mb-10">
                                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                    {editTarget ? "Edit Client" : "Onboarding System"}
                                </span>
                                <h2 className="text-4xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                    {editTarget ? "Edit Client" : "New Client"}<br/>
                                    <span className="text-indigo-600 italic font-serif tracking-normal">{editTarget ? "Data" : "Registration"}</span>
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {[
                                    { label: "Nama Lengkap", name: "name", placeholder: "Ex: Jonathan Wick", icon: <HiUserAdd /> },
                                    { label: "Email", name: "email", placeholder: "john@example.com", icon: <HiMail /> },
                                    { label: "No. Telepon", name: "phone", placeholder: "+62 812 xxxx xxxx", icon: <HiPhone /> },
                                ].map((field) => (
                                    <div key={field.name} className="group relative">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-600 transition-all">
                                                {field.icon}
                                            </div>
                                            <input
                                                name={field.name}
                                                value={dataForm[field.name]}
                                                onChange={handleChange}
                                                required={field.name === "name"}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-[1.8rem] py-5 pl-16 pr-8 text-slate-800 font-bold focus:outline-none focus:bg-white focus:border-indigo-100 focus:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all placeholder:text-slate-200"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-16">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-slate-900 text-white font-black py-6 rounded-[2.2rem] hover:bg-indigo-600 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-2 active:translate-y-0 disabled:opacity-60"
                                    >
                                        {submitting ? "Menyimpan..." : (editTarget ? "SIMPAN PERUBAHAN" : "AUTHORIZE & SAVE DATA")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}