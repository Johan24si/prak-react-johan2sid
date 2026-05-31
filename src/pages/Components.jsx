import { useState } from "react";
import PageHeader from "../components/PageHeader";

// Basic Components
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

// Layout Components
import Container from "../components/Container";

// Data Display Components
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

// Form Components
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";

// Feedback Components
import Alert from "../components/Alert";
import Modal from "../components/Modal";

// ─── Data ────────────────────────────────────────────────────────────────────

const tableHeaders = ["No", "Nama Produk", "Kategori", "Harga", "Status", "Aksi"];

const products = [
  { id: 1, name: "Laptop Asus",  category: "Elektronik", price: "Rp 8.000.000", status: "active" },
  { id: 2, name: "Sepatu Sport", category: "Fashion",    price: "Rp 450.000",   status: "pending" },
  { id: 3, name: "Jam Tangan",   category: "Aksesoris",  price: "Rp 799.000",   status: "danger"  },
];

const categoryOptions = [
  { value: "elektronik", label: "Elektronik" },
  { value: "fashion",    label: "Fashion"    },
  { value: "aksesoris",  label: "Aksesoris"  },
  { value: "makanan",    label: "Makanan"    },
];

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Components() {
  // State untuk Alert (bisa ditutup)
  const [showAlert, setShowAlert] = useState(true);

  // State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk Form (controlled input)
  const [form, setForm] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
  });

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-6">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      {/* ── 1. BASIC COMPONENTS ── */}
      <Section title="1. Basic Components">

        {/* Button */}
        <p className="text-xs text-gray-500 mb-2 font-medium">Button — prop: <code>type</code>, children</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="success">Simpan</Button>
          <Button type="danger">Hapus</Button>
          <Button type="warning">Peringatan</Button>
        </div>

        {/* Badge */}
        <p className="text-xs text-gray-500 mb-2 font-medium">Badge — prop: <code>type</code>, children</p>
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge type="primary">Baru</Badge>
          <Badge type="secondary">Draft</Badge>
          <Badge type="success">Aktif</Badge>
          <Badge type="danger">Ditolak</Badge>
          <Badge type="warning">Pending</Badge>
        </div>

        {/* Avatar */}
        <p className="text-xs text-gray-500 mb-2 font-medium">Avatar — prop: <code>name</code></p>
        <div className="flex gap-3">
          <Avatar name="Budi Santoso" />
          <Avatar name="Siti Rahayu" />
          <Avatar name="Ahmad Fauzi" />
        </div>

      </Section>

      {/* ── 2. LAYOUT COMPONENTS ── */}
      <Section title="2. Layout Components">

        {/* Container */}
        <p className="text-xs text-gray-500 mb-2 font-medium">Container — prop: <code>className</code>, children</p>
        <Container className="bg-gray-100 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800">Daftar Produk</h3>
          <p className="text-gray-500 text-sm mt-1">
            Ini adalah konten di dalam Container. Container mengatur padding dan centering otomatis.
          </p>
        </Container>

      </Section>

      {/* ── 3. DATA DISPLAY COMPONENTS ── */}
      <Section title="3. Data Display Components">

        {/* Card */}
        <p className="text-xs text-gray-500 mb-2 font-medium">Card — prop: children</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <h3 className="text-lg font-bold text-gray-800">Total Produk</h3>
            <p className="text-3xl font-black text-blue-600 mt-1">128</p>
            <p className="text-gray-400 text-sm mt-1">Produk terdaftar</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-gray-800">Total Order</h3>
            <p className="text-3xl font-black text-green-600 mt-1">54</p>
            <p className="text-gray-400 text-sm mt-1">Order bulan ini</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold text-gray-800">Pelanggan</h3>
            <p className="text-3xl font-black text-purple-600 mt-1">320</p>
            <p className="text-gray-400 text-sm mt-1">Pelanggan aktif</p>
          </Card>
        </div>

        {/* ProductCard */}
        <p className="text-xs text-gray-500 mb-2 font-medium">
          ProductCard — prop: <code>image</code>, <code>title</code>, <code>category</code>, <code>price</code>, <code>description</code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ProductCard
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
            title="Sepatu Sport"
            category="Fashion"
            price="Rp 450.000"
            description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
            title="Smartphone"
            category="Elektronik"
            price="Rp 4.500.000"
            description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
          />
        </div>

        {/* Table */}
        <p className="text-xs text-gray-500 mb-2 font-medium">
          Table — prop: <code>headers</code>, children (sebagai baris &lt;tr&gt;)
        </p>
        <Table headers={tableHeaders}>
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border px-4 py-3 text-sm">{index + 1}</td>
              <td className="border px-4 py-3 text-sm font-medium">{product.name}</td>
              <td className="border px-4 py-3 text-sm">{product.category}</td>
              <td className="border px-4 py-3 text-sm">{product.price}</td>
              <td className="border px-4 py-3 text-sm">
                <Badge type={product.status}>
                  {product.status === "active"  ? "Aktif"   :
                   product.status === "pending" ? "Pending" : "Ditolak"}
                </Badge>
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

      {/* ── 4. FORM COMPONENTS ── */}
      <Section title="4. Form Components">
        <p className="text-xs text-gray-500 mb-4 font-medium">
          InputField, TextArea, SelectField — semua menerima <code>label</code>, <code>name</code>, <code>value</code>, <code>onChange</code>
        </p>

        <Card>
          <h3 className="text-base font-bold text-gray-800 mb-4">Form Tambah Produk</h3>

          <InputField
            label="Nama Produk"
            name="nama"
            value={form.nama}
            onChange={handleFormChange}
            placeholder="Masukkan nama produk..."
            required
          />

          <SelectField
            label="Kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleFormChange}
            options={categoryOptions}
            required
          />

          <TextArea
            label="Deskripsi"
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleFormChange}
            placeholder="Tuliskan deskripsi produk..."
            rows={4}
          />

          <div className="flex gap-3 mt-2">
            <Button type="success">Simpan Produk</Button>
            <Button type="secondary">Batal</Button>
          </div>
        </Card>

      </Section>

      {/* ── 5. FEEDBACK COMPONENTS ── */}
      <Section title="5. Feedback Components">

        {/* Alert */}
        <p className="text-xs text-gray-500 mb-2 font-medium">
          Alert — prop: <code>type</code>, <code>onClose</code>, children
        </p>
        <Alert type="info">
          Ini adalah informasi umum untuk pengguna.
        </Alert>
        <Alert type="success">
          Data berhasil disimpan ke dalam sistem!
        </Alert>
        <Alert type="warning">
          Stok produk hampir habis, segera lakukan restok.
        </Alert>

        {/* Alert yang bisa ditutup */}
        {showAlert && (
          <Alert type="danger" onClose={() => setShowAlert(false)}>
            Terjadi kesalahan! Klik × untuk menutup pesan ini.
          </Alert>
        )}
        {!showAlert && (
          <p className="text-sm text-gray-400 italic mb-4">
            ✅ Alert danger sudah ditutup.{" "}
            <button
              onClick={() => setShowAlert(true)}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Tampilkan lagi
            </button>
          </p>
        )}

        {/* Modal */}
        <p className="text-xs text-gray-500 mb-2 font-medium">
          Modal — prop: <code>isOpen</code>, <code>onClose</code>, <code>title</code>, children
        </p>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Buka Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Konfirmasi Hapus Produk"
        >
          <p className="text-gray-600 text-sm mb-4">
            Apakah kamu yakin ingin menghapus produk <strong>Sepatu Sport</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex gap-3">
            <Button type="danger" onClick={() => setIsModalOpen(false)}>
              Ya, Hapus
            </Button>
            <Button type="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
          </div>
        </Modal>

      </Section>

    </div>
  );
}
