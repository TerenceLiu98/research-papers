---
title: Good Lattice Training
type: concept
aliases:
  - GLT
  - Good Lattice Collocation
tags:
  - physics-informed-neural-networks
  - quasi-monte-carlo
  - numerical-integration
  - collocation-methods
---

## Overview

Good lattice training (GLT) selects collocation points for physics-informed neural networks with a rank-1 lattice rule. It treats the finite physics-informed loss as numerical quadrature for an integrated PDE residual. When that residual is smooth and periodic, number-theoretic lattice construction can reduce integration error faster than random sampling as the number of points grows, improving accuracy per training step without changing the PINN objective or optimizer.

## Key Ideas

- **The physics loss is a quadrature rule.** Evaluating a PDE residual at $N$ collocation points approximates its integral over the domain. Training quality therefore depends on both optimization and the discretization error of the point set.
- **Rank-1 lattices cancel Fourier modes.** Points of the form $\operatorname{frac}(j\mathbf z/N)$ make most nonzero Fourier modes sum to zero. A good generating vector $\mathbf z$ leaves only high-frequency dual-lattice modes with small coefficients.
- **Smoothness determines the gain.** For a loss in a Korobov space with smoothness $\alpha$ and dimension $s$, the error bound is $O((\log N)^{\alpha s}/N^\alpha)$. This can beat Monte Carlo's $O(N^{-1/2})$ rate in smooth, low-dimensional problems but becomes sensitive to dimension and non-smooth solutions.
- **Two-dimensional designs have a Fibonacci construction.** Taking $N=F_k$ and $\mathbf z=(1,F_{k-1})$ gives a good two-dimensional lattice. Higher-dimensional vectors can be searched or taken from numerical tables.
- **Periodization supports the theory.** Coordinate folding, circular encodings, and output transformations can make the residual periodic while enforcing initial or boundary conditions. These transformations may improve other sampling strategies too, so their benefit should be separated from the lattice design.
- **Random shifts support stochastic training.** Adding a uniform random shift modulo one preserves the lattice structure. Resampling the shift across SGD iterations exposes the model to changing points and reduces overfitting to one fixed lattice.
- **The practical scope is limited.** GLT is best suited to smooth PDEs on low-dimensional rectangular domains. Irregular geometry, sharp features, and six or more dimensions can favor other point-generation methods.

## Important Papers

- [[papers/number-theoretic-accelerated-learning-of-physics-informed-neural-networks|Number Theoretic Accelerated Learning of Physics-Informed Neural Networks]]: introduces GLT for PINNs, develops its error analysis and periodization tricks, and evaluates it on forward PDE solution, system identification, and competitive PINNs.
- Sloan and Joe (1994), "Lattice Methods for Multiple Integration": develops the lattice-rule and Korobov-space results underlying the construction.
- Niederreiter (1992), "Random Number Generation and Quasi-Monte Carlo Methods": supplies number-theoretic foundations, including the two-dimensional Fibonacci construction.
- Fang and Wang (1994), "Number-Theoretic Methods in Statistics": provides numerical lattice tables used by the GLT experiments.

## Related Concepts

- [[concepts/representative-points|Representative Points]]: includes Monte Carlo and quasi-Monte Carlo point sets used to approximate continuous targets, though its usual objective need not be a PINN residual integral.
- [[concepts/evidence-based-loss-weighting-for-physics-informed-neural-networks|Evidence-Based Loss Weighting for Physics-Informed Neural Networks]]: improves a different part of PINN training by adapting the relative weights of residual, boundary, and observation losses.
