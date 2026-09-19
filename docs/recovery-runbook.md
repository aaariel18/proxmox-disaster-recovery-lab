# Recovery Runbook

## Record Before Recovery
- VM ID and name
- failure time
- last known-good time
- backup timestamp
- verification status
- incident notes

## PVE Checks

```bash
qm status <VMID>
qm config <VMID>
pvesm status
```

## Preferred Lab Restore Strategy

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

## Windows Validation

```powershell
Get-Service
Get-WinEvent -LogName System -MaxEvents 50
ipconfig /all
route print
```

## Linux Validation

```bash
systemctl --failed
journalctl -p err -b
ip addr
ip route
df -h
```

## Final Checklist
- [ ] Correct backup selected
- [ ] Verification reviewed
- [ ] Recovery VM isolated
- [ ] No duplicate IP/hostname conflict
- [ ] VM boots
- [ ] OS healthy
- [ ] Network healthy
- [ ] Application healthy
- [ ] Data verified
- [ ] Authentication verified
- [ ] User test successful
- [ ] Production cutover completed
- [ ] Actual RPO documented
- [ ] Actual RTO documented
