# Backup Policy / Kebijakan Backup

Dokumen ini menjelaskan standar backup sederhana untuk lab Proxmox. Bahasanya dibuat praktis supaya mudah dipakai sebagai referensi belajar maupun checklist saat bekerja.

## Tujuan / Purpose

Tujuan backup bukan hanya membuat salinan data, tetapi memastikan data dan service bisa dipulihkan saat terjadi masalah.

**English takeaway:** Backup must support recovery, not just storage.

## Scope / Cakupan

Kebijakan ini mencakup:

- virtual machine di Proxmox VE;
- datastore di Proxmox Backup Server;
- backup verification;
- retention;
- restore testing;
- keamanan credential dan data backup.

## Prinsip Utama / Core Principles

1. Tentukan dulu sistem mana yang benar-benar kritikal.
2. Pisahkan backup infrastructure dari production compute sebisa mungkin.
3. Jangan anggap backup sukses sebagai bukti bahwa recovery pasti berhasil.
4. Lakukan verification dan restore test secara berkala.
5. Gunakan akun backup dengan hak akses secukupnya / least privilege.
6. Jangan simpan secret atau data sensitif di repository publik.

## Retention / Masa Simpan Backup

Retention menentukan berapa lama restore point disimpan.

Contoh sederhana:

| Layer | Tujuan |
|---|---|
| Recent | Recovery cepat dari incident terbaru |
| Daily | Menyimpan histori harian |
| Weekly | Restore point jangka menengah |
| Monthly | Referensi recovery jangka lebih panjang |

Tidak ada retention yang cocok untuk semua environment.

Pertimbangkan:

- kapasitas storage;
- kebutuhan bisnis;
- regulasi;
- kemungkinan ransomware;
- RPO;
- kebutuhan audit.

## Verification

Kalau verification gagal, jangan langsung anggap backup masih aman.

Periksa:

- task log;
- datastore health;
- unreadable chunk;
- interrupted job;
- storage error;
- konektivitas PBS.

## Restore Test

Minimal proses restore test:

1. pilih known-good backup;
2. restore ke VM ID terpisah;
3. isolasi network;
4. boot VM;
5. cek OS;
6. cek network;
7. cek application;
8. cek data;
9. dokumentasikan hasil.

**English takeaway:** A tested restore is stronger evidence than a successful backup job.

## Security

Jangan simpan hal berikut di public repository:

- password;
- API token;
- authentication ticket;
- private TLS key;
- konfigurasi production sensitif;
- data customer;
- screenshot yang berisi informasi rahasia.

Kalau ingin upload screenshot, lakukan redaction terlebih dahulu.
