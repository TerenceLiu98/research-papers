---
title: Alpha Divergences
type: concept
tags:
  - information-geometry
  - statistical-divergences
---

## Overview

Alpha divergences form a one-parameter family of statistical dissimilarities connecting the two orientations of Kullback-Leibler divergence. They can be represented by Bregman divergences after a suitable monotonic coordinate transformation on positive measures. Restricting that construction to normalized probabilities introduces the geometry of the represented simplex.

## Key Ideas

For strictly positive probability vectors $p,q$ and $\alpha\ne\pm1$, the convention used by Nielsen is

$$
D_\alpha(p:q)=\frac{4}{1-\alpha^2}
\left(1-\sum_i p_i^{(1-\alpha)/2}q_i^{(1+\alpha)/2}\right).
$$

- **Endpoint convention:** $D_{-1}(p:q)=D_{\mathrm{KL}}(p:q)$ and $D_1(p:q)=D_{\mathrm{KL}}(q:p)$ by continuous limits. Reversing arguments gives $D_\alpha(p:q)=D_{-\alpha}(q:p)$.
- **Positive measures:** Without normalization, the constant inside the formula is replaced by the sum of the corresponding weighted linear terms in $p_i$ and $q_i$. This ambient cone supports the representational Bregman formulation.
- **Representation matters:** The Bregman generator acts on transformed coordinates. This does not identify every alpha divergence with an ordinary Bregman divergence in the original probability coordinates. Potential formulas must match the chosen scaling and translation of the representation.
- **Sphere geometry:** A fixed-alpha right sphere becomes a Bregman sphere in representation coordinates, subject to the represented-simplex constraint. Lifting to the potential graph turns each ambient sphere equation into a hyperplane equation. Intersections can then be characterized in that lifted space and mapped back.
- **Scope:** A lifted characterization does not by itself establish numerical speed, a nonempty intersection, or a solver for every degenerate configuration. Left spheres correspond to right spheres with parameter $-\alpha$.

## Important Papers

- Amari (2009), "Alpha-Divergence Is Unique, Belonging to Both f-Divergence and Bregman Divergence Classes": representational foundation cited by Nielsen.
- [[papers/curved-representational-bregman-divergences-and-their-applications|Curved Representational Bregman Divergences and Their Applications]]: applies the representation to simplex restrictions and intersections of alpha-divergence spheres.

## Related Concepts

- [[concepts/curved-bregman-divergences|Curved Bregman Divergences]]: the ambient-restriction framework underlying the sphere construction.
