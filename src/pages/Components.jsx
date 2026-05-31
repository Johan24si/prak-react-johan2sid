import { useState } from "react";
import PageHeader from "../components/PageHeader";

// ── Basic Components ──────────────────────────────────────────────────────────
import Button      from "../components/Button";
import Badge       from "../components/Badge";
import Avatar      from "../components/Avatar";

// ── Layout Components ─────────────────────────────────────────────────────────
import Container   from "../components/Container";
import Footer      from "../components/Footer";

// ── Data Display Components ───────────────────────────────────────────────────
import Card        from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table       from "../components/Table";

// ── Form Components ───────────────────────────────────────────────────────────
import InputField  from "../components/InputField";
import TextArea    from "../components/TextArea";
import SelectField from "../components/SelectField";

// ── Feedback Components ───────────────────────────────────────────────────────
import Alert       from "../components/Alert";
import Modal       from "../components/Modal";

// ── Section Components ────────────────────────────────────────────────────────
import HeroSection    from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import ProductSection from "../components/ProductSection";

// ─── Static Data ──────────────────────────────────────────────────────────────

const tableHeaders = ["No", "Nama Produk", "Kategori", "Harga", "Status", "Aksi"];

const produkList = [
    { id: 1, name: "Laptop Asus",  category: "Elektronik", price: "Rp 8.000.000", status: "success" },
    { id: 2, name: "Sepatu Sport", category: "Fashion",    price: "Rp 450.000",   status: "warning" },
    { id: 3, name: "Jam Tangan",   category: "Aksesoris",  price: "Rp 799.000",   status: "danger"  },
];

const statusLabel = { success: "Aktif", warning: "Pending", danger: "Ditolak" };

const categoryOptions = [
    { value: "elektronik", label: "Elektronik" },
    { value: "fashion",    label: "Fashion"    },
    { value: "aksesoris",  label: "Aksesoris"  },
];

const featureList = [
    { icon: "🚀", title: "Pengiriman Cepat",   description: "Produk sampai dalam 24 jam ke seluruh wilayah." },
    { icon: "🔒", title: "Transaksi Aman",     description: "Sistem enkripsi SSL menjamin keamanan data." },
    { icon: "💬", title: "Dukungan 24/7",      description: "Tim support siap membantu kapan saja." },
];

