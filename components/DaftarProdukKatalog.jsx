"use client";

import { useState, useMemo } from "react";
import KartuProduk from "@/components/KartuProduk";

export default function DaftarProdukKatalog({ daftarProduk = [] }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");

  // Mengumpulkan kategori unik dari produk yang ada
  const daftarKategori = useMemo(() => {
    const list = ["Semua"];
    const kategoriSet = new Set();
    daftarProduk.forEach((p) => {
      if (p.kategori && p.kategori.trim()) {
        kategoriSet.add(p.kategori.trim());
      }
    });
    return [...list, ...Array.from(kategoriSet)];
  }, [daftarProduk]);

  // Filter produk berdasarkan kategori yang dipilih dan kata kunci pencarian
  const produkTerfilter = useMemo(() => {
    const query = kataKunci.trim().toLowerCase();
    return daftarProduk.filter((produk) => {
      const cocokKategori =
        kategoriAktif === "Semua" || produk.kategori === kategoriAktif;
      const cocokKataKunci =
        !query ||
        produk.nama?.toLowerCase().includes(query) ||
        produk.deskripsi?.toLowerCase().includes(query);
      return cocokKategori && cocokKataKunci;
    });
  }, [daftarProduk, kategoriAktif, kataKunci]);

  if (daftarProduk.length === 0) {
    return <p className="py-8 text-center text-teks-lembut">Belum ada produk</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Area Pencarian dan Filter Kategori */}
      <div className="flex flex-col gap-3">
        {/* Input Pencarian */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            placeholder="Cari nama atau jenis produk..."
            className="w-full rounded-lg border border-garis bg-latar px-3.5 py-2.5 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
          {kataKunci && (
            <button
              type="button"
              onClick={() => setKataKunci("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-teks-lembut hover:text-teks"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Pilihan Kategori */}
        {daftarKategori.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {daftarKategori.map((kategori) => {
              const isAktif = kategoriAktif === kategori;
              return (
                <button
                  key={kategori}
                  type="button"
                  onClick={() => setKategoriAktif(kategori)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isAktif
                      ? "bg-utama text-white"
                      : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                  }`}
                >
                  {kategori}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid Produk atau Status Kosong */}
      {produkTerfilter.length === 0 ? (
        <div className="rounded-xl border border-garis bg-permukaan p-8 text-center">
          <p className="text-teks-lembut">
            Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih.
          </p>
          {(kataKunci || kategoriAktif !== "Semua") && (
            <button
              type="button"
              onClick={() => {
                setKataKunci("");
                setKategoriAktif("Semua");
              }}
              className="mt-3 text-sm font-semibold text-utama hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {produkTerfilter.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}

