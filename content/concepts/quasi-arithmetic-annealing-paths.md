---
title: Quasi-Arithmetic Annealing Paths
type: concept
aliases:
  - q-Paths
tags:
  - monte-carlo
  - information-geometry
  - bregman-divergences
---

## Overview

A quasi-arithmetic annealing path connects two density functions by averaging them in a monotonic representation and mapping back. For strictly monotonic $\rho$ and $0\leq\beta\leq1$,

$$
\tilde\pi_\beta^{(\rho)}(x)
=\rho^{-1}\bigl((1-\beta)\rho(\tilde\pi_0(x))+\beta\rho(\tilde\pi_1(x))\bigr).
$$

The intermediate functions are generally unnormalized. Sampling algorithms use their normalized distributions while evaluating unnormalized densities for importance weights or transition ratios.

## Key Ideas

- **Representation chooses the path:** Identity coordinates give an arithmetic mixture; logarithmic coordinates give $\tilde\pi_0^{1-\beta}\tilde\pi_1^\beta$. The deformed logarithm $\log_q u=(u^{1-q}-1)/(1-q)$ gives power-mean q-paths, with the geometric limit at $q=1$.
- **Variational characterization:** For a suitable strictly convex generator, minimizing expected [[concepts/bregman-divergences|Bregman Divergence]] between transformed endpoints and a transformed representative selects this mean. The representative is in the second argument. Changing the generator can leave the path unchanged while changing the objective value.
- **Information value:** The minimum is [[concepts/bregman-information|Bregman Information]], a Jensen gap in representation coordinates. This separates the path itself from the divergence between its endpoints induced by the optimal value.
- **Affine geometry:** Under smoothness assumptions, the path is autoparallel for the primal affine connection induced by the representational divergence. This is not a universal Riemannian shortest-path or Monte Carlo efficiency guarantee.
- **Normalization affects parameterization:** For q-paths, interpolating normalized endpoints and normalizing an interpolation of unnormalized endpoints generally give different distributions at the same weight. Matching them requires a change of weight involving the endpoint normalizers; the geometric case preserves the weight.
- **Practical scope:** Path choice, the discrete annealing schedule, and transition kernels are separate design decisions. The barycenter identity alone does not select the best combination for a sampling problem.

## Important Papers

- [[papers/variational-representations-of-annealing-paths-bregman-information-under-monotonic-embedding|Variational representations of annealing paths: Bregman information under monotonic embedding]]: general barycenter theorem, affine-geodesic result, divergence examples, and normalization analysis.
- Masrani et al. (2021), "q-Paths: generalizing the geometric annealing path using power means": q-path construction and empirical evaluation, cited by the above paper.
- Grosse, Maddison, and Salakhutdinov (2013), "Annealing between distributions by averaging moments": moment-coordinate interpolation in exponential families, discussed by the above paper.

## Related Concepts

- [[concepts/bregman-information|Bregman Information]]: measures the minimum representative loss along the construction.
- [[concepts/bregman-divergences|Bregman Divergences]]: provide losses in transformed coordinates.
- [[concepts/alpha-divergences|Alpha Divergences]]: one family of objectives whose barycenters produce q-paths.
