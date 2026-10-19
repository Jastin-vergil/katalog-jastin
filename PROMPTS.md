# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
.env.local 
Memperbaiki nilai SUPABASE_URL menjadi URL dasar Supabase (https://<project-ref>.supabase.co), bukan URL endpoint REST (/rest/v1/).
  
lib/supabase/server.js & lib/supabase/index.js 
Membuat modul koneksi Supabase untuk server menggunakan createClient dari @supabase/supabase-js dengan SUPABASE_URL dan SUPABASE_SECRET_KEY.

app/page.jsx 
Mengambil daftar produk dari tabel produk di Supabase di sisi server secara dinamis.
Menampilkan produk menggunakan komponen KartuProduk tanpa mengubah tampilannya.
Menampilkan teks "Belum ada produk" jika data produk kosong.
Menampilkan pesan error yang jelas jika terjadi kegagalan pengambilan data.
Menghapus komponen CatatanBelumAktif dan data contoh.

**Perbaikan:**


## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
**Hasil:**
app/produk/[id]/page.jsx:
Mengambil data satu produk dari tabel produk di Supabase berdasarkan parameter id di URL menggunakan buatClientServer di sisi server. 
Memanggil notFound() jika produk tidak ditemukan di database atau jika terjadi error / ID tidak valid.
Mempertahankan tampilan dan komponen TombolWhatsApp.
Menghapus komponen CatatanBelumAktif dan import data contoh.
**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
