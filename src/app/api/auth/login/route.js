import { NextResponse } from 'next/server';

// Simulasi tabel pengguna di database server
const daftarAkun = [
  { id: 1, nama: 'Budi Santoso', email: 'budi@takumi.ac.id', password: '123456', role: 'mahasiswa' },
  { id: 2, nama: 'Reza Ilyasa, M.Kom.', email: 'reza@takumi.ac.id', password: 'admin123', role: 'dosen' },
  { id: 3, nama: 'Sio, M.Kom.', email: 'sio@takumi.ac.id', password: 'keuangan123', role: 'keuangan' },
];

export async function POST(request) {
  const { email, password } = await request.json();

  // 1. PROSES AUTENTIKASI: Mencari apakah email & password cocok
  const userDitemukan = daftarAkun.find(
    (u) => u.email === email && u.password === password
  );

  if (!userDitemukan) {
    return NextResponse.json(
      { pesan: 'Email atau Password salah! Silakan coba lagi.' },
      { status: 401 }
    );
  }

  // 2. Buat Payload sesi pengguna (Tanpa mengikutsertakan password!)
  const dataSesi = {
    id: userDitemukan.id,
    nama: userDitemukan.nama,
    email: userDitemukan.email,
    role: userDitemukan.role,
  };

  // Mengubah objek sesi menjadi string Base64 (Simulasi Token JWT)
  const tokenSimulasi = Buffer.from(JSON.stringify(dataSesi)).toString('base64');

  // 3. Simpan Token ke dalam Cookie Browser secara aman
  const response = NextResponse.json({
    pesan: 'Login Berhasil!',
    user: dataSesi,
  });

  response.cookies.set('token_siakad', tokenSimulasi, {
    httpOnly: true, // Aman dari serangan script hacker (XSS)
    path: '/',
    maxAge: 60 * 60 * 24, // Berlaku selama 1 hari (24 jam)
  });

  return response;
}