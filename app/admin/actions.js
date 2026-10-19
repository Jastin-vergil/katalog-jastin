"use server";

import { redirect } from "next/navigation";
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
