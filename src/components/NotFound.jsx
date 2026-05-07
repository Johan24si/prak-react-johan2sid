export default function NotFound() {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-white z-[9999]">
            <div className="text-center">
                <h1 className="text-7xl font-black">404</h1>
                <p className="text-gray-500 mt-2">Halaman tidak ditemukan</p>
            </div>
        </div>
    );
}