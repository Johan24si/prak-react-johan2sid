import { useState } from "react";
// Pastikan path ke file JSON sudah benar sesuai struktur foldermu
import frameworkData from "./framework.json"; 

export default function FrameworkListsearchFilterData() {
  /** 1. Deklarasi State **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** 2. Logika Pengambilan Unique Tags **/
  // Mengambil semua tag dari data, lalu menghilangkan duplikat menggunakan Set
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  /** 3. Logika Search & Filter **/
  const filteredFrameworks = frameworkData.filter((framework) => {
    // Logika Search: cek di nama atau deskripsi
    const _searchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    // Logika Filter Tag: jika selectedTag kosong, tampilkan semua (true)
    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          🚀 Framework Explorer
        </h1>
        <p className="text-slate-500 text-sm">
          Cari berdasarkan nama atau filter berdasarkan kategori
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Search */}
        <input
          type="text"
          placeholder="Cari framework atau deskripsi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
        />

        {/* Select Filter Tag */}
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
        >
          <option value="">Semua Tag (All Tags)</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Result Count */}
      <div className="max-w-4xl mx-auto mb-6 text-slate-500 text-sm">
        Menampilkan <b>{filteredFrameworks.length}</b> framework.
      </div>

      {/* Grid Layout */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden"
          >
            {/* Image */}
            {item.image && (
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {item.name}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 h-12 overflow-hidden">
                {item.description}
              </p>

              <div className="text-sm text-slate-600 mb-3">
                <span className="font-medium">👨‍💻 Dev:</span>{" "}
                <span className="font-semibold text-slate-800">
                  {item.details?.developer}
                </span>
              </div>

              {/* Tags Rendering */}
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                      selectedTag === tag 
                      ? "bg-indigo-600 text-white" 
                      : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFrameworks.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg italic">Ups! Tidak ada framework yang cocok.</p>
        </div>
      )}
    </div>
  );
}