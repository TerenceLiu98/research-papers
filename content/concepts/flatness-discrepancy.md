---
title: Flatness Discrepancy
type: concept
tags:
  - federated-learning
  - optimization
---

## Overview

Flatness discrepancy describes a mismatch between the sharpness of a global federated objective and the weighted sharpness of client objectives. Under heterogeneous data, independently chosen local perturbations can point in different directions, so local flatness need not transfer through model aggregation.

## Key Ideas

- Maximizing the weighted global loss over one shared perturbation differs from maximizing each local loss separately before averaging.
- Differences between local and global perturbation directions interact with local curvature, creating geometric drift beyond parameter disagreement.
- A global-versus-local loss gap is an inexpensive diagnostic, but it also depends on update distances and first-order gradients. Its interpretation as curvature requires additional assumptions.
- Historical update discrepancies can supply a correction signal without directly estimating Hessians. This remains a proxy for geometric alignment.

## Important Papers

- [[papers/fedscar-correcting-geometric-bias-for-flatness-consistent-federated-learning|FedScar]]: accumulates geometric bias and adapts correction strength to client-update dispersion.
- Rethinking the Flat Minima Searching in Federated Learning (Lee and Yoon, 2024): attributed as the discrepancy formulation's source by FedScar.

## Related Concepts

- [[concepts/client-drift|Client Drift]]: the related divergence of local update trajectories from global optimization.
