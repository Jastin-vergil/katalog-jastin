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
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
app/admin/actions.js
Menambahkan Server Action gantiPassword:
Memeriksa sesi login admin via supabase.auth.getUser().
Melakukan validasi di server: memastikan password baru minimal 8 karakter dan sama persis dengan konfirmasi password.
Memperbarui password menggunakan supabase.auth.updateUser({ password: passwordBaru }).
Mengembalikan pesan sukses atau pesan error yang jelas.
  
app/admin/password/page.jsx 
Menyambungkan form ke Server Action gantiPassword via useActionState
Menampilkan notifikasi pesan berhasil (hijau text-utama) atau pesan error (merah text-bahaya).
Mereset input password secara otomatis setelah password berhasil diganti.
Menghapus komponen CatatanBelumAktif tanpa mengubah tata letak maupun tampilan form.

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
proxy.js (dibuat di root proyek)
Menggunakan @supabase/ssr (createServerClient) untuk memeriksa sesi pengguna secara aman di level proxy/middleware Next.js 16. 
Memproteksi seluruh rute /admin dan sub-rutenya (/admin/:path*), kecuali /admin/login. 
Mengalihkan pengunjung yang belum login langsung ke /admin/login.

app/admin/actions.js
Memastikan Server Action yang mengubah data (seperti gantiPassword) memvalidasi sesi admin aktif melalui supabase.auth.getUser() di server sebelum melakukan mutasi data.

app/admin/page.jsx
Menghapus komponen CatatanBelumAktif dari halaman admin.

**Perbaikan:**

## Debugging dan fitur bonus

## US-11 Proteksi halaman admin
**Prompt:**
buatkan filter barang yang dijual

**Hasil:**
components/DaftarProdukKatalog.jsx (komponen baru)
Filter Kategori: Tombol kategori otomatis dibentuk dari data kategori unik yang ada di database (ditambah opsi "Semua").
Pencarian Real-time: Kolom pencarian untuk mencari nama atau deskripsi produk dengan tombol hapus cepat. 
Status Kosong: Menampilkan pesan yang jelas jika tidak ada produk yang cocok dengan hasil filter/pencarian, lengkap dengan tombol "Reset filter".
Desain Konsisten: Memakai token desain Tailwind CSS (bg-utama, border-garis, bg-latar, dsb.) dan tetap mempertahankan layout 2 kolom di mobile serta 3 kolom di desktop.
  
app/page.jsx
Mengambil data produk dari database di sisi server, lalu meneruskannya ke komponen DaftarProdukKatalog untuk penyaringan instan tanpa membebani server/database berulang kali.

## US-07 List produk di halaman admin dari database

**Prompt:**
List produk di halaman admin dari database

**Hasil:**
app/admin/page.jsx
Mengambil daftar produk langsung dari tabel produk di database Supabase di sisi server, bukan lagi dari data contoh (lib/data-contoh.js). 
Menggunakan client sesi admin yang terautentikasi (dengan fallback yang aman ke server client).
Menampilkan pesan error yang jelas jika terjadi kendala pengambilan data dari database. 
Diatur dengan export const dynamic = "force-dynamic" agar perubahan data selalu termuat secara realtime.
  
components/TabelProduk.jsx
Menambahkan penanganan tampilan kondisi kosong (empty state): menampilkan "Belum ada produk" jika tabel tidak memiliki data.

## US-08 Tambah produk (harus terkunci login)
**Prompt:**
buatkan fitur Tambah produk (harus terkunci login)

**Hasil:**
app/admin/actions.js
Menambahkan Server Action tambahProduk:
Memeriksa sesi login admin via supabase.auth.getUser() di server sebelum melakukan mutasi data.
Memvalidasi input (nama wajib diisi, harga berupa angka valid dan ≥0≥0).
Menyimpan produk baru ke tabel produk di Supabase.
Melakukan revalidasi halaman (revalidatePath) untuk / dan /admin.
Mengalihkan (redirect) kembali ke /admin setelah berhasil.
  
components/FormProduk.jsx
Menghubungkan form ke Server Action via useActionState. 
Menampilkan pesan error jika pengisian form tidak valid atau terjadi kendala saat menyimpan. 
Memberikan indikator loading ("Menyimpan...") pada tombol submit saat proses berlangsung.
  
app/admin/produk/baru/page.jsx
Menyambungkan FormProduk dengan action tambahProduk.
Menghapus komponen CatatanBelumAktif.

## US-09 Ubah produk (harus terkunci login)
**Prompt:**
tambahkan fitur Ubah produk (harus terkunci login)

