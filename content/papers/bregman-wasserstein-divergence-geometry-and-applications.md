---
title: "Bregman-Wasserstein Divergence: Geometry and Applications"
type: paper
authors:
  - Amanjit Singh Kainth
  - Cale Rankin
  - Ting-Kam Leonard Wong
year: null
tags:
  - optimal-transport
  - information-geometry
  - wasserstein-barycenters
  - wasserstein-gradient-flows
---

[[index|Library home]]

## TL;DR

Optimal transport with a Bregman ground cost lifts asymmetric information geometry to probability distributions while remaining reducible to quadratic transport in mixed primal and dual coordinates. The paper develops two displacement interpolations, a generalized Pythagorean inequality, and conjugate connections compatible with Otto's metric. Synthetic examples illustrate neural transport and geometry-dependent barycenters; a Bregman-cost JKO scheme connects the construction to Riemannian diffusion.

## Research Question

Which geometric and computational properties of quadratic Wasserstein transport extend when the ground cost is an asymmetric Bregman divergence?

## Motivation

Euclidean quadratic transport captures spatial displacement but cannot express directional asymmetry. Statistical models often have a natural Bregman geometry, including KL costs on exponential families. Directly using the associated Riemannian geodesic distance can be computationally inconvenient. Bregman costs provide explicit formulas, a compatible local Hessian metric, and access to existing quadratic OT solvers after a coordinate change.

## Contributions

- Characterizes optimal maps through Brenier transport between mixed coordinates (Proposition 2.10), building on earlier reductions, and interprets exponential-family transport as maximum-likelihood matching (Section 2.3).
- Defines primal and dual displacement interpolations and proves a generalized Pythagorean inequality, with equality in dimension one (Theorem 3.6).
- Constructs torsion-free conjugate connections on a formal manifold of smooth probability densities. Their average is the Otto-metric Levi-Civita connection; the two interpolations are geodesics for their respective connections (Theorems 4.5 and 4.11).
- Shows that the lifted geometry is dually flat in dimension one and relates primal and dual sectional curvatures by reversing the ordered tangent pair in higher dimensions (Theorem 4.13).
- Establishes existence of right Bregman-Wasserstein barycenters for compactly supported, absolutely continuous inputs (Theorem 5.2), with a multimarginal characterization, and illustrates Bayesian model averaging under transport losses.

## Method

Let $\Omega$ be smooth on an open convex domain $\mathcal X$, with positive-definite Hessian and convex dual image $\mathcal Y=D\Omega(\mathcal X)$. The mirror map has inverse $D\Omega^*$. Define

$$
B_\Omega(x,x')=\Omega(x)-\Omega(x')-D\Omega(x')\cdot(x-x'),
\qquad
\mathcal B_\Omega(\mu,\nu)=\inf_{\pi\in\Pi(\mu,\nu)}\int B_\Omega(x,x')\,d\pi.
$$

For $\Omega(x)=\tfrac12\|x\|^2$, this equals $\tfrac12W_2^2$. More generally, set $y'=D\Omega(x')$ and complete the square:

