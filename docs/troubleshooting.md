# Troubleshooting Guide

## PBS Storage Inactive

```bash
pvesm status
pvesm status --storage pbs-dr
```

Check network reachability, DNS, credentials/tokens, TLS fingerprint, datastore availability, and firewall rules.

## Backup Job Failed
Review task logs, storage capacity, VM snapshot errors, guest-agent issues, PBS connectivity, and datastore health.

Do not delete old backups blindly to make room; review retention and capacity first.

## Restore Failed
Check backup verification status, destination capacity, target VM ID, storage/network reachability, and restore task logs.

## Restored VM Does Not Boot

```bash
qm config <VMID>
```

Review boot order, BIOS/UEFI, EFI disk, disk attachment, controller type, and VM hardware settings.

## Restored VM Has No Network
Check bridge, VLAN, NIC model, guest IP, gateway, DNS, duplicate IP, and firewall.

## VM Boots but Application Fails
Validate application service, database, dependencies, certificates, hostname assumptions, configuration, time synchronization, and DNS.

## Suspected Ransomware / Compromise
1. isolate affected VM;
2. preserve logs/evidence;
3. establish incident timeline;
4. identify a backup from before compromise;
5. restore into isolated network;
6. validate before reconnecting.

Never assume the newest backup is clean.
