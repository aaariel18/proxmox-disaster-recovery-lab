# Edelweis - Artikel dan catatan Muhamad Fahrul

Website statis hasil adaptasi desain vCard oleh codewithsadee (MIT).
Domain tujuan: https://edelweis.my.id

## Status dan lokasi

Kode website tersedia di branch gh-pages repositori ini. Branch main dan seluruh
dokumentasi asli tidak ditimpa atau dihapus.

Deployment GitHub Pages untuk commit 7505e3b07bdd1c17b72e0a453bb9319cd14ab3ae
berhasil pada 21 September 2026. Job build, report-build-status, dan deploy
semuanya success. Log deployment mencatat alamat http://edelweis.my.id/.

Bukti: https://github.com/aaariel18/proxmox-disaster-recovery-lab/actions/runs/35556089362

Status deployment berhasil tidak sama dengan verifikasi DNS/HTTPS. Akses publik
melalui domain, propagasi DNS, dan sertifikat HTTPS belum berhasil diverifikasi
dari lingkungan pemeriksaan. Pengelolaan DNS registrar tetap memerlukan akun
pemilik. Integrasi GitHub yang digunakan tidak menyediakan pengelolaan DNS.

## Isi website

- Empat artikel: Proxmox Backup & Disaster Recovery, Ruijie multi-site VPN,
  n8n PO automation, dan FactoryLens.
- Desain responsif; halaman Artikel, Tentang, Proyek, dan Kontak.
- Pencarian dan filter, daftar isi, salin kode/tautan, indikator baca, print CSS.
- HTML artikel terpisah, metadata, sitemap, RSS, robots.txt, dan halaman 404.
- Tautan GitHub dan LinkedIn, sumber artikel, status proyek, lisensi template.
- Tanpa framework, analytics, formulir pengumpulan data, font remote, atau
  dependency JavaScript eksternal. Artikel tetap dapat dibaca tanpa JavaScript.

Artikel merupakan adaptasi editorial dokumentasi publik, bukan sinkronisasi
real-time. Perubahan README sumber tidak otomatis mengubah artikel website.
Tidak ada angka performa, penghematan, RPO/RTO, atau hasil field test yang dibuat.

## Konfigurasi GitHub Pages dan domain

Pages sudah menghasilkan deployment yang berhasil. Konfigurasi berikut menjadi
referensi pemeriksaan atau pemulihan, bukan instruksi untuk membuat ulang situs:

1. Buka https://github.com/aaariel18/proxmox-disaster-recovery-lab/settings/pages
2. Build and deployment: Source = Deploy from a branch.
3. Branch = gh-pages; Folder = /(root).
4. Custom domain = edelweis.my.id.
5. Sesuaikan record DNS pada penyedia domain dengan tabel di bawah.
6. Setelah DNS dan sertifikat siap, aktifkan Enforce HTTPS jika belum aktif.

Jangan merge branch gh-pages ke main hanya untuk mengaktifkan website.

## Nameserver dan DNS

GitHub Pages tidak menyediakan nameserver untuk dipasang di registrar.
Pertahankan nameserver authoritative penyedia DNS yang sekarang apabila layanan
tersebut menyediakan pengelolaan A/CNAME. Isilah DNS Management/Zone Editor,
bukan kolom Nameserver, dengan record berikut.

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | aaariel18.github.io | 3600 |

Jangan menambahkan nama repositori atau https:// ke nilai CNAME.
Backup/catat record lama sebelum mengubah routing web. Jangan menghapus MX, TXT,
record email, atau layanan lain. Record web A/AAAA/CNAME lama pada @ atau www
yang konflik perlu disesuaikan; jangan memakai wildcard.

IPv6 opsional. Bila diperlukan, gunakan keempat AAAA resmi GitHub Pages:
2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153,
2606:50c0:8003::153. Jangan menyisakan AAAA yang menunjuk hosting lama.

Verifikasi kepemilikan melalui GitHub account Settings > Pages > Add a domain
disarankan. Ambil nilai TXT yang benar dari akun sendiri; nilai tidak boleh
dikarang. Perubahan DNS dan penerbitan sertifikat dapat memerlukan hingga 24 jam.

Jika registrar hanya menyediakan penggantian nameserver, gunakan penyedia DNS
yang Anda kontrol dan ambil nameserver dari zone edelweis.my.id pada akun itu.
Nameserver harus yang benar-benar ditetapkan untuk domain, bukan contoh acak.

Referensi resmi:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Menjalankan secara lokal

Unduh branch gh-pages. Buka index.html, atau jalankan dari folder website:

    python -m http.server 8000

Kemudian buka http://localhost:8000. Website tidak memerlukan server aplikasi,
database, API key, atau proses build.

## Pemeliharaan

File website berada di branch gh-pages. Artikel ada di artikel/; aset di assets/.
Ketika menambah artikel, perbarui juga index.html, content-manifest.json,
feed.xml, dan sitemap.xml. Perubahan branch gh-pages memicu publikasi Pages.

README.md, docs/, dan images/ bawaan repositori dipertahankan. Jangan menghapus
file asli untuk memperbarui website. Simpan credential di luar Git.

## Pengujian

Lihat QA-REPORT.md untuk hasil dan batas pengujian offline. Build/deployment
GitHub Pages sudah berhasil seperti bukti di atas. Pemeriksaan lokal dan
keberhasilan deployment belum membuktikan DNS, HTTPS, dan akses publik domain.
