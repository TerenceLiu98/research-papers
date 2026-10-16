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
- **Two displacement geometries:** Primal and dual displacement interpolations move particles along straight lines in their respective mirror coordinates, using different directed optimal couplings. On the formal manifold of smooth densities, they are geodesics of conjugate connections whose average is the Otto-metric Levi-Civita connection. They need not minimize Riemannian distance.
- **Pythagorean inequality:** For primal and dual interpolations from a common distribution, a three-divergence difference is bounded below by the initial Otto inner product times squared interpolation time. Equality holds in dimension one under the theorem's assumptions. The lifted geometry is dually flat in that dimension; the sign of its higher-dimensional sectional curvatures remains unresolved in the geometry paper.
- **Asymmetric barycenters:** Right barycenters minimize $\sum_i\lambda_i\mathcal B_\varphi(\nu_i,\nu)$ and left barycenters reverse the arguments. Point representatives average in primal and dual coordinates, respectively; distributional barycenters also require coupling optimization. Existence is established for compactly supported, absolutely continuous input measures in Theorem 5.2 of the geometry paper.
- **Statistical interpretation:** For exponential-family generators, the ground cost is a directed KL divergence between family members. Transport then admits a maximum-likelihood matching interpretation. For mixtures, it compares mixing distributions over components and generally differs from KL between mixture densities.
- **Variational diffusion:** Under the geometric, integrability, and cost-comparison assumptions in [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]], replacing the usual JKO penalty by $\mathcal B_\varphi/\tau$ preserves the limiting Hessian-metric Fokker-Planck equation. An explicit ground cost alone does not guarantee an efficient full solver.

## Important Papers

- [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]]: convergence of general-cost JKO schemes and the Bregman specialization in Theorem 2 and Section 6.
- [[papers/bregman-wasserstein-divergence-geometry-and-applications|Bregman-Wasserstein Divergence: Geometry and Applications]]: the supplied manuscript by Kainth, Rankin, and Wong develops displacement interpolations, dualistic geometry, barycenters, and neural OT examples. The JKO paper cites an earlier two-author version as reference 44.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: coupling optimization with prescribed marginals.
- [[concepts/bregman-divergences|Bregman Divergences]]: convex-potential ground costs and mirror duality.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: distributional averaging extended here to asymmetric transport costs.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: distributional dynamics that compatible Bregman-cost schemes can approximate.
