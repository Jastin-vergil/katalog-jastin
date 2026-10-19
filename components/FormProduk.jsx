"use client";

import { useActionState, useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { buatDeskripsiAI } from "@/app/admin/actions";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09). Keduanya bonus di jalur offline.
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [state, formAction, isPending] = useActionState(
    action || (async () => null),
    null
  );

  const [nama, setNama] = useState(produk.nama || "");
  const [kategori, setKategori] = useState(produk.kategori || "");
  const [deskripsi, setDeskripsi] = useState(produk.deskripsi || "");
  const [loadingAI, setLoadingAI] = useState(false);
  const [pesanAI, setPesanAI] = useState(null);

  const handleBuatDeskripsiAI = async () => {
    if (!nama.trim()) {
      setPesanAI({ isError: true, text: "Isi nama produk terlebih dahulu." });
      return;
    }

    setLoadingAI(true);
    setPesanAI(null);

    try {
      const res = await buatDeskripsiAI({ nama, kategori });
      if (res?.error) {
        setPesanAI({ isError: true, text: res.error });
      } else if (res?.deskripsi) {
        setDeskripsi(res.deskripsi);
        setPesanAI({ isError: false, text: "Deskripsi berhasil dibuat dengan AI!" });
      }
    } catch (err) {
      setPesanAI({ isError: true, text: `Terjadi kesalahan: ${err.message}` });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form action={action ? formAction : undefined} className="flex max-w-xl flex-col gap-4">
      {state?.error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {state.error}
        </div>
      )}
      {produk?.id && <input type="hidden" name="id" value={produk.id} />}
      <Input
        label="Nama produk"
        name="nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="deskripsi" className="text-sm font-semibold">
            Deskripsi
          </label>
          <button
            type="button"
            onClick={handleBuatDeskripsiAI}
            disabled={loadingAI}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-utama transition-colors hover:text-utama-gelap disabled:opacity-50"
          >
            ✨ {loadingAI ? "Membuat dengan AI..." : "Buat deskripsi dengan AI"}
          </button>
        </div>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Tuliskan deskripsi produk atau buat otomatis dengan AI..."
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
        {pesanAI && (
          <p className={`text-xs ${pesanAI.isError ? "text-bahaya" : "text-utama"}`}>
            {pesanAI.text}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
