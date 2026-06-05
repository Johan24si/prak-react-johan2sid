import React from 'react';

function FiturXYZ() {
  // Objek styling untuk membuat tampilan web yang modern dan bersih
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#334155',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    },
    navbar: {
      backgroundColor: '#ffffff',
      padding: '15px 40px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#0f172a',
    },
    hero: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#ffffff',
    },
    heroTitle: {
      fontSize: '36px',
      marginBottom: '10px',
      fontWeight: '700',
    },
    heroSubtitle: {
      fontSize: '18px',
      opacity: '0.9',
      maxWidth: '600px',
      margin: '0 auto 20px auto',
    },
    button: {
      backgroundColor: '#ffffff',
      color: '#1d4ed8',
      border: 'none',
      padding: '10px 22px',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s',
    },
    content: {
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '0 20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '20px',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
    },
    cardTitle: {
      fontSize: '20px',
      color: '#1e293b',
      marginBottom: '10px',
      fontWeight: '600',
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      color: '#94a3b8',
      fontSize: '14px',
      borderTop: '1px solid #e2e8f0',
      marginTop: '60px',
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>🚀 AppKu</div>
        <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
          Dashboard &gt; Fitur XYZ
        </span>
      </nav>

      {/* 2. Hero / Banner Section */}
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>Halaman Fitur XYZ</h1>
        <p style={styles.heroSubtitle}>
          Sekarang halaman kamu sudah berhasil terhubung dengan router dan siap dikembangkan lebih jauh!
        </p>
        <button style={styles.button} onClick={() => alert('Halo! Tombol interaktif bekerja.')}>
          Jelajahi Fitur
        </button>
      </header>

      {/* 3. Main Content (Grid Cards) */}
      <main style={styles.content}>
        <h2 style={{ fontSize: '24px', color: '#1e293b', fontWeight: '600' }}>Informasi Komponen</h2>
        
        <div style={styles.grid}>
          {/* Kartu 1 */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>⚡ Performa Cepat</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
              Menggunakan ekosistem Vite + React, membuat proses render halaman menjadi instan dan hemat memori.
            </p>
          </div>

          {/* Kartu 2 */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🎨 Struktur Bersih</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
              Kode diatur menggunakan objek style terpisah agar file `.jsx` kamu tetap rapi dan mudah dibaca.
            </p>
          </div>

          {/* Kartu 3 */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🛠️ Siap Kustomisasi</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
              Kamu bisa mengganti teks di dalam kartu ini atau menambahkan integrasi API/data asli di kemudian hari.
            </p>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} AppKu Project. All rights reserved.
      </footer>
    </div>
  );
}

export default FiturXYZ;