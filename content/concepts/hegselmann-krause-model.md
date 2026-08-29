---
title: Hegselmann–Krause Model
type: concept
aliases:
  - HK Model
  - Hegselmann–Krause Opinion Model
  - Bounded-Confidence Hegselmann–Krause Model
tags:
  - opinion-dynamics
  - bounded-confidence
  - interacting-particle-systems
  - consensus
  - phase-transitions
---

## Overview

The Hegselmann–Krause model is a continuous [[Opinion Dynamics|opinion-dynamics]] model in which each agent moves toward the average position of agents lying inside a bounded confidence region. Because agents ignore opinions beyond that region, simple local attraction can produce global consensus, several separated opinion clusters, or metastable configurations. Noisy and continuous-time variants treat opinion change as an interacting-particle process and support order-disorder phase transitions.

## Key Ideas

- Each agent has a position in a continuous, potentially multidimensional opinion space. Its confidence radius determines which other positions contribute to its update.
- Bounded confidence makes the interaction graph state dependent: edges appear or disappear as agents move. Agents in disconnected confidence components can converge to different clusters rather than a shared opinion.
- Additive noise competes with local attraction. Weak noise permits concentrated clusters, while sufficiently strong noise can destabilize ordered states and produce an approximately uniform opinion distribution.
- Continuous-time stochastic formulations admit mean-field descriptions as nonlinear aggregation-diffusion equations. Linear stability of the uniform density can then approximate the critical noise scale.
- Consensus conditions depend on both interaction coverage and force direction. In [[A modified Hegselmann–Krause model for interacting voters and political parties]], voters attract nearby voters, voters and parties attract one another, and parties repel competing parties. The added party influence raises the model's predicted critical noise strength for voter clustering.
- The number of coordinates in an opinion space is a modeling choice and should not automatically be interpreted as empirically measured [[Ideological Dimensionality|effective ideological dimensionality]].

## Important Papers

- Hegselmann and Krause (2002), "Opinion dynamics and bounded confidence: Models, analysis and simulation."
- Wang, Li, E, and Chazelle (2017), "Noisy Hegselmann–Krause systems: Phase transition and the 2R-conjecture."
- Nugent, Gomes, and Wolfram (2024), "Bridging the gap between agent based models and continuous opinion dynamics."
- [[A modified Hegselmann–Krause model for interacting voters and political parties]]

## Related Concepts

- [[Opinion Dynamics]]
- [[Ideological Dimensionality]]
- Bounded confidence
- Consensus formation
- Interacting particle systems
- Aggregation-diffusion equations
