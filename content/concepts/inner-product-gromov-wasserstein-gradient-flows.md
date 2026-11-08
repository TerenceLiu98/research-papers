---
title: Inner-Product Gromov-Wasserstein Gradient Flows
type: concept
aliases:
  - IGW Gradient Flows
  - Inner-Product GW Gradient Flows
tags:
  - gromov-wasserstein
  - gradient-flows
  - probability
  - stochastic-processes
---

## Overview

Inner-product Gromov-Wasserstein (IGW) gradient flows evolve probability laws using a geometry that compares distortions of pairwise inner products rather than pointwise displacement in a shared ambient space. This makes the geometry invariant under orthogonal transformations and places the dynamics within the broader family of [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]] methods.

## Key Ideas

- **Intrinsic quadratic geometry.** IGW minimizes the expected squared difference between inner products $\langle x,x'\rangle$ and $\langle y,y'\rangle$ over couplings. It is a pseudometric on probability measures because orthogonally transformed laws are indistinguishable.
- **Variational construction.** An IGW-JKO step minimizes an energy plus a time-scaled squared IGW discrepancy. Its continuous-time limit is a continuity equation whose velocity is obtained through a nonlocal, distribution-dependent mobility operator.
- **Global convexity can fail.** Relative entropy with respect to a standard Gaussian is not lambda-convex for any lambda along generalized or modified generalized IGW geodesics. A suitable local convexity estimate can nevertheless control the discrete scheme and construct the flow.
- **Gaussian entropy flow becomes explicit.** For the relative-entropy flow, the implicit integro-differential equation reduces to a nonlinear Fokker-Planck equation. Its second-moment matrix evolves autonomously by $\dot A_t=\tfrac12(A_t^{-1}-I)$, converting the law equation into a linear, time-inhomogeneous Fokker-Planck equation.
- **Probabilistic representation.** The linearized equation is realized by a linear SDE with drift and diffusion coefficients determined by $A_t$. This process resembles Ornstein-Uhlenbeck dynamics but is not generally a deterministic time change of the classical process.
- **Entropy convergence.** Spectral control of $A_t$ and the Gaussian log-Sobolev inequality yield exponential convergence to the standard Gaussian in relative entropy.

## Important Papers

- [[papers/probabilistic-representation-and-convergence-of-gromov-wasserstein-gradient-flows|Probabilistic Representation and Convergence of Gromov-Wasserstein Gradient Flows]] (Karumanchi, Goldfeld, Kato, and Zhang, 2026): constructs the Gaussian relative-entropy flow beyond global geodesic convexity and derives its PDE, matrix ODE, SDE, and convergence representations.
- Zhang et al. (2026), "Gradient Flows and Riemannian Structure in the Gromov-Wasserstein Geometry": develops the foundational IGW gradient-flow and mobility-operator framework.
- Vayer (2020), "A Contribution to Optimal Transport on Incomparable Spaces": studies the inner-product variant of Gromov-Wasserstein comparison.

## Related Concepts

- [[concepts/gromov-wasserstein-distance|Gromov-Wasserstein Distance]]: broader intrinsic-geometry comparison based on pairwise relational distortion.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: classical pointwise-transport geometry whose entropy flow is the Ornstein-Uhlenbeck semigroup.
- [[concepts/optimal-transport|Optimal Transport]]: supplies coupling and variational tools used in both Wasserstein and IGW constructions.
