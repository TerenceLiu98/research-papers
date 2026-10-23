---
title: Mean-Field Langevin Dynamics
type: concept
aliases:
  - MFLD
  - Mean-Field Langevin Dynamics
tags:
  - probability
  - optimal-transport
  - langevin-dynamics
  - partial-differential-equations
---

## Overview

Mean-field Langevin dynamics (MFLD) is a diffusion-regularized [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flow]] on probability measures. For a functional $F$ and temperature $\tau>0$, it evolves

$$
\partial_t\mu_t=\nabla\cdot\bigl(\mu_t\nabla F'[\mu_t]\bigr)+\tau\Delta\mu_t,
$$

which is the Wasserstein gradient flow of $F_\tau=F+\tau H$, where $H$ is negative differential entropy. It includes McKean-Vlasov diffusion and, when $F$ is linear, overdamped Langevin dynamics.

## Key Ideas

- **Equilibrium is self-consistent.** A stationary measure $\nu$ satisfies $F'[\nu]+\tau\log\nu=\mathrm{constant}$ under suitable regularity.
- **Global and local geometry differ.** Global convergence results often use uniform log-Sobolev inequalities. Near equilibrium, the Poincare constant can instead determine the sharp $\chi^2$ decay rate.
- **Negative Sobolev control reveals monotonicity.** Writing $f_t=d\mu_t/d\nu-1$, a weighted $H^{-1}_\nu$ energy cancels the elliptic operator that obscures the sign of interaction terms in a direct $L^2_\nu$ estimate.
- **The framework extends beyond gradient systems.** Coupled descent-ascent and multi-species diffusions can inherit analogous local rates when their interaction field is linearly monotone.
- **Local convergence is not global convergence.** A rate proved inside a small $\chi^2$ neighborhood does not show that arbitrary trajectories enter that neighborhood.

## Important Papers

- [[papers/local-convergence-of-mean-field-langevin-dynamics-from-gradient-flows-to-linearly-monotone-games|Local Convergence of Mean-Field Langevin Dynamics: From Gradient Flows to Linearly Monotone Games]]: derives local $\chi^2$ convergence rates governed by Poincare inequalities and extends the argument to descent-ascent and multi-species systems.
- Chizat (2022), "Mean-Field Langevin Dynamics: Exponential Convergence and Annealing": establishes global exponential convergence under linear convexity and a uniform log-Sobolev condition.
- Nitanda, Wu, and Suzuki (2022), "Convex Analysis of the Mean Field Langevin Dynamics": gives an independent global convergence analysis under related assumptions.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]

