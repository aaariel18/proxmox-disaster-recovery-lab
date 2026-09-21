# QA - Edelweis website

Tanggal: 21 September 2026.

29 pemeriksaan berhasil, tanpa error pada pemeriksaan yang dijalankan:

- Enam file HTML: target link/aset lokal dan anchor diperiksa secara statis.
- Homepage dan empat artikel: tidak ada horizontal overflow pada viewport
  320, 390, 768, dan 1440 piksel (20 kombinasi).
- Pencarian, filter kategori, empty state, reset, dan empat panel navigasi.
- Daftar isi, keberadaan tombol kode, indikator baca, dan tombol kembali ke atas.
- Isi artikel tetap terbaca saat JavaScript dinonaktifkan.
- Sintaks assets/app.js diperiksa dengan node --check (pemeriksaan tambahan).

Metode: Chromium headless dengan HTML/CSS/JS hasil generasi dirender offline
melalui in-memory document. Navigasi URL lokal diblokir kebijakan lingkungan,
sehingga link diperiksa secara statis, bukan diklaim sebagai HTTP end-to-end test.

Belum diuji: halaman publik hosting, DNS authoritative, penerbitan sertifikat,
link eksternal, clipboard pada browser pengunjung, dan kinerja production.
Tidak ada hasil lab Proxmox, VPN, n8n, atau CNC yang diklaim oleh uji website ini.
