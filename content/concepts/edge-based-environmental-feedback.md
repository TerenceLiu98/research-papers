---
title: Edge-Based Environmental Feedback
type: concept
tags:
  - evolutionary-game-theory
  - environmental-feedback
  - network-dynamics
---

## Overview

Edge-based environmental feedback assigns an environmental state to each interaction. The strategies at its endpoints affect that state, which in turn changes their game payoffs. Environmental adaptation can therefore occur even when the network topology is fixed.

## Key Ideas

- **Local coupling:** Edges with identical endpoint strategies can retain different environments, making joint strategy–environment densities informative.
- **Feedback sign:** When cooperation improves an environment that favors defection, enrichment generates negative feedback. Improvement need not reinforce cooperation.
- **Competing time scales:** The relative frequencies of environmental and strategy updates affect stability and oscillations.
- **Network structure:** Sparse interactions can stabilize coexistence, but neither stabilization nor increased cooperation follows universally from lower degree.
- **Approximation:** Pair closure retains nearest-neighbor correlations while neglecting higher-order structure. Nonlinear imitation probabilities should be averaged over configurations rather than evaluated only at their average payoff.
- **Finite populations:** A deterministic cycle near a strategy-extinction boundary may terminate through stochastic absorption.

## Important Papers

- [[papers/evolutionary-games-on-networks-with-negative-edge-based-environmental-feedback|Evolutionary games on networks with negative edge-based environmental feedback]]: develops binary edge environments and compares mean-field and pair approximations with network simulations.
- Su et al. (2019), “Evolutionary dynamics with game transitions”: a related edge-game transition framework, discussed in that paper as a weak-selection comparison.

## Related Concepts

- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]
- [[concepts/bistability-and-hysteresis|Bistability and Hysteresis]]
