import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaStar, FaSearch, FaFilter } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const produkData = [
    {
        id: 1,
        name: "Lipstik Matte Velvet",
        category: "Lips",
        price: 185000,
        stock: 80,
        rating: 4.9,
        status: "Best Seller",
        img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f44?auto=format&fit=crop&q=80&w=400",
        description: "Lipstik matte tahan lama dengan formula velvet yang nyaman di bibir.",
    },
    {
        id: 2,
        name: "Foundation Flawless Cover",
        category: "Face",
        price: 320000,
        stock: 45,
        rating: 4.7,
        status: "Popular",
        img: "https://images.unsplash.com/photo-1631214503851-25e3db7f2129?auto=format&fit=crop&q=80&w=400",
        description: "Foundation full coverage yang memberikan tampilan flawless sepanjang hari.",
    },
    {
        id: 3,
        name: "Eyeshadow Palette Nude",
        category: "Eyes",
        price: 250000,
        stock: 30,
        rating: 4.8,
        status: "New",
        img: "https://images.unsplash.com/photo-1512207845803-57f62f72ae5e?auto=format&fit=crop&q=80&w=400",
        description: "Palet eyeshadow 12 warna nude yang cocok untuk tampilan sehari-hari.",
    },
    {
        id: 4,
        name: "Highlighter Glow Stick",
        category: "Face",
        price: 145000,
        stock: 12,
        rating: 4.6,
        status: "Low Stock",
        img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400",
        description: "Highlighter stick praktis untuk tampilan glowing yang natural.",
    },
    {
        id: 5,
        name: "Mascara Volume Plus",
        category: "Eyes",
        price: 175000,
        stock: 60,
        rating: 4.5,
        status: "Popular",
        img: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&q=80&w=400",
        description: "Maskara volumizing yang memberikan bulu mata tebal dan lebat.",
    },
    {
        id: 6,
        name: "Blush On Peach Glow",
        category: "Face",
        price: 120000,
        stock: 55,
        rating: 4.7,
        status: "New",
        img: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80&w=400",
        description: "Blush on warna peach yang memberikan kesan segar dan natural.",
    },
];

const statusColor = {
    "Best Seller": "bg-orange-500/90 text-white",
    Popular: "bg-violet-500/90 text-white",
    New: "bg-blue-500/90 text-white",
    "Low Stock": "bg-red-500/90 text-white",
};

export default function Produk() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Face", "Lips", "Eyes"];

    const filtered = produkData.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filter === "All" || p.category === filter;
        return matchSearch && matchCategory;
    });

    return (
        <div className="p-8 bg-[#FDFDFD] min-h-screen">
            <PageHeader
                title="Produk"
                breadcrumb={["Dashboard", "Produk"]}
            >
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                    <FaPlus className="text-xs" />
                    Tambah Produk
                </button>
            </PageHeader>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-100 shadow-sm px-11 py-3 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-400 text-sm" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                filter === cat
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                    : "bg-white text-gray-500 border border-gray-100 hover:border-blue-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="group bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/products/${item.id}`)}
                    >
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <span
                                className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg backdrop-blur-sm ${
                                    statusColor[item.status] || "bg-white/90 text-gray-800"
                                }`}
                            >
                                {item.status}
                            </span>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-xl flex items-center gap-1 shadow-lg">
                                <FaStar className="text-yellow-400 text-xs" />
                                <span className="text-[11px] font-bold text-gray-800">{item.rating}</span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {item.category}
                            </span>
                            <h3 className="text-base font-bold text-gray-800 mt-1 mb-1 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-4">{item.description}</p>

                            <div className="flex items-center justify-between">
                                <p className="text-lg font-black text-gray-900">
                                    <span className="text-sm font-bold text-blue-500 mr-0.5">Rp</span>
                                    {item.price.toLocaleString("id-ID")}
                                </p>
                                <span
                                    className={`text-xs font-bold ${
                                        item.stock < 15 ? "text-red-500" : "text-green-500"
                                    }`}
                                >
                                    Stok: {item.stock}
                                </span>
                            </div>

                            {/* Stock Bar */}
                            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                        item.stock < 15 ? "bg-red-400" : "bg-blue-500"
                                    }`}
                                    style={{ width: `${Math.min(item.stock, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-5 pb-5 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <button
                                className="flex-1 bg-blue-600 text-white text-[11px] font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/products/${item.id}`);
                                }}
                            >
                                LIHAT DETAIL
                            </button>
                            <button
                                className="px-4 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="font-semibold">Produk tidak ditemukan</p>
                </div>
            )}
        </div>
    );
}
