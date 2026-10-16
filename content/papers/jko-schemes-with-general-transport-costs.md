---
title: JKO Schemes with General Transport Costs
type: paper
authors:
  - Cale Rankin
  - Ting-Kam Leonard Wong
year: null
tags:
  - optimal-transport
  - wasserstein-gradient-flows
  - riemannian-geometry
  - partial-differential-equations
---

[[index|Library home]]

## TL;DR

The quadratic Wasserstein penalty in a JKO step can be replaced by a possibly asymmetric transport cost that induces the same Riemannian metric, subject to additional geometric and growth assumptions. The resulting interpolants converge weakly to the same Riemannian Fokker-Planck solution. Bregman costs provide an explicit alternative to computing geodesic distances on Hessian manifolds.

## Research Question

When can a general optimal transport cost replace half the squared Wasserstein distance in the JKO scheme without changing its limiting diffusion equation?

## Motivation

Riemannian distances often lack tractable formulas, making the ground cost of a Wasserstein optimization expensive to evaluate. A divergence can encode the required local metric through its mixed Hessian while being much easier to evaluate. This separates the geometry of the limiting PDE from the particular cost used in each variational step.

## Contributions

- Theorem 1 establishes existence and uniqueness of discrete minimizers and weak convergence at each fixed time to the Riemannian Fokker-Planck equation for compatible general costs.
- The analysis covers precompact domains with smooth boundary and a Neumann boundary condition, and complete manifolds with Ricci curvature bounded below and finite drift and second moment.
- Theorem 2 specializes the construction to Bregman divergences inducing Hessian metrics. Section 6 explains their reduction to quadratic transport in mixed primal and dual coordinates.

## Method

For densities relative to Riemannian volume, define

$$
\mathcal F(\rho)=\beta^{-1}\int_M\rho\log\rho\,d\mathrm{Vol}_g
+\int_M\psi\rho\,d\mathrm{Vol}_g,
\qquad
\mathcal T_c(\mu,\nu)=\inf_{\pi\in\Pi(\mu,\nu)}\int c(x,y)\,d\pi(x,y).
$$

The update is

$$
\rho_{k+1}^{\tau}=\operatorname*{argmin}_{\rho\in\mathcal P(M)}
\left\{\mathcal F(\rho)+\tau^{-1}\mathcal T_c(\rho,\rho_k^{\tau})\right\}.
$$

The order of the marginals matters for asymmetric costs. The smooth cost is nonnegative and vanishes only on the diagonal, with compatibility condition

$$
-\partial_{x^i}\partial_{y^j}c(x,x)=g_{ij}(x).
$$

The general theorem additionally assumes the twist conditions A1, an invertible mixed Hessian A2, ambient self-$c$-convexity, and two-sided comparison $\lambda d_g^2\leq c\leq\Lambda d_g^2$. The potential is smooth and nonnegative with $\|\nabla_g\psi\|\leq C(1+\psi)$. Initial data have finite entropy, with finite second moment and drift needed in the complete-manifold analysis (Sections 2 and 5).

Lower semicontinuity, strict convexity, and entropy and moment estimates establish well-defined updates. Variations along vector-field flows yield the discrete Euler-Lagrange equation. Taylor estimates along $c$-segments control its error by the transport cost; energy dissipation and compactness then yield the weak PDE limit (Sections 3-5). Uniqueness of that limit gives convergence of the full family, at each fixed time, in weak $L^1(M,d\mathrm{Vol}_g)$:

$$
\partial_t\rho=\beta^{-1}\Delta_g\rho+\operatorname{div}_g(\rho\nabla_g\psi).
$$

For a smooth potential $\varphi$ with positive-definite Hessian on an open convex domain, the cost

$$
B_\varphi(x,y)=\varphi(x)-\varphi(y)-D\varphi(y)\cdot(x-y)
$$

induces $g=D^2\varphi$. Convexity of the dual image $D\varphi(\Omega)$ supplies the required ambient $c$-convexity. The precompact case follows from Theorem 2(i); the complete case retains the curvature and global cost-comparison assumptions. The associated [[concepts/bregman-wasserstein-divergence|Bregman-Wasserstein Divergence]] reduces transport optimization to a Euclidean quadratic problem after transforming the second marginal by $D\varphi$, with marginal-dependent corrections to the cost value.

## Experiments

This is a theoretical paper with no numerical benchmarks or measured speedups. Section 6 gives illustrative Hessian-metric examples and discusses applying the precompact-domain result to Gaussian statistical manifolds with Fisher-Rao geometry. Neural implementations and entropic regularization are proposed as future directions in Section 7.

## Limitations

- Metric compatibility alone is insufficient: the convergence theorem also requires twist, nondegeneracy, convexity, and cost-comparison assumptions. The authors identify A2 and global two-sided comparison as restrictive.
- The proved PDE is the Fokker-Planck equation, including heat flow when the potential vanishes. Extension to other PDEs remains open in this work.
- The paper provides qualitative convergence, not a quantitative convergence rate or a practical solver guarantee. Easier ground-cost evaluation does not establish faster end-to-end JKO optimization.
- Being a Legendre-type convex potential does not by itself imply every condition in the Bregman theorem.

Source note: The supplied parsed text contains corrupted symbols in several formulas. This summary uses the recoverable definitions and theorem statements and omits ambiguous example coefficients. The source does not specify this paper's publication year, venue, DOI, or arXiv identifier; the year is therefore left null.

## Related Concepts

- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: the continuous dynamics approximated by the variational scheme.
- [[concepts/optimal-transport|Optimal Transport]]: defines the coupling penalty for general ground costs.
- [[concepts/bregman-wasserstein-divergence|Bregman-Wasserstein Divergence]]: the main tractable Hessian-geometric specialization.

## Related Papers

- Jordan, Kinderlehrer, and Otto (1998), "The Variational Formulation of the Fokker-Planck Equation" (reference 24): the original JKO construction.
- Zhang (2007), "Variational Approximation for Fokker-Planck Equation on Riemannian Manifold" (reference 57): the Riemannian convergence framework used in the proof.
- Rankin and Wong (2023), "Bregman-Wasserstein Divergence: Geometry and Applications," arXiv:2302.05833 (reference 44): studies the geometry of the Bregman transport cost.
