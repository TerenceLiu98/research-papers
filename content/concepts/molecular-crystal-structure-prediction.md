---
title: Molecular Crystal Structure Prediction
type: concept
aliases:
  - Molecular CSP
definition: "Predicting periodic packings of molecules from molecular identity by generating candidate crystal structures, relaxing them, and comparing their stability."
tags:
  - molecular-crystals
  - materials-discovery
---

## Overview

Molecular crystal structure prediction searches for periodic arrangements consistent with a molecule's connectivity. Different packings can correspond to polymorphs with different physical properties. The search spans molecular conformations, orientations, unit-cell geometry, and symmetry.

## Key Ideas

- **Proposal coverage and ranking are separate tasks.** A generator must reach useful basins; relaxation and energy evaluation determine which proposed structures are locally favorable.
- **Periodic completeness matters.** Coordinates and lattice parameters together define the periodic structure needed for energy evaluation.
- **Initial energy is insufficient.** A proposal with lower unrelaxed energy can converge to a worse minimum than another starting structure.
- **Stability is a proxy for realization.** Lattice-energy ordering alone does not capture kinetics, solvent effects, or finite-temperature free energies.
- **Physical rewards can adapt proposals.** Energy and force signals can post-train a generator, but approximate rewards require separate downstream validation.

## Important Papers

- [[papers/packflow-generative-molecular-crystal-structure-prediction-via-reinforcement-learning-alignment|PackFlow]]: combines joint coordinate–lattice generation with heavy-atom reward alignment and tests relaxed outcomes on two blind-test examples.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: provides a continuous generative mechanism for crystal proposals.
