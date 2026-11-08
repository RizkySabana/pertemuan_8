import { cookies } from 'next/headers';
import Link from 'next/link';
import TombolLogout from '@/components/TombolLogout';

export default async function HalamanPortalAkademik({ searchParams }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token_siakad')?.value;
  const params = await searchParams;

  const user = token ? JSON.parse(Buffer.from(token, 'base64').toString('utf-8')) : null;

  return (
    <div style={{ padding: '24px' }}>
      {params?.error === 'akses_ditolak' && (
        <div style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fecaca' }}>
          🚫 <strong>OTORISASI DITOLAK:</strong> Maaf, halaman Ruang Input Nilai hanya boleh diakses oleh akun berstatus <strong>Dosen</strong>!
        </div>
      )}

      <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
        <h1 style={{ marginTop: 0 }}>🎓 Selamat Datang, {user?.nama}!</h1>
        <p>
          Email: <strong>{user?.email}</strong> | Hak Akses (Role):{' '}
          <span style={{ background: '#1e3a8a', color: 'white', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontSize: '12px' }}>
            {user?.role}
          </span>
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {user?.role === "mahasiswa" && (
            <Link
              href="/ruang-dosen"
              style={{
                background: "#f59e0b",
                color: "#0f172a",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🔒 Coba Masuk ke Ruang Input Nilai Dosen
            </Link>
          )}
          {user?.role === "dosen" && (
            <Link
              href="/ruang-dosen"
              style={{
                background: "#f59e0b",
                color: "#0f172a",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🔒 Coba Masuk ke Ruang Input Nilai Dosen
            </Link>
          )}

          {/* Tombol Khusus Keuangan */}
          {user?.role === "keuangan" && (
            <Link
              href="/ruang-keuangan"
              style={{
                background: "#10b981",
                color: "#ffffff",
                padding: "8px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              💼 Masuk ke Ruang Keuangan
            </Link>
          )}
          <TombolLogout />
        </div>
      </div>
    </div>
  );
}