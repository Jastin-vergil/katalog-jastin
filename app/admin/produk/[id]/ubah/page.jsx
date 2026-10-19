import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { buatClientSesiAdmin } from "@/lib/supabase/admin";
import { buatClientServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  let produk = null;
  try {
    const supabase = await buatClientSesiAdmin();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      produk = data;
    } else {
      const serverClient = buatClientServer();
      const res = await serverClient
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!res.error && res.data) {
        produk = res.data;
      }
    }
  } catch {
    // Abaikan error dan periksa nilai produk
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormProduk produk={produk} action={ubahProduk} labelTombol="Simpan perubahan" />
    </div>
  );
}
