# Disaster Recovery Plan

## Objective
Restore critical virtualized services after VM failure, configuration corruption, storage problems, host failure, or other major disruption.

## Recovery Priorities
Example only:
1. identity/authentication dependencies;
2. database services;
3. business application services;
4. supporting infrastructure;
5. monitoring/non-critical services.

Actual priority must be based on business impact.

## Incident Phases

### Detect
Identify affected systems, failure time, recent changes, and impact.

### Contain
For suspected compromise, isolate the VM and preserve relevant evidence.

### Diagnose
Determine whether the fault is in the application, guest OS, VM configuration, storage, network, PVE host, or PBS.

### Recover
Select a verified restore point and recover into an isolated VM when practical.

### Validate
Validate boot, filesystem, networking, application, database, authentication, and user access.

### Cut Over
Return the service only after validation.

### Review
Record root cause, restore point, actual RPO, actual RTO, evidence, and follow-up actions.
