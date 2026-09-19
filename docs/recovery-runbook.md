# Recovery Runbook / Panduan Restore

Runbook ini dibuat supaya proses recovery tidak dilakukan berdasarkan ingatan saja. Saat incident terjadi, langkah yang sederhana dan terdokumentasi jauh lebih aman.

## Sebelum Mulai / Before Recovery

Catat dulu:

- VM ID dan nama VM;
- waktu failure;
- last known-good time;
- backup timestamp;
- verification status;
- incident note.

Jangan langsung overwrite VM asli kalau belum yakin.

## PVE Checks

```bash
qm status <VMID>
qm config <VMID>
pvesm status
```

Tujuannya untuk melihat apakah masalah memang membutuhkan restore.

## Preferred Restore Strategy

Untuk lab dan recovery test, pendekatan yang lebih aman:

```text
Original VM 101
    |
    v
Verified Backup
    |
    v
Restore as VM 901
    |
    v
Isolated Network
    |
    v
Validation
    |
    v
Production Cutover
```

Kenapa VM ID dibedakan?

Supaya VM lama tidak langsung tertimpa dan kita masih punya ruang untuk membandingkan konfigurasi atau melakukan rollback.

## Network Safety

Sebelum menyalakan recovery VM, cek kemungkinan duplicate:

- IP address;
- hostname;
- MAC-related configuration;
- static route;
- application identity.

Kalau perlu, disconnect NIC lebih dulu.

## Windows Validation

```powershell
Get-Service
Get-WinEvent -LogName System -MaxEvents 50
ipconfig /all
route print
```

Hal yang diperiksa:

- service penting;
- error setelah boot;
- IP dan gateway;
- route;
- application dependency.

## Linux Validation

```bash
systemctl --failed
journalctl -p err -b
ip addr
ip route
df -h
```

Periksa:

- failed service;
- boot error;
- network;
- filesystem;
- disk space.

## Final Checklist

- [ ] Correct backup selected
- [ ] Verification reviewed
- [ ] Recovery VM isolated
- [ ] Tidak ada duplicate IP / hostname conflict
- [ ] VM boots normally
- [ ] OS healthy
- [ ] Network healthy
- [ ] Application healthy
- [ ] Data verified
- [ ] Authentication works
- [ ] User test successful
- [ ] Production cutover completed
- [ ] Actual RPO documented
- [ ] Actual RTO documented

**English takeaway:** Restore first into a safe environment, validate everything, then cut over.
