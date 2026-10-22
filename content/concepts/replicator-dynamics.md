---
title: Replicator Dynamics
type: concept
aliases:
  - Replicator Equation
tags:
  - evolutionary-game-theory
  - dynamical-systems
  - population-models
---

## Overview

Replicator dynamics models how the prevalence of strategies changes according to relative payoff. Strategies performing better than the population average gain mass, while strategies performing worse lose mass. The dynamics preserve total probability and do not introduce a strategy that initially has zero mass.

## Key Ideas

- For finitely many strategies with frequencies $\sigma_i$ and payoff matrix $A$, the standard equation is $\dot\sigma_i=\sigma_i((A\sigma)_i-\sigma^\top A\sigma)$. Subtracting the population-average payoff makes the rates sum to zero.
- A probability measure can replace a finite frequency vector when the pure-strategy space is continuous. The payoff advantage then becomes a function over strategies, and multiplying that function by the current measure gives a measure-valued ODE.
- Replicator dynamics describes adaptive selection, not optimization by a fully rational representative agent. Its stationary and limiting states can be related to game equilibria, but the relationship depends on the game and stability notion.
- Spatial extensions allow payoff advantages to depend on player positions and population interactions. In [[papers/spatially-inhomogeneous-evolutionary-games|Spatially Inhomogeneous Evolutionary Games]], each agent carries a mixed-strategy measure that both affects its motion and evolves under a population-dependent payoff kernel.
- Mean-field limits connect large finite systems to deterministic measure dynamics. Stability in a probability metric is what turns convergence of initial empirical distributions into convergence of their subsequent evolution.

## Important Papers

- Taylor and Jonker (1978), "Evolutionarily Stable Strategies and Game Dynamics": an early formulation connecting evolutionary stability and population dynamics.
- Hofbauer and Sigmund (2003), "Evolutionary Game Dynamics": a broad account of replicator dynamics and related evolutionary processes.
- Boccabella, Natalini, and Pareschi (2011), "On a Continuous Mixed Strategies Model for Evolutionary Game Theory": studies a probability-measure formulation for continuous mixed strategies.
- [[papers/spatially-inhomogeneous-evolutionary-games|Spatially Inhomogeneous Evolutionary Games]] (Ambrosio, Fornasier, Morandotti, and Savaré, 2021): couples measure-valued replicator dynamics to spatial motion and proves mean-field well-posedness and stability.

## Related Concepts

- Evolutionary game theory
- Mean-field models
- Dynamical systems
- [[concepts/optimal-transport|Optimal Transport]]
