# Disaster Recovery Plan / Rencana Pemulihan Bencana

Dokumen ini berisi alur sederhana yang bisa dipakai sebagai pegangan saat service virtual di Proxmox mengalami gangguan besar.

## Objective / Tujuan

Memulihkan service penting setelah terjadi:

- VM failure;
- salah konfigurasi;
- corruption;
- storage problem;
- host failure;
- incident keamanan;
- gangguan lain yang membuat service tidak tersedia.

## Recovery Priority / Prioritas Pemulihan

Urutan di bawah hanya contoh:

1. authentication / identity service;
2. database;
3. business application;
4. supporting service;
5. monitoring dan non-critical service.

Di environment nyata, prioritas harus mengikuti **business impact**, bukan sekadar urutan teknis.

## Incident Phases / Tahapan Incident

### 1. Detect

Cari tahu:

- service apa yang terdampak;
- kapan mulai gagal;
- perubahan terakhir;
- seberapa luas dampaknya.

### 2. Contain

Kalau ada dugaan compromise atau ransomware:

- isolate VM;
- jangan langsung reconnect;
- simpan log penting;
- hindari perubahan yang bisa menghilangkan evidence.

### 3. Diagnose

Tentukan masalah berada di layer mana:

- application;
- guest OS;
- VM configuration;
- storage;
- network;
- PVE host;
- PBS.

Tujuannya supaya kita tidak melakukan restore kalau masalah sebenarnya hanya service yang berhenti.

### 4. Recover

Kalau restore memang diperlukan:

- pilih backup yang sudah diverifikasi;
- cek incident timeline;
- restore ke isolated recovery VM bila memungkinkan.

### 5. Validate

Jangan berhenti setelah VM berhasil boot.

Validasi:

- filesystem;
- network;
- service;
- application;
- database;
- authentication;
- data;
- user access.

### 6. Cut Over

Baru pindahkan kembali ke production setelah semua validation selesai.

### 7. Review

Setelah incident selesai, catat:

- root cause;
- backup yang dipakai;
- actual RPO;
- actual RTO;
- kendala selama recovery;
- tindakan pencegahan berikutnya.

**English takeaway:** Disaster recovery ends when the service is usable again, not when the VM merely boots.
