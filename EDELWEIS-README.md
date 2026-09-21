# Edelweis - Artikel dan catatan Muhamad Fahrul

Website statis hasil adaptasi desain vCard oleh codewithsadee (MIT).
Domain tujuan: https://edelweis.my.id

## Status dan lokasi

Kode website tersedia di branch gh-pages repositori ini. Branch main dan seluruh
dokumentasi asli tidak ditimpa atau dihapus. Penyimpanan kode dan file CNAME
bukan bukti bahwa GitHub Pages sudah aktif atau DNS sudah diarahkan.

Aktivasi Pages dan pengaturan DNS membutuhkan administrator akun. Integrasi
GitHub yang digunakan untuk menulis file tidak menyediakan perubahan pengaturan
Pages atau pengelolaan DNS registrar. Belum ada klaim website publik aktif.

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

## Aktivasi GitHub Pages

1. Buka https://github.com/aaariel18/proxmox-disaster-recovery-lab/settings/pages
2. Build and deployment: Source = Deploy from a branch.
3. Branch = gh-pages; Folder = /(root); klik Save.
4. Pastikan Custom domain = edelweis.my.id; klik Save.
5. Setelah domain terdaftar di Pages, atur record DNS di bawah.
6. Setelah DNS dan sertifikat siap, aktifkan Enforce HTTPS.

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
feed.xml, dan sitemap.xml. Publikasi perubahan branch dilakukan GitHub Pages
setelah Pages diaktifkan sesuai langkah di atas.

README.md, docs/, dan images/ bawaan repositori dipertahankan. Jangan menghapus
file asli untuk memperbarui website. Simpan credential di luar Git.

## Pengujian

Lihat QA-REPORT.md untuk hasil dan batas pengujian offline. Pemeriksaan lokal
bukan bukti bahwa DNS, HTTPS, dan website publik telah aktif.