$$
B_\Omega(x,x')=\tfrac12\|x-y'\|^2
+\Omega(x)-\tfrac12\|x\|^2
+\Omega^*(y')-\tfrac12\|y'\|^2.
$$

With the required integrability, the last two terms are fixed by the marginals. For an absolutely continuous source, the Brenier map $Df$ from $\mu$ to $(D\Omega)_\#\nu$ therefore yields the Bregman-optimal map $T=D\Omega^*\circ Df$. The marginal corrections must still be included when evaluating the divergence.

Writing $\mu^{\mathcal X}$ and $\mu^{\mathcal Y}$ for coordinate representations of the same distribution, the interpolations are

$$
\mu_t^{\mathcal X}=((1-t)D\Omega^*+tDh)_\#\mu_0^{\mathcal Y},
\qquad
\mu_t^{\mathcal Y}=((1-t)D\Omega+tDf)_\#\mu_0^{\mathcal X},
$$

where $Dh$ transports $\mu_0^{\mathcal Y}$ to $\mu_1^{\mathcal X}$ and $Df$ transports $\mu_0^{\mathcal X}$ to $\mu_1^{\mathcal Y}$. Particles move along straight lines in the respective coordinates. These use different directed transport problems and generally do not coincide.

For a primal curve $\mu_t$ and dual curve $\nu_t$ starting at $\rho$, Theorem 3.6 gives, under its smoothness and transport assumptions and for $0\leq t<1$,

$$
\mathcal B(\rho,\nu_t)+\mathcal B(\mu_t,\rho)-\mathcal B(\mu_t,\nu_t)
\geq t^2\mathfrak g(\dot\mu_0,\dot\nu_0),
$$

where $\mathfrak g$ is Otto's metric for the base Hessian metric $g=D^2\Omega$. Second- and third-order expansions recover this metric and a skewness tensor, respectively (Section 4).

The right barycenter minimizes $\sum_i\lambda_i\mathcal B(\nu_i,\nu)$; the left barycenter reverses the arguments. At the point level, the right representative is $\sum_i\lambda_i x_i$, whereas the left representative is $D\Omega^*(\sum_i\lambda_iD\Omega(x_i))$. Distributional barycenters additionally optimize couplings.

Section 5.3 proposes $\rho_{k+1}=\arg\min_\rho\{\mathcal F(\rho)+\mathcal B(\rho,\rho_k)/\tau\}$ for entropy plus potential energy. The stated convergence to the Riemannian Fokker-Planck equation is proved in the companion [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]], under domain, curvature, growth, and cost-comparison assumptions.

## Experiments

| Setting | Setup | Reported observation |
| --- | --- | --- |
| Neural OT | Two-dimensional synthetic distributions; ENOT solver; 1,024 sampled points for displayed maps and interpolations; quadratic, exponential, negative-exponential, and softplus-type generators | Changing the generator changes transport paths; primal and dual interpolations differ outside the self-dual quadratic case. |
| Simplex barycenters | Eight Dirichlet marginals, 250 particles each, arranged along a primal geodesic with extra endpoint weight | The left Bregman-Wasserstein barycenter concentrates near the primal geodesic, while the Euclidean Wasserstein barycenter concentrates near the dual segment joining endpoints. |
| Gaussian-mixture model averaging | An idealized posterior uniform over four mixtures; output restricted to two Gaussian components; comparison with Bures and two Euclidean parameter-space costs | The Bregman result is bimodal with similar component variances; Bures and mean-variance Euclidean results are nearly unimodal. Natural-parameter Euclidean transport is also bimodal but asymmetric. |

Barycenters use free-support entropic OT in OTT/JAX, with penalty $10^{-2}$ and at most 50 Sinkhorn iterations (Appendix A.2). These are illustrative geometric comparisons, without a quantitative accuracy or runtime benchmark. The BW-JKO scheme is not numerically implemented here.

## Limitations

- The differential geometry uses formal Otto/Lott calculus on positive smooth densities with sufficient decay and justified integration operations. Extension to less regular distributions is left open.
- The sign of the higher-dimensional primal and dual sectional curvatures is unresolved (Remarks 4.14-4.15).
- The barycenter existence statement assumes compact support and absolute continuity; it should not be read as an unrestricted uniqueness theorem or a guarantee for the numerical optimizer.
- Synthetic demonstrations establish sensitivity to geometry, not general predictive superiority. The Gaussian-mixture loss compares mixing distributions over components, rather than simply applying KL divergence to the resulting mixture densities.
- Easy evaluation of the ground cost does not establish efficiency of full neural OT or JKO optimization. BW-JKO implementation and broader application validation are future work.

Source note: This page summarizes the supplied parsed manuscript. It identifies three authors but provides no explicit publication year, venue, or stable identifier for itself. The year is left null; corrupted example formulas are not reproduced.

## Related Concepts

- [[concepts/bregman-wasserstein-divergence|Bregman-Wasserstein Divergence]]: the central transport divergence and its dual geometry.
- [[concepts/bregman-divergences|Bregman Divergences]]: ground costs, mirror coordinates, and exponential-family connections.
- [[concepts/optimal-transport|Optimal Transport]]: couplings, Brenier maps, and numerical transport solvers.
- [[concepts/wasserstein-barycenters|Wasserstein Barycenters]]: distributional averaging generalized to asymmetric costs.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: the variational diffusion application.

## Related Papers

- [[papers/jko-schemes-with-general-transport-costs|JKO Schemes with General Transport Costs]]: companion analysis proving the convergence result stated in Section 5.3 (reference 88).
- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: supplies Bregman centroid and exponential-family foundations (reference 16).
- Carlier and Jimenez (2007), "On Monge's problem for Bregman-like cost functions": earlier quadratic-transport reduction discussed in Section 1.2 (reference 30).
- Buzun, Bobrin, and Dylov (2024), "Expectile regularization for fast and accurate training of neural optimal transport": the ENOT solver used for the neural examples (reference 28).
