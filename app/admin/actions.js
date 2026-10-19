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

