import Link from 'next/link';

export default function HalamanRuangDosen() {
  return (
    <div style={{ padding: '24px', background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '12px' }}>
      <h1 style={{ color: '#166534', marginTop: 0 }}>✅ Ruang Khusus Dosen (Otorisasi Lolos!)</h1>
      <p>Halaman rahasia ini hanya bisa terbuka jika gelang token Anda memiliki role <strong>"dosen"</strong>.</p>
      <Link href="/portal-akademik">← Kembali ke Portal Akademik</Link>
    </div>
  );
}