"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatClientSesiAdmin } from "@/lib/supabase/admin";

export async function masukAdmin(prevState, formData) {
  // Dukung pemanggilan langsung (action={masukAdmin}) maupun useActionState
  const data = formData instanceof FormData ? formData : prevState;
  const email = data?.get?.("email")?.toString().trim();
  const password = data?.get?.("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let errorMasuk = null;

  try {
    const supabase = await buatClientSesiAdmin();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    errorMasuk = error;
  } catch (err) {
    return { error: `Terjadi kesalahan saat masuk: ${err.message}` };
  }

  if (errorMasuk) {
    if (errorMasuk.message === "Invalid login credentials") {
      return { error: "Email atau password salah." };
    }
    return { error: `Gagal masuk: ${errorMasuk.message}` };
  }

  redirect("/admin");
}

export const loginAdmin = masukAdmin;
export const login = masukAdmin;

export async function keluarAdmin() {
  try {
    const supabase = await buatClientSesiAdmin();
    await supabase.auth.signOut();
  } catch {
    // Abaikan error saat keluar dan tetap arahkan ke halaman login
  }

  redirect("/admin/login");
}

export const logoutAdmin = keluarAdmin;
export const logout = keluarAdmin;

export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const passwordBaru = data?.get?.("password_baru")?.toString() || "";
  const konfirmasiPassword = data?.get?.("konfirmasi_password")?.toString() || "";

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama dengan password baru." };
  }

  try {
    const supabase = await buatClientSesiAdmin();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Sesi telah berakhir atau Anda belum login." };
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    if (error) {
      return { error: `Gagal mengganti password: ${error.message}` };
    }

    return { success: true, message: "Password berhasil diganti." };
  } catch (err) {
    return { error: `Terjadi kesalahan: ${err.message}` };
  }
}

export const changePassword = gantiPassword;

export async function tambahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const nama = data?.get?.("nama")?.toString().trim();
  const hargaStr = data?.get?.("harga")?.toString().trim();
  const kategori = data?.get?.("kategori")?.toString().trim() || null;
  const foto_url = data?.get?.("foto_url")?.toString().trim() || null;
  const deskripsi = data?.get?.("deskripsi")?.toString().trim() || null;

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  const harga = parseInt(hargaStr, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga produk harus berupa angka dan tidak boleh negatif." };
  }

  try {
    const supabase = await buatClientSesiAdmin();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Akses ditolak: Anda harus login sebagai admin." };
    }

    const { error: insertError } = await supabase.from("produk").insert({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    });

    if (insertError) {
      return { error: `Gagal menyimpan produk: ${insertError.message}` };
    }
  } catch (err) {
    return { error: `Terjadi kesalahan: ${err.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export const createProduct = tambahProduk;

export async function ubahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const id = data?.get?.("id")?.toString();
  const nama = data?.get?.("nama")?.toString().trim();
  const hargaStr = data?.get?.("harga")?.toString().trim();
  const kategori = data?.get?.("kategori")?.toString().trim() || null;
  const foto_url = data?.get?.("foto_url")?.toString().trim() || null;
  const deskripsi = data?.get?.("deskripsi")?.toString().trim() || null;

  if (!id) {
    return { error: "ID produk tidak valid atau tidak ditemukan." };
  }

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  const harga = parseInt(hargaStr, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga produk harus berupa angka dan tidak boleh negatif." };
  }

  try {
    const supabase = await buatClientSesiAdmin();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: "Akses ditolak: Anda harus login sebagai admin." };
    }

    const { error: updateError } = await supabase
      .from("produk")
      .update({
        nama,
        harga,
        kategori,
        foto_url,
        deskripsi,
      })
      .eq("id", id);

    if (updateError) {
      return { error: `Gagal mengubah produk: ${updateError.message}` };
    }
  } catch (err) {
    return { error: `Terjadi kesalahan: ${err.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${id}`);
  revalidatePath(`/admin/produk/${id}/ubah`);
  redirect("/admin");
}

export const updateProduct = ubahProduk;
