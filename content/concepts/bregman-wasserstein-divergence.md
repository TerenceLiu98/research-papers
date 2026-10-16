---
title: Bregman-Wasserstein Divergence
type: concept
aliases:
  - Bregman Transport Cost
tags:
  - optimal-transport
  - information-geometry
  - riemannian-geometry
---

## Overview

The Bregman-Wasserstein divergence is an optimal transport cost whose ground cost is a Bregman divergence. It compares probability measures using the geometry of a convex potential and is generally asymmetric. On a Hessian manifold it supplies an explicit transport penalty compatible with the local Riemannian metric.

## Key Ideas

For a smooth convex potential $\varphi$ with positive-definite Hessian,

$$
B_\varphi(x,y)=\varphi(x)-\varphi(y)-D\varphi(y)\cdot(x-y),
\qquad
\mathcal B_\varphi(\mu,\nu)=\inf_{\pi\in\Pi(\mu,\nu)}\int B_\varphi(x,y)\,d\pi.
$$

- **Local geometry:** The identity $-\partial_{x^i}\partial_{y^j}B_\varphi(x,x)=\partial_{ij}\varphi(x)$ recovers the Hessian metric. This does not make the divergence equal to half the squared geodesic distance globally.
- **Quadratic special case:** With $\varphi(x)=\tfrac12\|x\|^2$, the transport cost is $\tfrac12W_2^2(\mu,\nu)$.
- **Mixed coordinates:** Writing the cost as $\tfrac12\|x-D\varphi(y)\|^2+a(x)+b(y)$ shows that, for fixed marginals and finite integrals, the coupling optimization reduces to quadratic transport between $\mu$ and $(D\varphi)_\#\nu$. The marginal terms still contribute to the value and matter when a marginal is optimized in a JKO step.
- **Cost segments:** These become straight segments in dual coordinates: $D\varphi(y_t)=(1-t)D\varphi(y_0)+tD\varphi(y_1)$. Convexity of the dual image ensures their existence.
- **Variational diffusion:** Under the geometric, integrability, and cost-comparison assumptions in [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]], replacing the usual JKO penalty by $\mathcal B_\varphi/\tau$ preserves the limiting Hessian-metric Fokker-Planck equation. An explicit ground cost alone does not guarantee an efficient full solver.

## Important Papers

- [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]]: convergence of general-cost JKO schemes and the Bregman specialization in Theorem 2 and Section 6.
- Rankin and Wong (2023), "Bregman-Wasserstein Divergence: Geometry and Applications," arXiv:2302.05833: the geometric precursor cited by that paper as reference 44.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: coupling optimization with prescribed marginals.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: distributional dynamics that compatible Bregman-cost schemes can approximate.