const productShowcase = [
    {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        title: "Sepatu Sport", category: "Fashion",
        price: "Rp 450.000",
        description: "Desain ringan dan nyaman untuk aktivitas harian.",
    },
    {
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
        title: "Smartphone",  category: "Elektronik",
        price: "Rp 4.500.000",
        description: "Performa cepat dengan kamera beresolusi tinggi.",
    },
    {
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        title: "Jam Tangan",  category: "Aksesoris",
        price: "Rp 799.000",
        description: "Desain elegan cocok untuk formal maupun kasual.",
    },
];

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ number, category, title, children }) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {category}
                </span>
                <span className="text-xs text-gray-400">Komponen #{number}</span>
            </div>
            <h2 className="text-base font-bold text-gray-700 mb-4 border-b border-dashed border-gray-200 pb-2">
                {title}
            </h2>
            {children}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Components() {
    const [alertVisible, setAlertVisible]   = useState(true);
    const [isModalOpen,  setIsModalOpen]    = useState(false);
    const [form, setForm] = useState({ nama: "", kategori: "", deskripsi: "" });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div className="p-6">
            <PageHeader
                title="Components"
                breadcrumb={["Dashboard", "Components"]}
            >
                <Badge type="primary">20 Komponen</Badge>
            </PageHeader>

            {/* ══════════════════════════════════════════════
                KATEGORI 1 — BASIC COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 1. Button */}
            <Section number="01" category="Basic" title="Button — prop: type, children, onClick">
                <div className="flex flex-wrap gap-3">
                    <Button type="primary">Primary</Button>
                    <Button type="secondary">Secondary</Button>
                    <Button type="success">Simpan</Button>
                    <Button type="danger">Hapus</Button>
                    <Button type="warning">Peringatan</Button>
                </div>
            </Section>

            {/* 2. Badge */}
            <Section number="02" category="Basic" title="Badge — prop: type, children">
                <div className="flex flex-wrap gap-3">
                    <Badge type="primary">Baru</Badge>
                    <Badge type="secondary">Draft</Badge>
                    <Badge type="success">Aktif</Badge>
                    <Badge type="danger">Ditolak</Badge>
                    <Badge type="warning">Pending</Badge>
                </div>
            </Section>

            {/* 3. Avatar */}
            <Section number="03" category="Basic" title="Avatar — prop: name (menampilkan inisial)">
                <div className="flex gap-3 items-center">
                    <Avatar name="Budi Santoso" />
                    <Avatar name="Siti Rahayu" />
                    <Avatar name="Ahmad Fauzi" />
                    <Avatar name="Dewi Lestari" />
                    <span className="text-sm text-gray-400 ml-2">← Inisial diambil dari karakter pertama nama</span>
                </div>
            </Section>

            {/* ══════════════════════════════════════════════
                KATEGORI 2 — LAYOUT COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 4. Container */}
            <Section number="04" category="Layout" title="Container — prop: className, children (pembungkus dengan max-width & centering)">
                <Container className="bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-blue-700 font-medium text-sm">
                        ✅ Konten ini dibungkus oleh &lt;Container&gt;. Secara otomatis mendapat{" "}
                        <code className="bg-blue-100 px-1 rounded">container mx-auto py-8 px-4</code>.
                    </p>
                </Container>
            </Section>

            {/* 5. Footer */}
            <Section number="05" category="Layout" title="Footer — tanpa prop (standalone, penutup halaman)">
                <div className="rounded-xl overflow-hidden border border-gray-200 scale-90 origin-top">
                    <Footer />
                </div>
            </Section>

            {/* ══════════════════════════════════════════════
                KATEGORI 3 — DATA DISPLAY COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 6. Card */}
            <Section number="06" category="Data Display" title="Card — prop: children (pembungkus informasi dengan shadow)">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <h3 className="font-bold text-gray-800">Total Produk</h3>
                        <p className="text-3xl font-black text-blue-600 mt-1">128</p>
                        <p className="text-gray-400 text-sm">Produk terdaftar</p>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-gray-800">Total Order</h3>
                        <p className="text-3xl font-black text-green-600 mt-1">54</p>
                        <p className="text-gray-400 text-sm">Order bulan ini</p>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-gray-800">Pelanggan</h3>
                        <p className="text-3xl font-black text-purple-600 mt-1">320</p>
                        <p className="text-gray-400 text-sm">Pelanggan aktif</p>
                    </Card>
                </div>
            </Section>

            {/* 7. ProductCard */}
            <Section number="07" category="Data Display" title="ProductCard — prop: image, title, category, price, description">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProductCard
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                        title="Sepatu Sport"
                        category="Fashion"
                        price="Rp 450.000"
                        description="Sepatu sport modern dengan desain nyaman dan ringan."
                    />
                    <ProductCard
                        image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
                        title="Smartphone"
                        category="Elektronik"
                        price="Rp 4.500.000"
                        description="Smartphone dengan performa cepat dan kamera jernih."
                    />
                </div>
            </Section>

            {/* 8. Table */}
            <Section number="08" category="Data Display" title="Table — prop: headers (array), children (elemen <tr> sebagai baris data)">
                <Table headers={tableHeaders}>
                    {produkList.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-3 text-sm">{index + 1}</td>
                            <td className="border px-4 py-3 text-sm font-medium">{item.name}</td>
                            <td className="border px-4 py-3 text-sm">{item.category}</td>
                            <td className="border px-4 py-3 text-sm">{item.price}</td>
                            <td className="border px-4 py-3 text-sm">
                                <Badge type={item.status}>{statusLabel[item.status]}</Badge>
                            </td>
                            <td className="border px-4 py-3 text-sm">
                                <div className="flex gap-2">
                                    <Button type="primary">Detail</Button>
                                    <Button type="danger">Hapus</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            </Section>

            {/* ══════════════════════════════════════════════
                KATEGORI 4 — FORM COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 9. InputField */}
            <Section number="09" category="Form" title="InputField — prop: label, type, name, value, onChange, placeholder, required">
                <div className="max-w-sm">
                    <InputField
                        label="Nama Produk"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama produk..."
                        required
                    />
                </div>
            </Section>

            {/* 10. SelectField */}
            <Section number="10" category="Form" title="SelectField — prop: label, name, value, onChange, options (array {value, label})">
                <div className="max-w-sm">
                    <SelectField
                        label="Kategori Produk"
                        name="kategori"
                        value={form.kategori}
                        onChange={handleChange}
                        options={categoryOptions}
                        required
                    />
                </div>
            </Section>

            {/* 11. TextArea */}
            <Section number="11" category="Form" title="TextArea — prop: label, name, value, onChange, rows, placeholder">
                <div className="max-w-sm">
                    <TextArea
                        label="Deskripsi Produk"
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Tuliskan deskripsi produk..."
                        rows={4}
                    />
                </div>
            </Section>

            {/* ══════════════════════════════════════════════
                KATEGORI 5 — FEEDBACK COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 12. Alert */}
            <Section number="12" category="Feedback" title="Alert — prop: type, onClose (opsional), children">
                <div className="space-y-0">
                    <Alert type="info">Informasi umum untuk pengguna sistem.</Alert>
                    <Alert type="success">Data produk berhasil disimpan!</Alert>
                    <Alert type="warning">Stok hampir habis, segera lakukan restok.</Alert>
                    {alertVisible ? (
                        <Alert type="danger" onClose={() => setAlertVisible(false)}>
                            Terjadi kesalahan! Klik × untuk menutup.
                        </Alert>
                    ) : (
                        <p className="text-sm text-gray-400 italic">
                            Alert ditutup.{" "}
                            <button onClick={() => setAlertVisible(true)}
                                className="text-blue-500 underline hover:text-blue-700">
                                Tampilkan lagi
                            </button>
                        </p>
                    )}
                </div>
            </Section>

            {/* 13. Modal */}
            <Section number="13" category="Feedback" title="Modal — prop: isOpen (boolean), onClose, title, children">
                <div className="flex items-center gap-4">
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        Buka Modal
                    </Button>
                    <span className="text-sm text-gray-400">← Klik untuk membuka modal dialog</span>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Konfirmasi Hapus Produk"
                >
                    <p className="text-gray-600 text-sm mb-4">
                        Apakah kamu yakin ingin menghapus produk{" "}
                        <strong>Sepatu Sport</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex gap-3">
                        <Button type="danger"    onClick={() => setIsModalOpen(false)}>Ya, Hapus</Button>
                        <Button type="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
                    </div>
                </Modal>
            </Section>

            {/* 14. Loading (info saja, sudah dipakai di App.jsx sebagai fallback Suspense) */}
            <Section number="14" category="Feedback" title="Loading — tanpa prop (digunakan sebagai fallback React.Suspense di App.jsx)">
                <Alert type="info">
                    Component <strong>Loading</strong> sudah aktif — tampil otomatis saat halaman sedang dimuat via{" "}
                    <code>&lt;Suspense fallback=&lt;Loading /&gt;&gt;</code> di <code>App.jsx</code>.
                </Alert>
            </Section>

            {/* ══════════════════════════════════════════════
                KATEGORI 6 — SECTION COMPONENTS
            ══════════════════════════════════════════════ */}

            {/* 15. HeroSection */}
            <Section number="15" category="Section" title="HeroSection — prop: title, subtitle, primaryLabel, secondaryLabel, image">
                <div className="rounded-xl overflow-hidden">
                    <HeroSection
                        title="Temukan Produk Terbaik Kami"
                        subtitle="Belanja mudah, cepat, dan terpercaya dengan ribuan pilihan produk unggulan."
                        primaryLabel="Mulai Belanja"
                        secondaryLabel="Lihat Katalog"
                        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                    />
                </div>
            </Section>

            {/* 16. FeatureSection */}
            <Section number="16" category="Section" title="FeatureSection — prop: title, subtitle, features (array {icon, title, description})">
                <FeatureSection
                    title="Mengapa Memilih Kami?"
                    subtitle="Kami hadir dengan layanan terbaik untuk kepuasan pelanggan."
                    features={featureList}
                />
            </Section>

            {/* 17. ProductSection */}
            <Section number="17" category="Section" title="ProductSection — prop: title, subtitle, products (array) → render via ProductCard">
                <ProductSection
                    title="Produk Pilihan"
                    subtitle="Koleksi produk terlaris bulan ini."
                    products={productShowcase}
                />
            </Section>

        </div>
    );
}
