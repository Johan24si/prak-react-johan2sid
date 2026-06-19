import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlinePlus, AiOutlineFileText } from "react-icons/ai"; 

// DISESUAIKAN: Nama folder 'services' sesuai struktur folder Anda
import { notesAPI } from "../services/notesAPI"; 
import GenericTable from "../components/GenericTable"; 
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Note() {
  // --- STATE ---
  const [notes, setNotes] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
  });

  // --- EFFECT ---
  useEffect(() => {
    loadNotes();
  }, []);

  // --- FUNGSI: Ambil data ---
  const loadNotes = async () => {
    try {
      setIsLoadingNotes(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat catatan");
      console.error(err);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  // --- FUNGSI: Handle input form ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- FUNGSI: Handle tambah data ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess("");

    try {
      await notesAPI.createNote(dataForm); 
      setSuccess("Catatan berhasil ditambahkan!");
      setDataForm({ title: "", content: "" });
      await loadNotes(); 
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan catatan");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FUNGSI BARU: Handle aksi hapus data ---
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus catatan ini?");
    if (!konfirmasi) return;

    try {
      setIsDeleting(true);
      setError("");
      setSuccess("");

      await notesAPI.deleteNote(id);
      setSuccess("Catatan berhasil dihapus!");
      await loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan saat menghapus: ${err.message}`);
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-gray-200/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <AiOutlineFileText className="text-xl" />
              </span>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Notes App</h2>
            </div>
            <p className="text-slate-500 text-sm sm:text-base">Kelola dan atur ide, tugas, atau catatan harian Anda.</p>
          </div>
        </div>

        {/* Alert Notifications */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm flex items-center transition-all animate-fade-in">
            <span className="font-medium text-sm">{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 shadow-sm flex items-center transition-all animate-fade-in">
            <span className="font-medium text-sm">{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-8 mb-10 transition-all">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <AiOutlinePlus className="text-emerald-500" />
            Tambah Catatan Baru
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Judul</label>
              <input
                type="text"
                name="title"
                value={dataForm.title}
                placeholder="Masukkan judul catatan..."
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Isi Catatan</label>
              <textarea
                name="content"
                value={dataForm.content}
                placeholder="Tuliskan detail catatan Anda di sini..."
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Catatan"}
              </button>
            </div>
          </form>
        </div>

        {/* Notes Table Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-800">
              Daftar Catatan
            </h3>
            <span className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full">
              {notes.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            {isLoadingNotes && (
              <div className="py-12 flex justify-center">
                <LoadingSpinner text="Memuat catatan..." />
              </div>
            )}

            {!isLoadingNotes && notes.length === 0 && !error && (
              <div className="py-12">
                <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
              </div>
            )}

            {!isLoadingNotes && notes.length === 0 && error && (
              <div className="py-12">
                <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
              </div>
            )}

            {!isLoadingNotes && notes.length > 0 && (
              <GenericTable
                columns={["#", "Judul", "Isi Catatan", "Aksi"]} 
                data={notes}
                renderRow={(note, index) => (
                  <tr key={note.id || index} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4.5 text-sm font-medium text-slate-400 w-16">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-slate-800 text-sm sm:text-base">
                        {note.title}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 max-w-xs md:max-w-md">
                      <div className="truncate text-slate-500 text-sm">
                        {note.content}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 w-20">
                      <button
                        onClick={() => handleDelete(note.id)}
                        disabled={isDeleting}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-50 active:scale-95"
                        title="Hapus Catatan"
                      >
                        <AiFillDelete className="text-xl" />
                      </button>
                    </td>
                  </tr>
                )}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}