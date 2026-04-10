export default function tailwindcss() {
    return (
        // Wrapper utama dengan warna background lembut agar komponen "pop"
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
            <FlexboxGrid />
            
            {/* Hero Section yang lebih rapi */}
            <main className="max-w-6xl mx-auto px-6">
                <header className="py-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            Mastering <span className="text-blue-600">Tailwind CSS 4</span>
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                            Eksplorasi utilitas terbaru untuk membangun antarmuka yang modern, responsif, dan performan dengan sangat cepat.
                        </p>
                        <div className="mt-8">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                                Mulai Belajar Sekarang
                            </button>
                        </div>
                    </div>
                    {/* Elemen visual tambahan */}
                    <div className="hidden lg:block w-64 h-64 bg-blue-100 rounded-3xl rotate-12 border-4 border-dashed border-blue-300"></div>
                </header>

                {/* Grid Layout agar komponen tersusun rapi */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Spacing />
                    <Typography />
                    <div className="lg:col-span-1">
                        <BorderRadius />
                    </div>
                    <div className="md:col-span-2 lg:col-span-2">
                        <BackgroundColors />
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                        <ShadowEffects />
                    </div>
                </div>
            </main>
        </div>
    )
}

function Spacing() {
    return (
        <div className="group bg-slate-900 p-8 rounded-[2rem] shadow-2xl hover:ring-4 ring-blue-500/20 transition-all">
            <div className="h-12 w-12 bg-blue-500 rounded-xl mb-6 flex items-center justify-center">
                <span className="text-white font-bold">01</span>
            </div>
            <h2 className="text-white text-2xl font-bold italic tracking-tight">Spacing Guide</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
                Teknik <span className="text-orange-400 font-mono">p-6</span> dan <span className="text-orange-400 font-mono">m-8</span> memberikan ruang bernapas pada desain Anda.
            </p>
        </div>
    )
}

function Typography() {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-none">Aaa</h1>
            <h3 className="text-xl font-bold mt-2 text-blue-600">Tailwind Typography</h3>
            <p className="text-slate-500 mt-4 leading-relaxed italic border-l-4 border-slate-200 pl-4">
                "Cara tercepat membangun UI tanpa meninggalkan file HTML Anda."
            </p>
        </div>
    )
}

function BorderRadius() {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 h-full flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Button Styles</span>
            <button className="w-full border-2 border-orange-400 text-orange-500 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-all">
                Outline Style
            </button>
            <button className="w-full bg-orange-400 text-white font-bold px-6 py-3 rounded-full hover:bg-orange-500 transition-all shadow-md">
                Pill Style
            </button>
        </div>
    )
}

function BackgroundColors() {
    return (
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-10 rounded-[2rem] shadow-xl text-white relative overflow-hidden h-full">
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-4">Tailwind Colors</h3>
                <p className="text-blue-100 text-lg max-w-md">
                    Warna-warna cerdas yang secara otomatis terkoordinasi untuk aksesibilitas dan estetika.
                </p>
            </div>
            {/* Dekorasi lingkaran di background */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
    )
}

function FlexboxGrid() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                    <h1 className="text-xl font-black tracking-tighter">DEV<span className="text-blue-600">LAB</span></h1>
                </div>
                <ul className="hidden md:flex space-x-10 text-sm font-bold text-slate-600 uppercase tracking-widest">
                    <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-blue-600 transition-colors">Course</a></li>
                    <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                </ul>
                <button className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-tighter">
                    Login
                </button>
            </div>
        </nav>
    )
}

function ShadowEffects() {
    return (
        <div className="group cursor-pointer bg-white p-10 rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-slate-100 flex flex-col items-center text-center justify-center h-full">
            <div className="mb-4 p-4 bg-orange-50 rounded-full group-hover:scale-110 transition-transform">
                ✨
            </div>
            <h3 className="text-2xl font-black text-slate-800">Premium Shadow</h3>
            <p className="text-slate-500 mt-2">Sentuh kartu ini untuk melihat keajaiban transisi.</p>
        </div>
    )
}