---
title: Curved Bregman Divergences
type: concept
aliases:
  - Curved Representational Bregman Divergences
tags:
  - information-geometry
  - bregman-divergences
---

## Overview

A curved Bregman divergence evaluates an ambient Bregman divergence on a nonlinearly constrained parameter set. For an embedding $\theta$, it has the form $D(u:v)=B_F(\theta(u):\theta(v))$. The embedding preserves access to ambient geometry, but the resulting divergence generally is not an ordinary Bregman divergence in the coordinates $u$.

## Key Ideas

- **Restriction versus reparameterization:** An injective affine map on a convex domain gives a sub-dimensional Bregman divergence with generator $F\circ\theta$. Nonlinear embeddings do not generally satisfy this identity. A representational construction additionally changes coordinates before imposing the constraint.
- **Cosine example:** Restricting $\tfrac12\|x-y\|^2$ to unit vectors gives $1-\langle x,y\rangle$. On the circle this is $1-\cos(u-v)$, while the restricted quadratic potential is constant.
- **Centroid projection:** For normalized nonnegative weights and $\bar x=\sum_i w_i x_i$, minimizing $\sum_i w_iB_F(x_i:y)$ over a constrained set is equivalent to minimizing $B_F(\bar x:y)$. The candidate lies in the second argument; reversing arguments changes the centroid problem.
- **Constraint cost:** The objective equals the unconstrained minimum plus $B_F(\bar x:y)$. A constrained centroid therefore adds a projection penalty. The minimizer may be nonunique or fail to exist without suitable conditions on the set.
- **Symmetrization:** With Legendre-type $F$, the embedding $(x,\nabla F(x))$ and ambient potential $G(a,b)=F(a)+F^*(b)$ represent $B_F(x:y)+B_F(y:x)$ as a restricted Bregman divergence.
- **Density families:** For pointwise Bregman losses, the same argument projects the weighted mixture density onto the admissible family, subject to the integrals being well-defined.

## Important Papers

- [[papers/curved-representational-bregman-divergences-and-their-applications|Curved Representational Bregman Divergences and Their Applications]]: develops the restriction framework, centroid projection theorem, and representational sphere construction.
- Nielsen and Nock (2009), "Sided and symmetrized Bregman centroids": antecedent centroid theory cited by that paper.

## Related Concepts

- [[concepts/alpha-divergences|Alpha Divergences]]: represented on a positive measure cone and restricted to an embedded probability simplex.
- [[concepts/bregman-pca|Bregman PCA]]: Bregman reconstruction through nonlinear low-dimensional representations.
- [[concepts/bregman-wasserstein-divergence|Bregman-Wasserstein Divergence]]: uses an ambient Bregman divergence as a transport cost, a different construction from restriction to a submanifold.
