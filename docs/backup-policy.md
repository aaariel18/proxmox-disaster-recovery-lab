# Backup Policy

## Purpose
Define a practical backup standard for this Proxmox Disaster Recovery Lab.

## Scope
- Proxmox VE virtual machines
- Proxmox Backup Server datastore
- backup verification
- retention
- recovery testing

## Principles
1. Identify critical systems before scheduling backups.
2. Separate backup infrastructure from production compute where possible.
3. Never treat a successful backup task as proof of recoverability.
4. Use verification and periodic restore tests.
5. Use least-privilege backup credentials.
6. Do not commit secrets or production-sensitive data.

## Example Retention Model
Actual retention must follow business and legal requirements.

| Layer | Example Purpose |
|---|---|
| Recent | Fast recovery from recent incidents |
| Daily | Short-term historical restore points |
| Weekly | Medium-term recovery |
| Monthly | Longer-term recovery reference |

## Verification
Investigate failed verification, unreadable chunks, unavailable datastores, interrupted jobs, and storage health issues.

## Restore Testing
1. Select a known-good backup.
2. Restore to an isolated VM ID.
3. Prevent network identity conflicts.
4. Boot the recovered system.
5. Validate OS.
6. Validate application.
7. Validate data.
8. Record actual recovery duration.

## Security
Never store passwords, API tokens, authentication tickets, private TLS keys, sensitive production configs, or customer data in this public repository.
