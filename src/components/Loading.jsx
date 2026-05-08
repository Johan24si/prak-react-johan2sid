export default function Loading() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-slate-50">
      {/* Background Decor - Membuat kesan kedalaman */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Outer Ring */}
        <div className="relative w-20 h-20">
          <div className="absolute w-full h-full border-4 border-green-100 rounded-full"></div>
          
          {/* Animated Spinner */}
          <div className="absolute w-full h-full border-4 border-green-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-4 bg-green-500 rounded-full animate-pulse opacity-20"></div>
        </div>

        {/* Text Section */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Memuat Halaman
          </h2>
          <div className="flex items-center mt-2 space-x-1">
            <p className="text-slate-500 text-sm font-medium">Mohon tunggu sebentar</p>
            <span className="flex">
              <span className="animate-[bounce_1s_infinite_100ms] text-green-600">.</span>
              <span className="animate-[bounce_1s_infinite_200ms] text-green-600">.</span>
              <span className="animate-[bounce_1s_infinite_300ms] text-green-600">.</span>
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Style (Opsional) */}
      <div className="absolute bottom-10 w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}