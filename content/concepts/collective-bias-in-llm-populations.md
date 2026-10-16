---
title: Collective Bias in LLM Populations
type: concept
aliases:
  - Collective Misalignment in Naming Games
tags:
  - llm-agents
  - collective-bias
  - population-size
---

## Overview

Collective bias is an imbalance in the outcomes reached by interacting LLM agents when the available coordination outcomes are equally viable under the task's rewards. In naming games, it is measured through consensus frequencies across repeated population runs. It can differ in both magnitude and direction from an isolated agent's initial preference.

## Key Ideas

- **Three forms of divergence.** Interaction can amplify an initial preference, create a preference from individually neutral choices, or reverse the direction of the initial preference.
- **Memory conditions behavior.** An empty-memory probability measures only the starting state. Subsequent choices depend on interaction histories, so initial bias alone does not identify the collective outcome.
- **Population size is an experimental variable.** Larger groups can suppress fluctuations and concentrate on one convention, but the scale at which this occurs depends on the model and action pair. A single group size cannot characterize the full dynamics.
- **Stability and selection differ.** Two consensus equilibria may both be locally stable while the usual initialization overwhelmingly reaches one basin. Predictable selection does not require the other equilibrium to disappear.
- **Convergence is a separate outcome.** Report whether populations reach consensus, which word they select, and how long they take. A run ending at a time limit is not evidence of consensus.
- **Keep the operational scope explicit.** Unequal selection of equally rewarded names is evidence of convention bias. Its implications for discriminatory behavior or other safety failures require additional task-specific evidence.

## Important Papers

- [[papers/group-size-effects-and-collective-misalignment-in-llm-multi-agent-systems|Group size effects and collective misalignment in LLM multi-agent systems]] compares four model families and eleven word pairs, connecting population-size effects to cached memory-conditioned policies and mean-field dynamics.
- Flint Ashery, Aiello, and Baronchelli (2025), *Emergent social conventions and collective bias in LLM populations*, Science Advances 11(20), eadu9368: the precursor cited by that paper for collective bias emerging from individually neutral agents.

## Related Concepts

- [[concepts/naming-game|Naming Game]]: a controlled setting for measuring convention selection.
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]: explains why initial conditions and attraction basins can matter when multiple equilibria are stable.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: separates artificial-population results from human behavioral claims.
