import { useNavigate } from "react-router-dom";

export default function NotFound({ code = "404", title = "Page Not Found", description = "Halaman tidak ditemukan", imageUrl = "https://cdn-icons-png.flaticon.com/512/2748/2748558.png" }) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-white z-[9999] p-6">
            <div className="text-center max-w-sm">
                {/* Image Section */}
                <img 
                    src={imageUrl} 
                    alt="Error Illustration" 
                    className="w-64 h-64 mx-auto mb-6 object-contain"
                />
                
                {/* Text Section */}
                <h1 className="text-7xl font-black text-gray-900 leading-none">{code}</h1>
                <h2 className="text-xl font-bold text-gray-800 mt-2 uppercase tracking-tight">{title}</h2>
                <p className="text-gray-500 mt-3 mb-8 text-sm leading-relaxed">
                    {description}
                </p>

                {/* Button Section */}
                <button 
                    onClick={() => navigate("/")}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95"
                >
                    KEMBALI KE DASHBOARD
                </button>
            </div>
        </div>
    );
}