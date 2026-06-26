import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { HiOutlineUsers, HiCheck, HiX, HiBan } from "react-icons/hi";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

const ROLE_COLORS = {
    admin: "bg-violet-100 text-violet-700",
    staff: "bg-blue-100 text-blue-700",
    member: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
};

export default function UserManagement() {
    const { isAdmin } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadUsers = async () => {
        setLoading(true);
        setError("");
        const { data, error: err } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });
        if (err) setError("Gagal memuat data user.");
        else setUsers(data || []);
        setLoading(false);
    };

    useEffect(() => { loadUsers(); }, []);

    const updateUser = async (id, updates) => {
        const { error: err } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", id);
        if (err) {
            setError("Gagal mengupdate user: " + err.message);
        } else {
            setSuccess("User berhasil diupdate.");
            setTimeout(() => setSuccess(""), 3000);
            loadUsers();
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-8">
                <div className="text-center p-12 bg-white rounded-[2rem] shadow-xl">
                    <HiBan className="text-6xl text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-slate-800">Akses Ditolak</h2>
                    <p className="text-slate-400 mt-2">Halaman ini hanya untuk Admin.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12 relative overflow-hidden font-sans">
            <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-violet-200/20 blur-[140px] rounded-full animate-pulse"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <PageHeader title="Manajemen User" breadcrumb={["Admin", "Manajemen User"]}>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-violet-50 text-violet-700 text-xs font-black uppercase tracking-wider rounded-xl border border-violet-100">
                            {users.length} Total User
                        </span>
                    </div>
                </PageHeader>

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium flex items-center gap-2">
                        <HiCheck className="text-xl" /> {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">Nama & Email</th>
                                    <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400">Role</th>
                                    <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 text-center">Status</th>
                                    <th className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading && (
                                    <tr><td colSpan="4" className="py-16"><LoadingSpinner text="Memuat data user..." /></td></tr>
                                )}
                                {!loading && users.length === 0 && (
                                    <tr><td colSpan="4" className="py-16"><EmptyState text="Belum ada user terdaftar." /></td></tr>
                                )}
                                {!loading && users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-50/60 transition-all duration-200">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                                                    {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm">{user.full_name}</div>
                                                    <div className="text-xs text-slate-400">{user.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <select
                                                value={user.role}
                                                onChange={(e) => updateUser(user.id, { role: e.target.value })}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 ${ROLE_COLORS[user.role] || "bg-gray-100 text-gray-600"}`}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="staff">Staff</option>
                                                <option value="member">Member</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${user.is_active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                                                {user.is_active ? "Aktif" : "Nonaktif"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                {!user.is_active ? (
                                                    <button
                                                        onClick={() => updateUser(user.id, { is_active: true, role: user.role === "pending" ? "staff" : user.role })}
                                                        className="flex items-center gap-1 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all"
                                                    >
                                                        <HiCheck /> Approve
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateUser(user.id, { is_active: false })}
                                                        className="flex items-center gap-1 px-4 py-2 bg-rose-100 text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-200 transition-all"
                                                    >
                                                        <HiX /> Nonaktifkan
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
