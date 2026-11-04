
'use client';

import { TemaProvider, useTema } from '@/context/TemaContext';

function TombolTema() {
  const { temaGelap, ubahTema } = useTema();

  return (
    <div style={{
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'flex-end',
      background: temaGelap ? '#1e293b' : '#e2e8f0'
    }}>
      <button
        onClick={ubahTema}
        style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          background: temaGelap ? '#facc15' : '#1e293b',
          color: temaGelap ? '#1e293b' : 'white',
          fontWeight: 'bold'
        }}
      >
        {temaGelap ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
      </button>
    </div>
  );
}

export default function Provider({ children }) {
  return (
    <TemaProvider>
      <TombolTema />
      {children}
    </TemaProvider>
  );
}
