import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'

export default function ProtectedRoute({ children }) {
    const { session, profile, loading } = useAuth()

    if (loading) return <Loading />

    // Belum login → ke halaman login
    if (!session) return <Navigate to="/login" replace />

    // Sudah login tapi akun belum diaktifkan admin (dan BUKAN member)
    if (profile && !profile.is_active && profile.role !== 'member') {
        return <PendingApprovalPage />
    }

    return children
}

function PendingApprovalPage() {
    const { signOut } = useAuth()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
            <div className="text-center max-w-md bg-white border border-slate-100 p-12 rounded-[3rem] shadow-xl shadow-slate-100">
                <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner">
                    ⏳
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter mb-3">
                    Menunggu Persetujuan
                </h2>
                <p className="text-slate-400 mb-2 leading-relaxed text-sm">
                    Akun Anda telah terdaftar, namun belum diaktifkan oleh Admin.
                </p>
                <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                    Mohon hubungi administrator sistem untuk aktivasi akun Anda.
                </p>
                <button
                    onClick={signOut}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-red-600 transition-all duration-300"
                >
                    Keluar dari Akun
                </button>
            </div>
        </div>
    )
}