**Hasil:**
app/admin/actions.js
Menambahkan Server Action ubahProduk:
Memeriksa sesi login admin via supabase.auth.getUser() di server sebelum melakukan perubahan data. 
Memvalidasi ID produk, nama produk, serta harga (angka dan ≥0≥0).
Memperbarui data produk di tabel produk Supabase berdasarkan ID. 
Melakukan revalidasi cache halaman (/, /admin, /produk/[id], /admin/produk/[id]/ubah). 
Mengalihkan (redirect) kembali ke /admin setelah berhasil.
  
components/FormProduk.jsx 
Menyisipkan input hidden name="id" secara otomatis saat formulir berada dalam mode edit produk.
  
app/admin/produk/[id]/ubah/page.jsx
Mengambil data produk lama langsung dari database Supabase berdasarkan parameter ID.
Memanggil notFound() jika produk tidak ditemukan di database.
Mengisi form dengan data lama dan menghubungkannya ke action ubahProduk.
Menghapus komponen CatatanBelumAktif.

## US-10 Hapus produk (harus terkunci login)
**Prompt:**
buatkan fitur Hapus produk (harus terkunci login)

**Hasil:**
app/admin/actions.js
Menambahkan Server Action hapusProduk: 
Memeriksa sesi login admin via supabase.auth.getUser() di server sebelum melakukan penghapusan data.
Menghapus baris produk dari tabel produk di Supabase berdasarkan ID.
Melakukan revalidasi cache halaman (/, /admin, dan /produk/[id]).
  
components/TabelProduk.jsx
Menghubungkan tombol "Hapus" ke Server Action hapusProduk.
Menambahkan dialog konfirmasi interaktif (window.confirm) sebelum aksi hapus dijalankan: jika dibatalkan oleh pengguna, permintaan tidak akan dikirimkan.

## US-12 Pilih jumlah atau varian

**Prompt:**
tambahkan fitur Pilih jumlah atau varian

**Hasil:**
components/TombolWhatsApp.jsx:
Pemilihan Jumlah: Menambahkan tombol pengurang (−) dan penambah (+) dengan batas minimal 1 barang.
Pilihan Varian / Catatan: Menambahkan kolom isian varian atau catatan khusus (misalnya: Rasa pedas manis, Ukuran toples, dsb.).
Kalkulasi Total: Menghitung estimasi total harga secara otomatis berdasarkan jumlah pesanan.
Format Pesan WhatsApp: Menyusun pesan WhatsApp secara otomatis yang memuat rincian nama produk, jumlah barang, varian/catatan (jika diisi), serta total harga dalam format Rupiah.

## US-13 Bisa di-install di HP (PWA)
**Prompt:**
tambahkan fitur Bisa di-install di HP (PWA)

**Hasil:**
app/manifest.js (dibuat) 
Menghasilkan file Web App Manifest (/manifest.webmanifest) secara otomatis oleh Next.js. 
Mengonfigurasi nama toko dari lib/toko.js, mode tampilan standalone, warna tema (#1f6b4f), warna latar, serta ikon ukuran 192x192 dan 512x512 dari folder public/icons. 
public/sw.js (dibuat)
Service Worker ringan untuk memenuhi kriteria instalasi PWA pada peramban mobile (Chrome/Chromium/Safari).
  
app/layout.jsx
Menambahkan metadata PWA: manifest, icons, viewport.themeColor, dan appleWebApp (untuk dukungan iOS Safari).
Menambahkan skrip pendaftaran Service Worker saat aplikasi dimuat di peramban.

## US-14 Deskripsi produk dibuat AI
**Prompt:**
US-14 Deskripsi produk dibuat AI

**Hasil:**
app/admin/actions.js 
Menambahkan Server Action buatDeskripsiAI:
Memverifikasi bahwa pemanggil adalah admin yang terautentikasi (supabase.auth.getUser()).
Mengambil GEMINI_API_KEY dari environment variable.
Mengirim prompt ke REST API Google Gemini (gemini-2.0-flash) secara native di server (tanpa library tambahan) untuk menyusun deskripsi produk yang menarik, ringkas, dan relevan berdasarkan nama dan kategori produk. 
Mengembalikan teks deskripsi hasil AI atau pesan error yang informatif.
  
components/FormProduk.jsx
Menambahkan tombol "✨ Buat deskripsi dengan AI" tepat di atas kolom deskripsi.
Mengambil nilai nama produk dan kategori yang sedang diketik, menampilkan status loading "Membuat dengan AI...", dan secara otomatis mengisi area teks deskripsi dengan hasil dari Gemini.
Pengguna tetap dapat mengedit atau menyesuaikan teks deskripsi yang dihasilkan AI sebelum menyimpannya.
  
.env.example
Menambahkan variabel GEMINI_API_KEY= sebagai referensi konfigurasi.