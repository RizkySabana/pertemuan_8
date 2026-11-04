
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      keranjang: [],
      diskonPersen: 0,

      // 1. Tambah Barang
      tambahBarang: (produk) => {
        const daftarSekarang = get().keranjang;
        const sudahAda = daftarSekarang.find(
          (item) => item.id === produk.id
        );

        if (sudahAda) {
          set({
            keranjang: daftarSekarang.map((item) =>
              item.id === produk.id
                ? { ...item, qty: item.qty + 1 }
                : item
            ),
          });
        } else {
          set({
            keranjang: [...daftarSekarang, { ...produk, qty: 1 }],
          });
        }
      },

      // 2. Kurangi Barang
      kurangiBarang: (idProduk) => {
        const daftarSekarang = get().keranjang;
        const target = daftarSekarang.find(
          (item) => item.id === idProduk
        );

        if (target && target.qty > 1) {
          set({
            keranjang: daftarSekarang.map((item) =>
              item.id === idProduk
                ? { ...item, qty: item.qty - 1 }
                : item
            ),
          });
        } else {
          set({
            keranjang: daftarSekarang.filter(
              (item) => item.id !== idProduk
            ),
          });
        }
      },

      // 3. Menggunakan Voucher
      pakaiVoucher: (kode) => {
        if (kode.trim() === 'TAKUMIHEBAT') {
          set({ diskonPersen: 20 });
          return true;
        }

        set({ diskonPersen: 0 });
        return false;
      },

      // 4. Kosongkan Keranjang dan Diskon
      resetKeranjang: () =>
        set({
          keranjang: [],
          diskonPersen: 0,
        }),
    }),
    {
      name: 'penyimpanan-keranjang-takumi',
    }
  )
);
