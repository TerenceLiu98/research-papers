---
title: Graphon Mean Field Games
type: concept
aliases:
  - GMFG
  - GMFG Equations
tags:
  - mean-field-games
  - graphon-games
  - stochastic-control
  - network-games
---

## Overview

Graphon mean field games describe strategic interactions among a continuum of agents whose population label also specifies a position in a limiting network. Unlike a classical mean field game with one aggregate distribution, a GMFG maintains an ensemble $(\mu_\alpha)_{\alpha\in[0,1]}$ of local state distributions and weights cross-label effects through a [[concepts/graphons|graphon]].

## Key Ideas

- **Network position survives the population limit.** Each label $\alpha$ has its own local distribution and graphon section $g(\alpha,\cdot)$, so agents with different interaction profiles face different dynamics, costs, and feedback laws.
- **Local and network effects can coexist.** A model may include unweighted interaction within the agent's local cluster and graphon-weighted interaction with all other clusters.
- **Equilibrium is a forward-backward consistency problem.** Label-indexed HJB equations determine best responses for a proposed distribution ensemble. Controlled McKean-Vlasov dynamics propagate distributions forward, and equilibrium requires the generated distributions to reproduce the proposal.
- **Existence and uniqueness are conditional.** In Caines and Huang's diffusion framework, regularity gives well-posed best responses and state laws, while sensitivity and contraction assumptions make the distributional consistency map contractive.
- **Finite-network relevance needs a separate approximation theorem.** Continuum feedback laws become an epsilon-Nash equilibrium only under conditions linking finite graph sections and growing cluster populations to the graphon model.
- **The graph topology matters to convergence.** Cut convergence alone may not control each agent's interaction profile strongly enough; analyses can require uniform sectional approximation.
- **Classical mean field games are a special case.** When graphon sections do not distinguish labels and local distributions coincide, the ensemble collapses to a common mean field.

## Important Papers

- [[papers/graphon-mean-field-games-and-the-gmfg-equations|Graphon Mean Field Games and the GMFG Equations]]: formulates continuous-state diffusion GMFG equations, proves conditional existence and uniqueness, and establishes an asymptotic epsilon-Nash result for finite clustered networks.
- Caines and Huang (2018), "Graphon mean field games and the GMFG equations": introduces the framework in conference form.
- Caines and Huang (2019), "Graphon mean field games and the GMFG equations: epsilon-Nash equilibria": develops the finite-population equilibrium connection in conference form.

## Related Concepts

- [[concepts/graphons|Graphons]]: continuum kernels encoding heterogeneous network interaction strengths.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: bounds the gain from unilateral deviation when continuum controls are deployed in large finite games.
- [[concepts/finite-state-graphon-games|Finite-State Graphon Games]]: a discrete-state counterpart with graphon-coupled forward and backward equations.
- [[concepts/network-games|Network Games]]: the broader family of strategic models in which relational structure shapes payoffs or dynamics.
