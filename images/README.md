# Images

This directory contains supporting diagrams for the disaster-recovery documentation.

Files:
- `architecture.svg` - PVE/PBS reference architecture
- `recovery-flow.svg` - disaster recovery process
- `troubleshooting-flow.svg` - layered troubleshooting process

## Interface Screenshots

The main README uses screenshots served directly from the **official Proxmox documentation** instead of locally fabricated UI screenshots.

Official sources:
- Proxmox VE documentation: https://pve.proxmox.com/pve-docs/
- Proxmox Backup Server documentation: https://pbs.proxmox.com/docs/

## Future Real Lab Evidence

If the lab is executed on a real Proxmox environment, create `images/screenshots/` and add:
1. PVE dashboard
2. PBS integration
3. backup job
4. backup task log
5. PBS datastore
6. verification job
7. restore operation
8. recovery VM console
9. service validation
10. final recovery evidence

Redact credentials, tokens, public IPs, internal domains, and sensitive business data before committing.
