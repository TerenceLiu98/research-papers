---
title: Bregman Divergences
type: concept
aliases:
  - Bregman Divergence
tags:
  - information-geometry
  - bregman-divergences
  - clustering
---

## Overview

A Bregman divergence measures the gap between a strictly convex potential and its tangent approximation. For a convex domain $S$ and a potential $\phi$ differentiable on its relative interior,

$$
d_\phi(x,y)=\phi(x)-\phi(y)-\langle x-y,\nabla\phi(y)\rangle,
\qquad x\in S,\ y\in\operatorname{ri}(S).
$$

This construction includes squared Euclidean distance, KL divergence on probability vectors, generalized I-divergence on nonnegative vectors, and Itakura-Saito distance on positive values. It supplies a common language for clustering losses and exponential-family likelihoods.

## Key Ideas

- **Geometry:** The divergence is nonnegative and vanishes only at equality. It is convex in its first argument, but need not be convex in its second argument, symmetric, or a metric. Adding an affine term to the potential leaves the divergence unchanged.
- **Mean representatives:** For an admissible mean $\mu=\mathbb EX$, $\mathbb E[d_\phi(X,s)]=\mathbb E[d_\phi(X,\mu)]+d_\phi(\mu,s)$. Consequently, the mean uniquely minimizes expected loss when the representative occupies the second argument.
- **Clustering:** Nearest-representative assignment followed by weighted arithmetic-mean updates monotonically improves a Bregman hard clustering objective. The representatives change with assignments even though the update formula is independent of the divergence. The algorithm provides local optimality.
- **Argument order:** For a Legendre potential, $d_\phi(x,y)=d_{\phi^*}(\nabla\phi(y),\nabla\phi(x))$. Reversing the centroid objective therefore leads to averaging in dual coordinates when these maps are defined.
- **Likelihood connection:** With $\phi=\psi^*$ for a regular exponential-family cumulant, the density can be expressed as $b_\phi(x)e^{-d_\phi(x,\mu)}$ in sufficient-statistic coordinates. The converse correspondence in Banerjee and colleagues uses their regular subclass of divergences, not every convex potential.
- **Feature combinations:** Positive weighted sums of compatible potentials combine losses across feature groups. Their domains and strict convexity must remain appropriate for the intended data.

## Important Papers

- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: unifies hard clustering, expectation-parameter EM, and finite-support rate-distortion analysis.
- [[papers/curved-representational-bregman-divergences-and-their-applications|Curved Representational Bregman Divergences and Their Applications]]: studies restrictions to embedded parameter sets and the resulting centroid projection problem.

## Related Concepts

- [[concepts/bregman-information|Bregman Information]]: expected divergence to the mean and its quantization decomposition.
- [[concepts/bregman-pca|Bregman PCA]]: reconstruction objectives adapted to non-Euclidean data geometry.
- [[concepts/curved-bregman-divergences|Curved Bregman Divergences]]: constraints on the ambient parameter domain.
- [[concepts/bregman-wasserstein-divergence|Bregman-Wasserstein Divergence]]: uses a Bregman divergence as an optimal-transport ground cost.
