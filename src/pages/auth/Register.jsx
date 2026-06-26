import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { supabase } from "../../lib/supabase"

export default function Register() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.")
            return
        }
        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter.")
            return
        }

        setLoading(true)
        try {
            // 1. Buat akun di Supabase Auth
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: dataForm.email,
                password: dataForm.password,
                options: {
                    data: { full_name: dataForm.fullName }
                }
            })

            if (signUpError) throw signUpError

            const userId = authData?.user?.id
            if (!userId) throw new Error("Gagal mendapatkan user ID setelah register.")

            // 2. Insert ke tabel PROFILES sebagai Member (langsung aktif)
            const { error: profileError } = await supabase
                .from("profiles")
                .upsert({
                    id: userId,
                    full_name: dataForm.fullName,
                    role: "member",
                    is_active: true,
                })
            if (profileError) throw profileError

            // 3. Insert ke tabel CUSTOMERS (buku loyalty)
            const { error: customerError } = await supabase
                .from("customers")
                .insert({
                    auth_id: userId,
                    name: dataForm.fullName,
                    email: dataForm.email,
                })
            if (customerError) throw customerError

            setSuccess(true)
        } catch (err) {
            setError(err.message || "Registrasi gagal. Coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <BsCheckCircleFill className="text-green-500 text-5xl" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Registrasi Berhasil! 🎉</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Akun Member Anda berhasil dibuat.<br />
                    Anda dapat langsung login untuk melihat dashboard loyalty Anda.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                    Login Sekarang
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-1 text-center">
                Daftar Member ✨
            </h2>
            <p className="text-center text-sm text-gray-400 mb-6">
                Buat akun untuk mulai kumpulkan poin & nikmati keuntungan member
            </p>

            {error && (
                <div className="bg-red-50 border border-red-200 mb-5 p-4 text-sm text-red-600 rounded-lg flex items-center gap-2">
                    <BsFillExclamationDiamondFill className="text-red-500 text-lg shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        placeholder="Nama Lengkap Anda"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        placeholder="Min. 6 karakter"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Konfirmasi Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        placeholder="Ulangi password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4
                        rounded-lg transition duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading
                        ? <><ImSpinner2 className="animate-spin" /> Mendaftar...</>
                        : "Daftar sebagai Member"
                    }
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-green-600 font-semibold hover:underline">
                    Login di sini
                </Link>
            </p>
        </div>
    )
}
