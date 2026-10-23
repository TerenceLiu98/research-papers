---
title: "An Exponentially Converging Particle Method for the Mixed Nash Equilibrium of Continuous Games"
type: paper
authors:
  - Guillaume Wang
  - Lénaïc Chizat
year: 2025
tags:
  - continuous-games
  - mixed-nash-equilibrium
  - particle-methods
  - min-max-optimization
  - optimal-transport
---

## TL;DR

Wang and Chizat represent each player's mixed strategy in a continuous two-player zero-sum game as a weighted atomic measure, then update both particle weights and positions with an implicit proximal method. Under uniqueness, sparsity, smoothness, and local non-degeneracy assumptions, their Conic Particle Proximal Point method converges locally at an exponential rate in both Nikaido-Isoda error and Wasserstein-Fisher-Rao distance. A two-step mirror-prox approximation is practical and exhibits the same behavior experimentally, but its general convergence is not proved.

## Research Question

Can first-order particle methods compute an exact sparse mixed Nash equilibrium of a game with continuous, potentially high-dimensional strategy spaces without paying the accuracy-dependent cost of discretizing those spaces?

## Motivation

Finite-grid methods discard payoff-gradient information and require increasingly many grid points to achieve high accuracy, with cost that grows poorly with strategy-space dimension. Explicit mirror descent-ascent also need not converge in its last iterate, even for finite zero-sum games. The paper therefore seeks a last-iterate method that moves the support of atomic mixed strategies as well as their weights.

## Contributions

- Introduces [[conic-particle-proximal-methods|Conic Particle Proximal Methods]], centered on the implicit Conic Particle Proximal Point (CP-PP) update for particle weights and positions.
- Proves local exponential convergence of CP-PP to the exact mixed Nash equilibrium in Nikaido-Isoda error and squared Wasserstein-Fisher-Rao distance.
- Shows that the rate constants do not depend on the chosen particle counts; sufficient particle capacity is instead implicit in the required small initial optimality gap.
- Relates CP-PP, Conic Particle Mirror Prox (CP-MP), and Conic Particle Mirror Descent-Ascent (CP-MDA) to implicit, two-step, and explicit discretizations of an interacting Wasserstein-Fisher-Rao gradient flow.
- Proves the same local rate for CP-MP only in an exact-parameterization setting, and compares the algorithms numerically on synthetic continuous games and neural-network classification problems.

## Method

For payoff $f(x,y)$, the mixed strategies are parameterized as

$$
\mu=\sum_{i=1}^n a_i\delta_{x_i},
\qquad
\nu=\sum_{j=1}^m b_j\delta_{y_j}.
$$

This converts the bilinear game over measures into a finite-dimensional saddle problem that is generally nonconvex-nonconcave in particle locations. CP-PP applies a proximal saddle update: Kullback-Leibler penalties regularize changes in particle weights, while weight-scaled squared distances regularize changes in positions. These two components correspond respectively to Fisher-Rao mass variation and Wasserstein transport.

The main theorem assumes compact toroidal strategy spaces, a payoff with Lipschitz-continuous second derivatives, and a unique sparse equilibrium. It additionally requires strict complementarity away from the equilibrium support and positive/negative definite local Hessians at the minimizing/maximizing support points. For sufficiently small comparable weight and position step sizes, and initialization below an unspecified Nikaido-Isoda-error threshold, the theorem gives

$$
\operatorname{NI}(\mu^k,\nu^k)\leq C(1-\kappa)^k
$$

and the same geometric factor for the sum of squared Wasserstein-Fisher-Rao distances to the equilibrium measures.

Because an exact CP-PP step requires solving a saddle problem, the implementable variant performs repeated first-order inner updates. One inner step is CP-MDA, two are CP-MP, and infinitely many recover CP-PP. The proof uses a particle-clustering Lyapunov function, local growth and error-bound inequalities, and local star-convexity-concavity around the equilibrium.

## Experiments

The experiments use CP-MP rather than exact CP-PP.

- On a one-dimensional periodic payoff sampled through a finite Fourier expansion, with 15 particles per player, the Nikaido-Isoda error and Lyapunov potential decrease exponentially and particles cluster around a three-point equilibrium support.
- A constructed periodic game has a unique two-point equilibrium and demonstrates that the explicit CP-MDA dynamics may fail to converge while CP-MP converges exponentially.
- In a five-sample max-$\mathcal F_1$-margin classification example with 50 positive-sign and 50 negative-sign neurons, the measured Nikaido-Isoda error falls exponentially and the learned two-layer network is sparse. This setting is outside the theorem because one strategy space is discrete and uniqueness is not established.
- Distributionally robust versions with perturbation radii $0.2$ and $0.3$, ten adversarial particles per sample, and the same network architecture also show exponentially decreasing error. Adversarial support concentrates near portions of the perturbation disks closest to the decision boundary.
- Smooth activation matters in the reported toy classification setup: cubic and squared ReLU variants converge exponentially in the experiments, whereas ordinary ReLU reaches an oscillatory error near $10^{-3}$.

The supplied paper points to public Julia code for these experiments, but does not report repeated-run uncertainty or wall-clock comparisons against alternative solvers.

## Limitations

- The guarantee is local. The admissible initialization radius is neither quantified in a usable way nor efficiently certifiable because the Nikaido-Isoda error itself is difficult to compute or upper-bound.
- Uniqueness, sparse support, strict complementarity, and local Hessian non-degeneracy are strong assumptions that generally can only be checked after obtaining the equilibrium.
- The proof requires discrete-time step sizes of comparable order. Its bounds do not establish convergence of the associated continuous-time flow.
- CP-PP is not directly implementable because each update solves an exact saddle problem. General convergence of the practical two-step CP-MP variant is supported experimentally but proved only when the particle parameterization exactly matches the equilibrium support.
- Several classification experiments fall outside the formal assumptions, and the synthetic demonstrations are small-scale.
- The source supplies a manuscript date but no DOI, arXiv identifier, or publication venue, so none is inferred here.

## Related Concepts

- [[conic-particle-proximal-methods|Conic Particle Proximal Methods]]
- [[wasserstein-gradient-flows|Wasserstein Gradient Flows]]
- [[approximate-nash-equilibrium|Approximate Nash Equilibrium]]

## Related Papers

- Domingo-Enrich et al. (2020), "A Mean-Field Analysis of Two-Player Zero-Sum Games": introduces the interacting Wasserstein-Fisher-Rao dynamics used as geometric context.
- Chizat (2022), "Sparse Optimization on Measures with Over-Parameterized Gradient Descent": supplies related weighted-particle analysis and non-degeneracy conditions for measure optimization.
- Daskalakis and Panageas (2019), "Last-Iterate Convergence: Zero-Sum Games and Constrained Min-Max Optimization": analyzes last-iterate convergence in finite games.
- Wei et al. (2020), "Linear Last-Iterate Convergence in Constrained Saddle-Point Optimization": gives finite-dimensional last-iterate rates under uniqueness.
- Wang and Chizat (2023), "Local Convergence of Gradient Methods for Min-Max Games: Partial Curvature Generically Suffices": the follow-up cited for conditions under which continuous-time behavior converges in the exact-parameterization case.

Source: supplied parsed Markdown for Cognitio job `933321d3-0b62-4e09-98e8-54948017306c`.

[[index|Library home]]
