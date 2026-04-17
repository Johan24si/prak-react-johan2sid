import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (

    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* 1. Sederhana Navbar / Header Area */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tighter text-blue-600">FRAMEWORK.IO</span>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Docs</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Components</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* 2. Hero Section */}
        <section className="mb-16 text-center md:text-left md:flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Modern Ecosystem</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Kumpulan framework terbaik untuk membangun antarmuka web yang responsif, cepat, dan menyenangkan bagi pengguna.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em]">Total: {frameworkData.length} Items</span>
          </div>
        </section>

        {/* 3. Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworkData.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 relative overflow-hidden"
            >
              {/* Subtle Background Glow */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase">
                    v.{item.details.releaseYear}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h2>
                
                <p className="text-slate-500 leading-relaxed text-sm mb-8 min-h-[60px]">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Developer</p>
                    <p className="text-sm font-semibold text-slate-700">{item.details.developer}</p>
                  </div>

                  <a
                    href={item.details.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-5 rounded-full bg-slate-900 text-white text-sm font-medium flex items-center hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                  >
                    View Docs
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Simple Footer */}
      <footer className="mt-20 py-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm">© 2024 Framework Explorer. Built with ❤️ for Developers.</p>
      </footer>
    </div>
  );
}