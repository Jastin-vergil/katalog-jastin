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
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
components/TombolWhatsApp.jsx: 
Mengubah elemen <button> menjadi tautan <a> dengan styling tampilan tombol yang sama persis (bg-utama, rounded, hover, dsb.).  
Mengarahkan tautan ke https://wa.me/<nomor>?text=<pesan> menggunakan nomor dari lib/toko.js.
Mengisi pesan otomatis dengan nama produk dan harga dalam format rupiah (menggunakan formatRupiah), yang di-encode dengan encodeURIComponent.
Membuka tautan di tab baru dengan atribut target="_blank" dan rel="noopener noreferrer".
**Perbaikan:**

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
lib/supabase/admin.js & lib/supabase/index.js
Membuat fungsi buatClientSesiAdmin() berbasis @supabase/ssr (createServerClient) yang menggunakan SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, dan cookies() dari next/headers untuk mengelola sesi login admin.
  
app/admin/actions.js 
Membuat Server Action masukAdmin: memproses email dan password menggunakan signInWithPassword. Jika berhasil dialihkan ke /admin, jika gagal mengembalikan pesan error yang jelas (misal: "Email atau password salah").
Membuat Server Action keluarAdmin: mengakhiri sesi admin dengan signOut dan mengarahkan kembali ke /admin/login.

app/admin/login/page.jsx
Menyambungkan form login ke Server Action masukAdmin via useActionState.
Menampilkan pesan error di atas form ketika login gagal. 
Menghapus komponen CatatanBelumAktif tanpa mengubah tampilan form.
  
components/NavAdmin.jsx
Menghubungkan tombol "Keluar" ke Server Action keluarAdmin menggunakan <form action={keluarAdmin}> dengan mempertahankan posisi dan tampilan tombol.

**Perbaikan:**
membuat agar link masuk sebagai admin mengarahkan ke halaman login
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
