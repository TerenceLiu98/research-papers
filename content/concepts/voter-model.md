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

Degree-dependent continuous-time copying at rate $d(v)^\varphi$ has ancestral-walk stationary weights proportional to $d(v)^{1-\varphi}$. On [[concepts/hyperbolic-random-graphs|Hyperbolic Random Graphs]], the consensus scale can match the inverse stationary collision flux even with slow mixing; establishing this requires control of remeeting probabilities.

A spatial interface can also change the continuum limit. In [[papers/the-voter-model-with-a-slow-membrane|The Voter Model with a Slow Membrane]], copying across a hyperplane at rate $\alpha N^{-\beta}$ produces unrestricted diffusion, Robin transmission, or Neumann reflection as $\beta$ passes through 1, for $d\geq4$. This concerns density evolution on an infinite lattice rather than finite-system consensus times.

Multistate models with fixed zealots can also infer stationary affiliation distributions on directed, weighted networks. When every evaluated user is reachable from a zealot, fixed reference opinions anchor a unique equilibrium. In [[papers/voter-model-can-accurately-predict-individual-opinions-in-online-populations|Voter model can accurately predict individual opinions in online populations]], retweet-based stationary marginals recover 92.5% of labeled affiliations. This validates equilibrium correspondence in one election dataset, rather than temporal opinion trajectories. Pairwise discord requires joint-state equations unless independence conditions hold.

Innovation can make the number of opinions fluctuate even in a population of fixed size. When each innovation introduces an absent opinion, the mean waiting time between innovations competes with the time for copying to restore consensus. On a complete graph of $N$ agents, a single dissenter takes about $\log N$ generations on average to reach unanimity through copying. Innovations arriving more slowly allow frequent returns to consensus. See [[papers/analysis-of-a-voter-model-with-an-evolving-number-of-opinion-states|Analysis of a voter model with an evolving number of opinion states]].

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
