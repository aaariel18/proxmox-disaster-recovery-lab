# Troubleshooting Guide / Panduan Troubleshooting

Tujuan panduan ini adalah membantu menentukan **masalahnya di mana** sebelum mengambil keputusan restore.

## 1. PBS Storage Inactive

Cek:

```bash
pvesm status
pvesm status --storage pbs-dr
```

Lalu periksa:

- PBS bisa diping / diakses;
- DNS bekerja;
- credential atau API token masih valid;
- TLS fingerprint sesuai;
- datastore tersedia;
- firewall tidak memblokir koneksi;
- storage tidak penuh.

Jangan langsung melakukan perubahan besar sebelum tahu sumber masalahnya.

---

## 2. Backup Job Failed

Periksa:

- task log;
- free storage;
- snapshot error;
- guest agent;
- PBS connectivity;
- datastore health.

Kalau storage penuh, jangan asal menghapus backup lama. Cek retention policy dan kebutuhan recovery lebih dulu.

---

## 3. Restore Failed

Cek:

- verification status;
- target storage capacity;
- VM ID yang digunakan;
- PBS connectivity;
- target node;
- restore task log.

Kalau backup belum diverifikasi dan restore gagal, jangan langsung menyimpulkan Proxmox bermasalah. Bisa jadi restore point-nya memang tidak sehat.

---

## 4. VM Berhasil Restore tapi Tidak Boot

Cek konfigurasi:

```bash
qm config <VMID>
```

Perhatikan:

- boot order;
- BIOS / UEFI;
- EFI disk;
- disk attachment;
- controller;
- virtual hardware.

Bandingkan dengan konfigurasi VM sebelumnya bila tersedia.

---

## 5. VM Boot tapi Tidak Ada Network

Periksa:

- bridge;
- VLAN;
- NIC model;
- guest IP;
- gateway;
- DNS;
- firewall;
- duplicate IP.

Masalah setelah restore sering kali bukan di backup, tetapi karena network identity dari VM lama ikut terbawa.

---

## 6. VM Hidup tapi Application Tidak Jalan

Jangan langsung menyatakan recovery berhasil.

Periksa:

- application service;
- database;
- dependency;
- certificate;
- hostname;
- DNS;
- time synchronization;
- config file;
- connection string.

**VM running != service recovered.**

---

## 7. Suspected Ransomware / Compromise

Urutan aman:

1. isolate affected VM;
2. preserve logs / evidence;
3. tentukan incident timeline;
4. cari backup sebelum compromise;
5. restore ke isolated network;
6. validasi;
7. baru pertimbangkan reconnect ke production.

Jangan otomatis memilih backup terbaru.

Backup paling baru bisa saja sudah membawa kondisi yang terinfeksi.

---

## Quick Troubleshooting Mindset

Gunakan urutan ini:

```text
Application
   ↓
Guest OS
   ↓
VM
   ↓
Storage
   ↓
Network
   ↓
PVE Host
   ↓
PBS
```

Mulai dari layer yang paling dekat dengan gejala, lalu turun perlahan.

**English takeaway:** Find the failing layer first. Recovery is a decision, not a reflex.
