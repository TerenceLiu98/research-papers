---
title: Finite-State Graphon Games
type: concept
aliases:
  - Finite State Graphon Games
tags:
  - graphon-games
  - network-games
  - stochastic-control
---

## Overview

Finite-state graphon games model a continuum of heterogeneous agents whose discrete states evolve through controlled stochastic transitions. A graphon weights how each agent interacts with the population. Agents minimize their own expected costs, and a Nash equilibrium requires their optimal controls to reproduce the aggregate exposures used in their individual optimization problems.

## Key Ideas

- **Heterogeneity survives aggregation.** Agents have labels $x\in[0,1]$ and label-specific exposures obtained by integrating against $w(x,y)$. This retains differences in network position instead of imposing one common population exposure.
- **Controls can affect both sides of contact.** In the rumor application, an agent's transition rates depend on its own communication rate and on network-weighted communication by agents in the truth- and rumor-spreading states.
- **Equilibrium couples forward and backward equations.** State probabilities satisfy forward Kolmogorov equations from initial distributions. Individual values satisfy backward Hamilton-Jacobi-Bellman equations from terminal costs. A finite state space makes these ordinary differential equations for each label, but the population still forms a continuum of coupled systems.
- **Existence and uniqueness are separate claims.** A contraction may uniquely determine aggregates for fixed candidate value and probability flows. A subsequent Schauder argument can establish existence of a consistent equilibrium without proving that the equilibrium itself is unique.
- **Block structure enables finite computation.** If interaction weights and parameters are constant within finitely many groups, integrals become group-mass-weighted sums and the continuum system reduces to finitely many coupled equations.
- **Approximation needs its own justification.** Defining a continuum game does not by itself establish an error bound for equilibrium in a finite network. Likewise, numerical fixed-point iteration needs a separate convergence analysis.
- **Policy comparison differs from regulator optimization.** Changing externally set costs reveals model responses. A strategic regulator requires an additional objective and equilibrium formulation.

## Important Papers

- [[papers/modeling-of-rumor-propagation-in-large-populations-with-network-via-graphon-games|Modeling of Rumor Propagation in Large Populations with Network via Graphon Games]]: applies controlled SKIR transitions, two exposure aggregates, conditional equilibrium existence, and block-graphon simulations to rumor propagation.
- Aurell, Carmona, Dayanikli, and Lauriere (2022), "Finite state graphon games with applications to epidemics": methodological antecedent cited in the rumor paper.

## Related Concepts

- [[concepts/graphons|Graphons]]: kernels representing continuum network interactions.
- [[concepts/network-games|Network Games]]: strategic behavior shaped by relational structure.
- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: an application where discrete information states interact with endogenous communication.
