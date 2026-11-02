import AntreanKrs from '@/components/AntreanKrs';

export default async function HalamanCSR() {
    // 🌟 Client-Side Rendering (CSR) memaksa browser untuk memasak ulang halaman setiap kali di-refresh!
    

  return (
    <div style={{ padding: '24px' }}>
      <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
        MODE: SSR (Server-Side Rendering Real-Time)
      </span>
      <h1>⚡ Pantauan Antrean Server KRS (Real-Time)</h1>
      

      <AntreanKrs />
    </div>
  );
}