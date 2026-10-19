"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");

  const handleKurang = () => {
    if (jumlah > 1) {
      setJumlah((prev) => prev - 1);
    }
  };

  const handleTambah = () => {
    setJumlah((prev) => prev + 1);
  };

  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";
  const totalHarga = (produk.harga || 0) * jumlah;

  // Format pesan WhatsApp dengan jumlah dan pilihan varian
  let pesan = `Halo, saya ingin memesan:\n- Produk: ${produk.nama}\n- Jumlah: ${jumlah}`;
  if (varian.trim()) {
    pesan += `\n- Varian/Catatan: ${varian.trim()}`;
  }
  pesan += `\n- Total: ${formatRupiah(totalHarga)}`;

  const urlWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-garis bg-permukaan/60 p-4">
      {/* Pemilihan Jumlah */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-teks">Jumlah</span>
        <div className="flex items-center rounded-lg border border-garis bg-latar">
          <button
            type="button"
            onClick={handleKurang}
            disabled={jumlah <= 1}
            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-teks transition-colors hover:bg-permukaan disabled:opacity-30"
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-teks">
            {jumlah}
          </span>
          <button
            type="button"
            onClick={handleTambah}
            className="flex h-9 w-9 items-center justify-center text-lg font-bold text-teks transition-colors hover:bg-permukaan"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      {/* Pilihan Varian / Catatan */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="varian-produk" className="text-sm font-semibold text-teks">
          Pilihan varian atau catatan <span className="text-xs font-normal text-teks-lembut">(opsional)</span>
        </label>
        <input
          id="varian-produk"
          type="text"
          value={varian}
          onChange={(e) => setVarian(e.target.value)}
          placeholder="Misal: Rasa pedas manis, ukuran toples, dsb."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      {/* Estimasi Total Harga */}
      <div className="flex items-center justify-between border-t border-garis pt-3 text-sm">
        <span className="text-teks-lembut">Total pesanan</span>
        <span className="rounded-md bg-harga-latar px-2 py-0.5 font-bold text-harga">
          {formatRupiah(totalHarga)}
        </span>
      </div>

      {/* Tombol Pemesanan */}
      <a
        href={urlWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
