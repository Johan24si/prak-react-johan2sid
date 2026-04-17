import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListsearchFilterData() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleTagClick = (tag) => {
    setDataForm({
      ...dataForm,
      selectedTag: dataForm.selectedTag === tag ? "" : tag,
    });
  };

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  const filteredFrameworks = frameworkData.filter((framework) => {
    const _searchTerm = dataForm.searchTerm.toLowerCase();

    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          🚀 Framework Explorer
        </h1>
        <p className="text-slate-500 text-sm">
          Discover Modern JavaScript Frameworks
        </p>
      </div>

      <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="🔍 Search framework..."
          value={dataForm.searchTerm}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-300 hover:shadow-md"
        />

        <select
          name="selectedTag"
          value={dataForm.selectedTag}
          onChange={handleChange}
          className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <option value="">All Categories</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="max-w-5xl mx-auto mb-6 text-slate-500 text-sm">
        Showing <b>{filteredFrameworks.length}</b> frameworks
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group bg-white/70 backdrop-blur rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden"
          >
            {item.image && (
              <div className="overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            )}

            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-indigo-600 transition">
                {item.name}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 h-12 overflow-hidden">
                {item.description}
              </p>

              <div className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                <span>👨‍💻</span>
                <span className="font-medium">{item.details?.developer}</span>
              </div>

              {item.details?.officialWebsite && (
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                  🌐 Official Website →
                </a>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 cursor-pointer ${
                      dataForm.selectedTag === tag
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600"
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

      {filteredFrameworks.length === 0 && (
        <div className="text-center py-24">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <p className="text-lg text-slate-400 italic">No framework found</p>
        </div>
      )}
    </div>
  );
}