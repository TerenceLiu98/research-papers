---
title: Memetic Drift
type: concept
tags:
  - convention-formation
  - multi-agent-systems
  - stochastic-processes
---

## Overview

Memetic drift is stochastic change in convention frequencies caused by sampling and repeated social transmission. In interacting LLM populations, one agent's sampled output becomes another agent's evidence, allowing arbitrary choices to accumulate into agreement even under initially neutral preferences.

## Key Ideas

- **Neutrality is an ensemble property.** Individual runs can choose different winners while the expected population distribution remains unchanged.
- **Communication injects variance.** In Quantized Simplex Gossip, sending m independent sampled labels reduces the excess polarization drift by a factor of m relative to a single sampled label. Full-distribution exchange removes this source of noise.
- **Selection competes with drift.** Weak systematic preference can dominate in larger populations or at higher message bandwidth. Neutral consensus alone does not imply systematic collective bias.
- **Time units matter.** The homogeneous QSG approximation predicts characteristic time proportional to population size squared in pairwise interactions, but linear in population size when measured in rounds.
- **Absorption requires conditions.** Hard QSG with full copying reduces to a finite voter process; weaker adaptation supports drift identities without the same proved finite-time absorption guarantee.

## Important Papers

- [[papers/when-is-collective-intelligence-a-lottery-multi-agent-scaling-laws-for-memetic-drift-in-llms|When Is Collective Intelligence a Lottery? Multi-Agent Scaling Laws for Memetic Drift in LLMs]] introduces the QSG account and tests its scaling predictions in controlled LLM naming games.

## Related Concepts

- [[concepts/naming-game|Naming Game]]
- [[concepts/voter-model|Voter Model]]
- [[concepts/collective-bias-in-llm-populations|Collective Bias in LLM Populations]]
