'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HalamanLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesanError, setPesanError] = useState('');
  const router = useRouter();

  async function prosesLogin(e) {
    e.preventDefault();
    setPesanError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setPesanError(data.pesan);
      return;
    }

    // Jika berhasil login, arahkan ke halaman Portal Akademik
    router.push('/portal-akademik');
    router.refresh();
  }

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', padding: '28px', border: '1px solid #cbd5e1', borderRadius: '12px', background: 'white' }}>
      <h2 style={{ marginTop: 0, color: '#1e3a8a' }}>🔐 Login SIAKAD Takumi</h2>
      <p style={{ fontSize: '13px', color: '#64748b' }}>
        <strong>Akun Uji Coba:</strong><br />
        • Mahasiswa: budi@takumi.ac.id (Pass: 123456)<br />
        • Dosen: reza@takumi.ac.id (Pass: admin123)<br />
        • Keuangan: sio@takumi.ac.id (Pass: keuangan123)
      </p>

      {pesanError && (
        <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' }}>
          ⚠️ {pesanError}
        </div>
      )}

      <form onSubmit={prosesLogin} style={{ display: 'grid', gap: '12px' }}>
        <input
          type="email"
          placeholder="Email Kampus"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #94a3b8' }}
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #94a3b8' }}
        />
        <button
          type="submit"
          style={{ padding: '10px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Masuk ke Portal →
        </button>
      </form>
    </div>
  );
}