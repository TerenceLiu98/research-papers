---
title: Complete Convergence with Coexistence
type: concept
tags:
  - interacting-particle-systems
  - stochastic-processes
  - voter-model
---

## Overview

For a two-type interacting particle system with absorbing uniform states, complete convergence with coexistence describes the limiting law from every initial configuration. The limit is a mixture of the two absorbing point masses and a single stationary coexistence law. Its weights are the probabilities of hitting each absorbing state and of avoiding both forever.

## Key Ideas

In the symmetric voter-perturbation setting of Cox and Perkins, the conclusion is

$$
\mathcal L_{\xi_0}(\xi_t)\Rightarrow
\beta_0(\xi_0)\delta_{\mathbf0}
+\beta_\infty(\xi_0)\nu_{1/2}
+\beta_1(\xi_0)\delta_{\mathbf1}.
$$

Here $\nu_{1/2}$ has density $1/2$ and assigns probability one to configurations with infinitely many sites of both types. Density alone would not establish coexistence: an equal mixture of the two uniform states also has one-site density $1/2$.

- The conclusion is convergence in distribution, not convergence of sample paths to a fixed configuration. A stationary coexistence process can continue changing locally.
- Complete convergence specifies both the attracting coexistence law and the dependence on initial conditions. In the cited theorem, the coexistence weight is positive for every nonuniform configuration and equals one when both types initially have infinite support.
- In two dimensions, monotonicity, cancellativity, finite-range voter perturbation structure, and positive scaling-limit drift $\Theta_3$ suffice for sufficiently small perturbations. Positive drift supports block growth; comparison with supercritical oriented percolation and annihilating-dual arguments completes the proof.
- The ordinary two-dimensional [[Voter Model]] clusters and has no such stationary coexistence component. Finite simulation persistence likewise does not establish a complete convergence theorem on an infinite lattice.
- The [[Q-Voter Model]] result requires $q<1$ sufficiently close to 1 and at most eight neighbours. The general criterion also covers affine, geometric, and symmetric spatial Lotka-Volterra models near their voter-model parameters.

## Important Papers

- [[A complete convergence theorem for the q-voter model and other voter model perturbations in two dimensions]]: establishes the general two-dimensional criterion and q-voter application.
- Cox and Perkins (2014), "A complete convergence theorem for voter model perturbations": earlier framework extended by the two-dimensional result.

## Related Concepts

- [[Voter Model]]
- [[Q-Voter Model]]
- [[Super-Brownian Motion]]
