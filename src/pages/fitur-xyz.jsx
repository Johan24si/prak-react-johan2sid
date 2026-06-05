import React from 'react';
// Import komponen UI kustom dasar milikmu
import { Button } from "../components/ui/button"; 
import { Badge } from "../components/ui/badge";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardAction, 
  CardContent, 
  CardFooter 
} from "../components/ui/card";

// ====================================================================
// DATA SUMBER (KONTEN UNTUK CARD)
// ====================================================================
const dataCard = [
  {
    id: 1,
    title: "Manajemen Pengguna",
    description: "Atur hak akses dan data profil anggota tim kamu.",
    actionIcon: "⚙️",
    content: "Grup komponen ini menggunakan CardAction di pojok kanan atas untuk menaruh tombol pengaturan cepat secara ringkas.",
    badgeText: "Admin Fitur",
    badgeVariant: "default",
    footerType: "full-button",
    btnText: "Lihat Semua Anggota",
    btnVariant: "default"
  },
  {
    id: 2,
    title: "Zona Berbahaya",
    description: "Tindakan ini tidak bisa dibatalkan kembali.",
    actionIcon: null,
    content: "Card ini disetel menggunakan properti size=\"sm\", sehingga ukuran padding dan jarak teksnya otomatis menjadi lebih rapat dan minimalis.",
    badgeText: "Kritis",
    badgeVariant: "destructive",
    footerType: "danger-actions",
    size: "sm"
  },
  {
    id: 3,
    title: "Statistik Penyimpanan",
    description: "Kapasitas server diperbarui 5 menit yang lalu.",
    actionIcon: null,
    content: "Gunakan komponen CardContent untuk menyelipkan data dinamis seperti grafik, teks laporan, atau form input.",
    badgeText: "84.2 GB / 100 GB Terpakai",
    customBadge: true,
    footerType: "status-upgrade",
    statusText: "Status: Hampir Penuh",
    btnText: "Upgrade Plan",
    btnVariant: "secondary"
  }
];

// ====================================================================
// STYLING LAYOUT
// ====================================================================
const styles = {
  container: { fontFamily: "'Segoe UI', Roboto, sans-serif", color: '#334155', backgroundColor: '#f8fafc', minHeight: '100vh' },
  navbar: { backgroundColor: '#ffffff', padding: '15px 40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  content: { maxWidth: '1200px', margin: '40px auto', padding: '0 20px' },
  section: { backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '35px' },
  sectionTitle: { fontSize: '20px', color: '#0f172a', marginBottom: '8px', fontWeight: '600' },
  sectionDesc: { fontSize: '14px', color: '#64748b', marginBottom: '20px' },
  flexGroup: { display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' },
  storageBox: { backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontWeight: '600', textAlign: 'center' },
  footer: { textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '14px', borderTop: '1px solid #e2e8f0', marginTop: '60px' }
};

// ====================================================================
// IMPL 1: SUB-KOMPONEN KHUSUS KATALOG BUTTON (TERPISAH)
// ====================================================================
function ImplementasiButton() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>🎨 Bagian I: Katalog Varian Button</h2>
      <p style={styles.sectionDesc}>Berdiri sendiri sebagai komponen tombol aksi dengan properti <code>variant="..."</code></p>
      <div style={styles.flexGroup}>
        <Button variant="default">Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline Style</Button>
        <Button variant="ghost">Ghost Style</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link Style</Button>
      </div>
    </section>
  );
}

// ====================================================================
// IMPL 2: SUB-KOMPONEN KHUSUS KATALOG BADGE (TERPISAH)
// ====================================================================
function ImplementasiBadge() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>🏷️ Bagian II: Katalog Varian Badge</h2>
      <p style={styles.sectionDesc}>Berdiri sendiri sebagai label indikator/status dengan properti <code>variant="..."</code></p>
      <div style={styles.flexGroup}>
        <Badge variant="default">Default Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="ghost">Ghost Label</Badge>
        <Badge variant="link">Link Badge</Badge>
      </div>
    </section>
  );
}

// ====================================================================
// IMPL 3: SUB-KOMPONEN KHUSUS GABUNGAN CARD (TERPISAH)
// ====================================================================
function ImplementasiCard() {
  return (
    <section>
      <h2 style={{ fontSize: '22px', color: '#0f172a', fontWeight: '600', marginBottom: '20px' }}>
        💻 Bagian III: Gabungan Implementasi di dalam Card Layout
      </h2>
      
      <div style={styles.grid}>
        {dataCard.map((fitur) => (
          <Card key={fitur.id} size={fitur.size || "default"}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '8px' }}>
                <CardTitle>{fitur.title}</CardTitle>
                {fitur.badgeText && !fitur.customBadge && (
                  <Badge variant={fitur.badgeVariant}>{fitur.badgeText}</Badge>
                )}
              </div>
              <CardDescription>{fitur.description}</CardDescription>
              {fitur.actionIcon && (
                <CardAction>
                  <Button variant="ghost" size="icon-sm">{fitur.actionIcon}</Button>
                </CardAction>
              )}
            </CardHeader>
            
            <CardContent>
              {fitur.customBadge && (
                <div style={styles.storageBox}>
                  <Badge variant="outline" style={{ marginRight: '8px' }}>Live</Badge> 
                  {fitur.badgeText}
                </div>
              )}
              <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {fitur.content}
              </p>
            </CardContent>
            
            {/* Render bagian footer berdasarkan kondisional data */}
            {fitur.footerType === "full-button" && (
              <CardFooter>
                <Button variant={fitur.btnVariant} size="sm" style={{ width: '100%' }}>
                  {fitur.btnText}
                </Button>
              </CardFooter>
            )}

            {fitur.footerType === "danger-actions" && (
              <CardFooter style={{ justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="outline" size="xs">Batal</Button>
                <Button variant="destructive" size="xs">Hapus Proyek</Button>
              </CardFooter>
            )}

            {fitur.footerType === "status-upgrade" && (
              <CardFooter style={{ justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{fitur.statusText}</span>
                <Button variant={fitur.btnVariant} size="sm">{fitur.btnText}</Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

// ====================================================================
// MAIN COMPONENT (Hanya Merangkai Sub-Komponen Di Atas)
// ====================================================================
function FiturXYZ() {
  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>🚀 UI Workspace</div>
        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
          Dashboard &gt; Fitur XYZ
        </span>
      </nav>

      {/* Main Content Area */}
      <main style={styles.content}>
        <h1 style={{ fontSize: '26px', color: '#0f172a', fontWeight: '700', marginBottom: '25px' }}>
          Katalog Komponen Terpisah
        </h1>

        {/* 1. Memanggil blok Button */}
        <ImplementasiButton />

        {/* 2. Memanggil blok Badge */}
        <ImplementasiBadge />

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '40px 0' }} />

        {/* 3. Memanggil blok Card susunan gabungan */}
        <ImplementasiCard />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} UI Lab Project. Modular UI Core.
      </footer>
    </div>
  );
}

export default FiturXYZ;