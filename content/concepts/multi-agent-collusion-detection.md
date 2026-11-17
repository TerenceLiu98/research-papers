---
title: Multi-Agent Collusion Detection
type: concept
aliases:
  - Unknown-Subgroup Collusion Detection
definition: Detecting whether an unknown subset of interacting agents coordinates harmful actions by combining evidence across agents and their communications.
tags:
  - multi-agent-safety
  - collusion-detection
---

## Overview

Multi-agent collusion detection asks whether some subgroup coordinates harmful actions. It differs from locating individual dishonest agents and from identifying the exact colluding membership. Evidence can include public transcripts, behavior, and internal activations where available.

## Key Ideas

- **Composite alternatives:** Unknown membership, group size, and signal strength create several possible alternatives to a no-collusion null. A test favorable for sparse score elevation may differ from one favorable for a broad subgroup shift.
- **Joint evidence:** Maximum scores, subgroup contrasts, and activation geometry capture different patterns. Their statistical interpretations depend on assumptions about the joint score distribution.
- **Observation versus causality:** Communication accompanying harmful actions does not establish that removing the communication would prevent those actions.
- **Transfer:** Instructed collusion provides training labels but may not reproduce emergent coordination. Evaluate both settings separately.
- **Operational detection:** AUROC measures ranking across thresholds; deployment also requires recall at acceptable false-positive rates. Failed harmful attempts and successful harm should be distinguished when interpreting labels.

## Important Papers

- [[papers/detecting-multi-agent-collusion-through-multi-agent-interpretability|Detecting Multi-Agent Collusion Through Multi-Agent Interpretability]] formalizes unknown-subgroup testing in HELIOS and tests activation-based monitoring with NARCBENCH. Strong transfer to instructed steganographic tasks contrasts with partial transfer to emergent collusion.

## Related Concepts

- [[concepts/linear-probing|Linear Probing]] supplies local activation sensors; combining their outputs creates a group-level decision problem.
