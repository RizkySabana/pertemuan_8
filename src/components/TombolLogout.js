'use client';
import { useRouter } from 'next/navigation';

export default function TombolLogout() {
  const router = useRouter();

  async function keluar() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <button onClick={keluar} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
      🚪 Logout (Keluar)
    </button>
  );
}