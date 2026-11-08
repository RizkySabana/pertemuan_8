import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ pesan: 'Berhasil keluar (Logout)' });

  // Menghapus cookie token_siakad dari browser
  response.cookies.delete('token_siakad');

  return response;
}