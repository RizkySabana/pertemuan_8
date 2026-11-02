
'use client';

import { useState, useEffect } from 'react';

export default function EtalaseBukuInteraktif({ daftarBukuAwal }) {
  const [kataKunci, setKataKunci] = useState('');
  const [kategoriDipilih, setKategoriDipilih] = useState('Semua Kategori');
  const [bukuDipinjam, setBukuDipinjam] = useState([]);
  const [sudahDimuat, setSudahDimuat] = useState(false);

  // Mengambil data pinjaman dari localStorage saat halaman dibuka
  useEffect(() => {
    const dataTersimpan = localStorage.getItem('bukuDipinjam');

    if (dataTersimpan) {
      try {
        setBukuDipinjam(JSON.parse(dataTersimpan));
      } catch {
        setBukuDipinjam([]);
      }
    }

    setSudahDimuat(true);
  }, []);

  // Menyimpan data pinjaman setiap kali berubah
  useEffect(() => {
    if (sudahDimuat) {
      localStorage.setItem(
        'bukuDipinjam',
        JSON.stringify(bukuDipinjam)
      );
    }
  }, [bukuDipinjam, sudahDimuat]);

  // Mengambil daftar kategori yang tersedia
  const daftarKategori = [
    ...new Set(daftarBukuAwal.map((buku) => buku.kategori))
  ];

  // Menyaring buku berdasarkan pencarian dan kategori
  const bukuTersaring = daftarBukuAwal.filter((buku) => {
    const cocokJudul = buku.judul
      .toLowerCase()
      .includes(kataKunci.toLowerCase());

    const cocokKategori =
      kategoriDipilih === 'Semua Kategori' ||
      buku.kategori === kategoriDipilih;

    return cocokJudul && cocokKategori;
  });

  function togglePinjam(judulBuku) {
    if (bukuDipinjam.includes(judulBuku)) {
      setBukuDipinjam(
        bukuDipinjam.filter((judul) => judul !== judulBuku)
      );
    } else {
      setBukuDipinjam([...bukuDipinjam, judulBuku]);
    }
  }

  return (
    <div>
      {/* Bar Pencarian, Filter, dan Info Peminjaman */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '20px',
          background: '#eff6ff',
          padding: '16px',
          borderRadius: '8px'
        }}
      >
        <input
          type="text"
          placeholder="🔍 Cari judul buku di sini..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          style={{
            padding: '10px',
            flex: '1',
            minWidth: '180px',
            borderRadius: '6px',
            border: '1px solid #93c5fd'
          }}
        />

        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #93c5fd'
          }}
        >
          <option value="Semua Kategori">Semua Kategori</option>

          {daftarKategori.map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>

        <div style={{ fontWeight: 'bold', color: '#1e3a8a' }}>
          📚 Buku Dipilih: {bukuDipinjam.length} Judul
        </div>
      </div>

      {/* Daftar Kartu Buku */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {bukuTersaring.length > 0 ? (
          bukuTersaring.map((buku) => {
            const sudahDipilih = bukuDipinjam.includes(buku.judul);

            return (
              <div
                key={buku.id}
                style={{
                  border: '1px solid #cbd5e1',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  background: sudahDipilih ? '#f0fdf4' : 'white'
                }}
              >
                <div>
                  <strong style={{ fontSize: '16px' }}>
                    {buku.judul}
                  </strong>

                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '13px',
                      color: '#64748b'
                    }}
                  >
                    Kategori: {buku.kategori} • Rak: {buku.rak}
                  </p>
                </div>

                <button
                  onClick={() => togglePinjam(buku.judul)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: sudahDipilih ? '#dc2626' : '#2563eb',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {sudahDipilih ? '❌ Batal Pinjam' : '➕ Pinjam Buku'}
                </button>
              </div>
            );
          })
        ) : (
          <p style={{ color: '#64748b' }}>
            Buku tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
