---
title: Voter Model
type: concept
aliases:
  - Voter Process
tags:
  - opinion-dynamics
  - sociophysics
  - stochastic-processes
  - network-science
---

## Overview

The voter model is a stochastic binary-state process in which a selected agent adopts the state of a selected neighbor. With no spontaneous changes, fully aligned configurations are absorbing, and finite connected systems eventually reach consensus. The model provides a minimal setting for studying how local imitation, random drift, network structure, and finite population size shape collective ordering.

## Key Ideas

- The update rule is neutral: neither binary state has an intrinsic advantage. Macroscopic changes arise from demographic fluctuations and the placement of states on the interaction network.
- Consensus probability and consensus time are distinct observables. Network degree heterogeneity, correlations, and update conventions can change ordering times even when the absorbing states remain the same.
- Extensions add noise, nonlinear group influence, zealots, external fields, adaptive networks, or multiple layers. These mechanisms can remove absorbing states, create metastability, or generate crossovers and phase transitions.
- In multilayer variants, agents may carry one state per context. [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]] shows that frequent symmetric reconciliation between an agent's two states can suppress the same-layer imitation events needed for rapid global consensus.
- A failure to reach consensus within a fixed simulation window is not by itself proof of a non-consensus thermodynamic phase; observation time and finite-size scaling must be reported explicitly.

## Important Papers

- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]
- Redner (2019), "Reality-inspired voter models: A mini-review."
- Sood, Antal, and Redner (2008), "Voter models on heterogeneous networks."
- Vazquez and Eguiluz (2008), "Analytical solution of the voter model on uncorrelated networks."

## Related Concepts

- [[Opinion Dynamics]]
- [[Noisy Voter Model]]
- [[Dynamic Hysteresis]]
- Consensus formation
- Absorbing states
- Network heterogeneity
