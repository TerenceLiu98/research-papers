---
title: The Voter Model with a Slow Membrane
type: paper
authors:
  - Zhao
  - Xue
year: 2024
tags:
  - voter-model
  - interacting-particle-systems
  - hydrodynamic-limits
---

## TL;DR

A weakly coupled interface changes the continuum limit of the lattice voter model from unrestricted diffusion to partially transmitting or reflecting diffusion. For dimension $d\geq4$, the paper proves all three hydrodynamic regimes and establishes Gaussian fluctuation limits in two parameter ranges.

## Research Question

How does slowing opinion copying across a hyperplane change the macroscopic density equation and nonequilibrium fluctuations of the [[concepts/voter-model|Voter Model]]?

## Motivation

Slow interactions model weaker influence across a community boundary and provide a microscopic route to PDE boundary conditions. Unlike exclusion dynamics, voter dynamics do not locally conserve magnetization and have slowly decaying correlations. Unknown invariant measures with the membrane make entropy-based proofs difficult.

## Contributions

- Theorem 2.5 proves a hydrodynamic transition at membrane exponent $\beta=1$.
- Theorem 2.9 proves generalized Ornstein–Uhlenbeck fluctuation limits for $\beta=1$ and $\beta>3/2$.
- The proofs obtain replacement lemmas and correlation estimates through dual coalescing random walks with slow bonds.

## Method

On $\mathbb Z^d$, a site copies each nearest neighbor at rate one, except across bonds between first coordinates 0 and 1, where the rate is $\alpha N^{-\beta}$, with $\alpha>0$. Space scales by $N^{-1}$ and time by $N^2$. Initially, spins are independent Bernoulli variables with profile $\rho_0(x/N)$; the profile is globally Lipschitz with a continuous bounded first-coordinate derivative.

The empirical density $N^{-d}\sum_x\eta_t(x)\delta_{x/N}$ converges against compactly supported continuous test functions to the unique weak solution of the heat equation:

| Membrane exponent | Macroscopic interface at $u_1=0$ |
| --- | --- |
| $0\leq\beta<1$ | No interface condition; heat equation on all of $\mathbb R^d$ |
| $\beta=1$ | Robin transmission: $\partial_1^+\rho=\partial_1^-\rho=\alpha(\rho^+-\rho^-)$ |
| $\beta>1$ | Neumann reflection: both one-sided normal-coordinate derivatives vanish |

The centered fluctuation field is

$$
\mathcal Y_t^N(H)=N^{-1-d/2}\sum_x(\eta_t(x)-\mathbb E\eta_t(x))H(x/N).
$$

For the proved ranges it converges to $\partial_t\mathcal Y=\Delta\mathcal Y+\dot{\mathcal W}$ with zero initial field and the corresponding boundary conditions encoded in the test-function space. Noise intensity is $4d(1-\gamma_d)\rho(1-\rho)$, where $\gamma_d$ is the return probability of simple random walk on $\mathbb Z^d$ (Definition 2.7).

Duality turns spin correlations into meeting probabilities of ancestral random walks. Slow-bond invariance principles identify the limiting semigroups; martingale decompositions, replacement lemmas, energy estimates, and tightness identify the density and fluctuation limits (Sections 3–5).

## Experiments

This is a mathematical study with proofs, not numerical or empirical experiments. No datasets are generated or analyzed. The evidence consists of the hydrodynamic theorem, the process-level fluctuation theorem, and the fixed-time Gaussian corollary.

## Limitations

The results require $d\geq4$. Extension to $d=3$ remains open because the argument uses transience in the $d-1$ directions parallel to the membrane. The fluctuation theorem does not cover $0<\beta<1$ or $1<\beta\leq3/2$, although the authors expect analogous limits. The setting is an infinite regular lattice with a flat interface and independent initial spins, rather than an empirical social network.

The supplied Markdown corrupts the author-name line; surnames Zhao and Xue are recoverable from the author-contribution statement. Full names and a stable paper identifier are therefore not asserted here.

## Related Concepts

- [[concepts/voter-model|Voter Model]] — local copying is the microscopic dynamics; the membrane changes its spatial scaling limit.

## Related Papers

- Presutti and Spohn (1983), *Hydrodynamics of the voter model* — baseline hydrodynamic theory without the slow membrane (reference 13).
- Franco and Tavares (2019), *Hydrodynamic limit for the SSEP with a slow membrane* — related interface limits for a locally conserved particle system (reference 8).
- Erhard, Franco, and Da Silva (2021), *The slow bond random walk and the snapping out Brownian motion* — the invariance principle used in the dual-walk proof (reference 3).
