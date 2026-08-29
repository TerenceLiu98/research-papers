---
title: Opinion Dynamics
type: concept
aliases:
  - Social Influence Models
  - Sociophysics of Opinions
tags:
  - sociophysics
  - agent-based-models
  - social-influence
  - phase-transitions
---

## Overview

Opinion dynamics studies how individual opinions or other social attributes change through interaction, imitation, differentiation, noise, and network structure. Statistical-physics and agent-based models use local update rules to analyze emergent outcomes such as consensus, polarization, coexistence, and metastability.

## Key Ideas

- A binary opinion model can represent the population by the number of agents holding one opinion when interaction symmetry makes that aggregation exact. More general networks usually require node-level or topology-aware states.
- Herding or conformity moves an agent toward opinions observed in others. Anticonformity or differentiation moves it away from matching opinions. Their relative rates can determine whether a system favors consensus or polarization.
- Nonlinear group interactions, such as q-voter rules and threshold rules, make the probability of change depend nonlinearly on the composition of a sampled group. For `q > 1`, these nonlinearities can support order-disorder transitions.
- Stationary distributions can be unimodal, bimodal, or metastable. In the large-population limit, changes in their maxima identify second-order symmetry-breaking transitions and first-order switches between competing consensus states.
- Reaction-resolved trajectories expose currents and activity that are hidden by an aggregate stationary distribution. This makes opinion dynamics a setting in which nonequilibrium methods can study both directional bias and volatility.
- Network topology, heterogeneous agents, zealots, aging, multiple opinions, and changing populations alter the state space and closure assumptions without changing the basic role of reversible update mechanisms.
- Multilayer models let one agent carry context-specific opinions. In [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]], symmetric reconciliation between two personal states can increase within-agent consistency while delaying population-wide consensus.

## Important Papers

- [[Stochastic Thermodynamics of Social Imitation beyond Energetics]]
- [[Consensus, polarization, and nonlinear response in a two-layer voter model with intra-agent cross-layer reconciliation]]
- Castellano, Muñoz, and Pastor-Satorras (2009), "Nonlinear q-voter model."
- Castellano, Fortunato, and Loreto (2009), "Statistical physics of social dynamics."
- Siedlecki, Szwabiński, and Weron (2016), "The Interplay Between Conformity and Anticonformity and its Polarizing Effect on Society."
- Peralta, Carro, San Miguel, and Toral (2018), "Analytical and numerical study of the non-linear noisy voter model on complex networks."

## Related Concepts

- [[Stochastic Thermodynamics]]
- [[Voter Model]]
- [[Dynamic Hysteresis]]
- [[Thermodynamic Uncertainty Relations]]
- [[Co-Adaptive Political Polarization]]
- Agent-based modeling
- Social contagion
- Consensus formation
