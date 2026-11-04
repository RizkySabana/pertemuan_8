
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useTema } from '@/context/TemaContext';

export default function HalamanCheckout() {
  const {
    keranjang,
    resetKeranjang,
    diskonPersen,
    pakaiVoucher
  } = useCartStore();
  const { temaGelap } = useTema();

  const [kodeVoucher, setKodeVoucher] = useState('');
  const [pesanVoucher, setPesanVoucher] = useState('');

  // Menghitung total belanja
  const totalBayar = keranjang.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );

  // Menghitung diskon dan total akhir
  const jumlahDiskon = totalBayar * (diskonPersen / 100);
  const totalSetelahDiskon = totalBayar - jumlahDiskon;

  // Memeriksa voucher
  const gunakanVoucher = () => {
    const berhasil = pakaiVoucher(kodeVoucher);

    setPesanVoucher(
      berhasil
        ? 'Voucher berhasil digunakan! Kamu mendapatkan diskon 20%.'
        : 'Kode voucher tidak valid!'
    );
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>💳 Halaman Checkout Pembayaran</h1>

      <p>
        Data keranjang tetap tersimpan meskipun berpindah halaman!
      </p>

      {keranjang.length === 0 ? (
        <p>Keranjang masih kosong. Silakan belanja terlebih dahulu.</p>
      ) : (
        <>
          {/* Daftar barang */}
          <ul>
            {keranjang.map((item) => (
              <li key={item.id}>
                {item.nama} ({item.qty} pcs) —{' '}
                <strong>
                  Rp {(item.harga * item.qty).toLocaleString('id-ID')}
                </strong>
              </li>
            ))}
          </ul>

          {/* Input Voucher */}
          <div style={{
              padding: '16px',
              background: temaGelap ? '#1e293b' : '#f1f5f9',
              color: temaGelap ? '#f8fafc' : '#0f172a',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
            <h3>🎟️ Kode Voucher Diskon</h3>

            <input
              type="text"
              placeholder="Masukkan TAKUMIHEBAT"
              value={kodeVoucher}
              onChange={(e) => setKodeVoucher(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '10px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                background: temaGelap ? '#334155' : '#ffffff',
                color: temaGelap ? '#ffffff' : '#0f172a',
              }}
            />

            <button
              onClick={gunakanVoucher}
              style={{
                padding: '10px 16px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Gunakan Voucher
            </button>

            {pesanVoucher && (
              <p style={{
                color: diskonPersen > 0 ? '#15803d' : '#dc2626',
                fontWeight: 'bold'
              }}>
                {pesanVoucher}
              </p>
            )}
          </div>

          {/* Rincian Pembayaran */}
          <div style={{
            padding: '16px',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>🧾 Rincian Pembayaran</h3>

            <p>
              Total Belanja: Rp {totalBayar.toLocaleString('id-ID')}
            </p>

            <p style={{ color: '#16a34a' }}>
              Diskon ({diskonPersen}%): - Rp{' '}
              {jumlahDiskon.toLocaleString('id-ID')}
            </p>

            <hr />

            <h3>
              Total yang Harus Dibayar: Rp{' '}
              {totalSetelahDiskon.toLocaleString('id-ID')}
            </h3>
          </div>
        </>
      )}

      {/* Tombol Navigasi dan Pembayaran */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <Link
          href="/koperasi"
          style={{
            padding: '10px 16px',
            background: '#e2e8f0',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0f172a'
          }}
        >
          ← Kembali Belanja
        </Link>

        <button
          disabled={keranjang.length === 0}
          onClick={() => {
            alert('Pembayaran Berhasil! Terima kasih sudah berbelanja di Koperasi Takumi.');
            resetKeranjang();
            setKodeVoucher('');
            setPesanVoucher('');
          }}
          style={{
            padding: '10px 20px',
            background: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✅ Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
