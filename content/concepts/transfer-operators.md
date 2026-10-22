---
title: Transfer Operators
type: concept
aliases:
  - Perron-Frobenius Operators
  - Perron-Frobenius Transfer Operators
tags:
  - dynamical-systems
  - operator-theory
  - coherent-structures
---

## Overview

Transfer operators describe a dynamical system through the evolution of densities or observables rather than individual trajectories. A transport coupling between two observed distributions can induce a finite-time transfer operator even when the underlying dynamical map is unknown. Spectral structure in that operator can then reveal subsets that move coherently between the observations.

## Key Ideas

- If a coupling has density $\pi=k(\mu\otimes\nu)$, its kernel induces $(K\psi)(y)=\int k(x,y)\psi(x)\,\mathrm d\mu(x)$. For a discrete plan matrix, the corresponding operator is obtained by normalizing with the target marginal.
- Under balanced marginal constraints, constants form the leading singular functions. The next singular pair solves a relaxed coherent-partition problem, and sign thresholding produces paired subsets in the initial and final spaces.
- The inferred operator inherits the assumptions of its coupling. Pointwise-cost [[concepts/optimal-transport|Optimal Transport]] favors short displacement, while [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] favors preservation of intrinsic pairwise geometry and can represent rotations or other isometries.
- Transport coherence, mass preservation, and shape preservation are distinct criteria. A partition may transfer cleanly while changing intrinsic shape; a restricted GW objective can diagnose this difference.
- Two marginal snapshots generally do not identify a unique dynamical map. Symmetries, regularization, solver initialization, noise, and the selected ground geometry can all change the estimated operator.

## Important Papers

- [[papers/gromov-wasserstein-transfer-operators|Gromov-Wasserstein Transfer Operators]] (Beier, 2023): constructs transfer operators from balanced, fused, and unbalanced GW plans and uses their singular structure for coherent-set detection.
- Koltai et al. (2021), "Transfer Operators from Optimal Transport Plans for Coherent Set Detection": develops the OT-plan construction generalized by Beier.
- Junge, Matthes, and Schmitzer (2022), "Entropic Transfer Operators": analyzes entropic finite-dimensional approximations when a ground-truth operator is available on sampled states.
- Froyland (2013), "An Analytic Framework for Identifying Finite-Time Coherent Structures in Time-Dependent Dynamical Systems": spectral foundation cited for coherent-structure extraction.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: provides couplings that can be normalized into transfer kernels.
- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: makes the coupling sensitive to internal geometry rather than absolute coordinates.
- [[concepts/unbalanced-optimal-transport|Unbalanced Optimal Transport]]: relaxes exact marginal preservation when mass changes between observations.
