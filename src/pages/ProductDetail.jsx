import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft, FaShoppingCart, FaHeart, FaShare } from "react-icons/fa";

const produkData = [
    {
        id: 1,
        name: "Lipstik Matte Velvet",
        category: "Lips",
        price: 185000,
        stock: 80,
        rating: 4.9,
        reviews: 214,
        status: "Best Seller",
        img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f44?auto=format&fit=crop&q=80&w=800",
        description:
            "Lipstik matte tahan lama dengan formula velvet yang nyaman di bibir. Tersedia dalam berbagai pilihan warna yang cocok untuk semua jenis kulit. Formula long-lasting hingga 12 jam tanpa perlu touch-up.",
        shades: ["#c0392b", "#922b21", "#e74c3c", "#f39c12", "#d35400"],
        benefits: ["Tahan lama 12 jam", "Formula ringan", "Tidak membuat kering", "SPF 15"],
    },
    {
        id: 2,
        name: "Foundation Flawless Cover",
        category: "Face",
        price: 320000,
        stock: 45,
        rating: 4.7,
        reviews: 189,
        status: "Popular",
        img: "https://images.unsplash.com/photo-1631214503851-25e3db7f2129?auto=format&fit=crop&q=80&w=800",
        description:
            "Foundation full coverage yang memberikan tampilan flawless sepanjang hari. Cocok untuk semua jenis kulit, termasuk kulit berminyak dan kombinasi.",
        shades: ["#fde3c8", "#f5cba7", "#e59866", "#ca6f1e", "#784212"],
        benefits: ["Full Coverage", "Tahan 24 jam", "Bebas transfer", "Non-comedogenic"],
    },
    {
        id: 3,
        name: "Eyeshadow Palette Nude",
        category: "Eyes",
        price: 250000,
        stock: 30,
        rating: 4.8,
        reviews: 302,
        status: "New",
        img: "https://images.unsplash.com/photo-1512207845803-57f62f72ae5e?auto=format&fit=crop&q=80&w=800",
        description:
            "Palet eyeshadow 12 warna nude yang cocok untuk tampilan sehari-hari hingga malam hari. Formula highly pigmented dan blendable.",
        shades: [],
        benefits: ["12 warna", "Highly pigmented", "Mudah di-blend", "Tahan lama"],
    },
    {
        id: 4,
        name: "Highlighter Glow Stick",
        category: "Face",
        price: 145000,
        stock: 12,
        rating: 4.6,
        reviews: 98,
        status: "Low Stock",
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
        description:
            "Highlighter stick praktis untuk tampilan glowing yang natural. Formula cream-to-powder yang mudah diaplikasikan dengan jari atau brush.",
        shades: ["#f9e4b7", "#f5cba7", "#fdebd0"],
        benefits: ["Easy to apply", "Natural glow", "Buildable coverage", "Portable"],
    },
    {
        id: 5,
        name: "Mascara Volume Plus",
        category: "Eyes",
        price: 175000,
        stock: 60,
        rating: 4.5,
        reviews: 156,
        status: "Popular",
        img: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&q=80&w=800",
        description:
            "Maskara volumizing yang memberikan bulu mata tebal dan lebat. Formula waterproof yang tahan hingga 12 jam.",
        shades: ["#1c2833", "#2c3e50"],
        benefits: ["Waterproof", "Volumizing", "Curling effect", "No clumping"],
    },
    {
        id: 6,
        name: "Blush On Peach Glow",
        category: "Face",
        price: 120000,
        stock: 55,
        rating: 4.7,
        reviews: 127,
        status: "New",
        img: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=800",
        description:
            "Blush on warna peach yang memberikan kesan segar dan natural. Formula lightweight yang mudah di-blend.",
        shades: ["#f1948a", "#f5b7b1", "#fadbd8"],
        benefits: ["Natural look", "Long-lasting", "Lightweight", "Blendable"],
    },
];

const statusColor = {
    "Best Seller": "bg-orange-100 text-orange-600",
    Popular: "bg-violet-100 text-violet-600",
    New: "bg-blue-100 text-blue-600",
    "Low Stock": "bg-red-100 text-red-600",
};

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = produkData.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
                <p className="text-5xl mb-4">😕</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h2>
                <p className="text-gray-400 mb-6">ID produk yang kamu cari tidak tersedia.</p>
                <button
                    onClick={() => navigate("/produk")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Kembali ke Produk
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#FDFDFD] min-h-screen">
            {/* Back Button */}
            <button
                onClick={() => navigate("/produk")}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold text-sm mb-8 transition-colors group"
            >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Kembali ke Daftar Produk
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* LEFT - Image */}
                <div className="space-y-4">
                    <div className="relative rounded-3xl overflow-hidden bg-gray-50 aspect-square shadow-xl shadow-gray-200/60">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <span
                            className={`absolute top-4 left-4 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                                statusColor[product.status] || "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {product.status}
                        </span>
                        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg text-gray-400 hover:text-red-500 transition-colors">
                            <FaHeart />
                        </button>
                    </div>
                </div>

                {/* RIGHT - Details */}
                <div className="flex flex-col justify-center space-y-6">
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <FaStar className="text-yellow-400" />
                            <span className="font-bold text-gray-800 text-sm">{product.rating}</span>
                            <span className="text-gray-400 text-xs">({product.reviews} ulasan)</span>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                            {product.name}
                            <span className="text-blue-600">.</span>
                        </h1>
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-3">
                        <p className="text-3xl font-black text-gray-900">
                            <span className="text-lg font-bold text-blue-500 mr-1">Rp</span>
                            {product.price.toLocaleString("id-ID")}
                        </p>
                        <span
                            className={`text-sm font-bold mb-1 ${
                                product.stock < 15 ? "text-red-500" : "text-green-500"
                            }`}
                        >
                            Stok: {product.stock} pcs
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed text-sm">{product.description}</p>

                    {/* Shades (if available) */}
                    {product.shades && product.shades.length > 0 && (
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                Pilihan Warna
                            </p>
                            <div className="flex gap-3">
                                {product.shades.map((shade, i) => (
                                    <button
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                                        style={{ backgroundColor: shade }}
                                        title={shade}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {product.benefits && (
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                Keunggulan
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.benefits.map((b, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full"
                                    >
                                        ✓ {b}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stock Bar */}
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                            <span>Ketersediaan Stok</span>
                            <span>{product.stock}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${
                                    product.stock < 15 ? "bg-red-400" : "bg-blue-500"
                                }`}
                                style={{ width: `${Math.min(product.stock, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                            <FaShoppingCart />
                            Tambah ke Keranjang
                        </button>
                        <button className="px-5 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl hover:bg-gray-100 transition-colors">
                            <FaShare />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
