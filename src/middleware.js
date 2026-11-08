import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token_siakad')?.value;
  const urlTujuan = request.nextUrl.pathname;

  // 1. CEK AUTENTIKASI: Jika belum punya token tapi nekat masuk ke area terproteksi
  if (!token && (urlTujuan.startsWith('/portal-akademik') || urlTujuan.startsWith('/ruang-dosen'))) {
    // Tendang balik ke halaman /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. CEK OTORISASI (ROLE): Jika sudah login, kita baca isi gelangnya!
  if (token) {
    try {
      const jsonString = Buffer.from(token, 'base64').toString('utf-8');
      const dataUser = JSON.parse(jsonString);

      // Jika role-nya 'mahasiswa' tapi mencoba masuk ke '/ruang-dosen'
      if (urlTujuan.startsWith('/ruang-dosen') && dataUser.role !== 'dosen') {
        return NextResponse.redirect(new URL('/portal-akademik?error=akses_ditolak', request.url));
      }

      // Jika role-nya 'mahasiswa' tapi mencoba masuk ke '/ruang-keuangan'
      if (urlTujuan.startsWith('/ruang-keuangan') && dataUser.role !== 'keuangan') {
        return NextResponse.redirect(new URL('/portal-akademik?error=akses_ditolak', request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Jika semua pemeriksaan aman, silakan lanjut masuk!
  return NextResponse.next();
}

// Menentukan jalur URL mana saja yang dijaga oleh Satpam Middleware ini
export const config = {
  matcher: ['/portal-akademik/:path*', '/ruang-dosen/:path*', '/ruang-keuangan/:path*'],
};