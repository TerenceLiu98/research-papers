---
title: Zador Theorem for optimal quantization with respect to Bregman divergences
type: paper
authors:
  - Guillaume Boutoille
  - Gilles Pagès
year: 2026
source_job_id: 6aa5a125-68bb-4fbb-a421-1301ef8c5e29
tags:
  - quantization
  - bregman-divergences
  - asymptotic-analysis
---

## TL;DR

Boutoille and Pagès extend [[concepts/zadors-theorem|Zador's Theorem]] to finite-dimensional optimal quantization under [[concepts/bregman-divergences|Bregman Divergences]]. Under smoothness, positive-definite Hessian, support, and integrability conditions, the optimal mean error has an $n^{-1/d}$ asymptotic scale whose constant combines the data density with the determinant of the potential's Hessian. A Bregman-specific firewall lemma supplies the crucial localization step for the lower bound. The paper also states a related result for continuous positive-definite matrix fields.

[[index|Library home]]

## Research Question

How does the sharp large-codebook asymptotic quantization error change when a power of a norm is replaced by a Bregman divergence, and which assumptions permit matching upper and lower bounds?

## Motivation

Bregman clustering accommodates losses such as generalized KL, Itakura-Saito, and Mahalanobis divergence. Classical quantization asymptotics do not transfer directly because a general Bregman divergence is asymmetric, lacks a triangle inequality, and varies with location. A local quadratic approximation suggests a Hessian-dependent constant, but a global argument must also control cross-cell assignments, singular probability components, and unbounded tails.

## Contributions

- Gives a sharp asymptotic formula for the optimal Bregman mean quantization error for $r>0$, with a determinant-weighted density replacing the density in classical Zador theory (Theorem 4.1).
- Establishes the corresponding universal asymptotic lower bound without the upper-bound moment and global Hessian-boundedness assumptions.
- Develops a finite-boundary-point firewall construction to localize Bregman nearest-neighbor comparisons (Proposition 5.2 and appendix).
- Handles distributions with singular components and extends the compact-support proof to noncompact support using a Pierce-type tail bound.
- Obtains an upper bound for convex potentials with possibly degenerate Hessians by adding a small quadratic regularizer (Corollary 5.1), and states a matrix-field counterpart (Theorem 6.1).

## Method

### Objective and Main Theorem

Let $U\subset\mathbb R^d$ be nonempty, open, and convex, with $P(U)=1$. For a $C^2$ potential $F$ with positive-definite Hessian everywhere on $U$, define

$$
\phi_F(x,a)=F(x)-F(a)-\langle\nabla F(a),x-a\rangle,
\qquad
e_{r,n}(P,\phi_F)=\inf_{\substack{\Gamma\subset U\\1\leq |\Gamma|\leq n}}
\left(\int_U\min_{a\in\Gamma}\phi_F(x,a)^{r/2}\,P(dx)\right)^{1/r}.
$$

The exponent is $r/2$ on the divergence. For $r=2$, the squared mean error is the expected Bregman distortion. Let $h=dP^a/dx$ denote the density of the absolutely continuous component, $p=d/(d+r)$, and $Q_{r,d}$ the classical Euclidean unit-cube constant for the $r$th power of the mean error. Theorem 4.1 gives

$$
\lim_{n\to\infty}n^{r/d}e_{r,n}(P,\phi_F)^r
=2^{-r/2}Q_{r,d}
\left\|\det(\nabla^2F)^{r/(2d)}h\right\|_{L^p}.
$$

Here $\|g\|_{L^p}=(\int_U|g(x)|^p\,dx)^{1/p}$, a quasi-norm since $p<1$. The integrability condition is

$$
\int_U\left(|x|^{2(1+\delta)}\vee |F(x)|\right)^{r/2}P(dx)<\infty
\quad\text{for some }\delta>0.
$$

The equality applies when either the support is compact and contained in $U$, or the support in $U$ lies in an interior region $U_\eta=\{x\in U:d(x,U^c)>\eta\}$ on which the Hessian is bounded; the convention is $U_0=U$. Restricting the potential to a suitable smaller open convex domain containing the distribution can make this boundedness condition easier to satisfy. For compact support inside $U$, continuity makes the displayed integrability condition automatic.

Without these additional upper-bound conditions, the theorem still gives the same right-hand side as a lower bound on $\liminf n^{r/d}e_{r,n}^r$, possibly infinite. Only $P^a$ enters this constant. Under the full theorem's assumptions, a purely singular distribution has zero normalized limit, so $n^{-1/d}$ does not specify its nonzero leading asymptotic rate.

### Proof Strategy

1. Solve the constant-matrix Mahalanobis case by a linear change of coordinates, obtaining the factor $\det(S)^{1/(2d)}$ for the mean error.
2. Partition compact support into small cubes, approximate the density by cell averages, and bound the Hessian locally above and below. Taylor's integral remainder introduces the factor $1/2$ in the quadratic approximation.
3. Allocate codewords across cells using a reverse Hölder inequality for the upper bound. For the lower bound, add finitely many boundary representatives so that points in shrunken cells can be compared locally; the firewall overhead is negligible as codebook size grows with the partition fixed.
4. Pass from piecewise-constant densities to the original density using differentiation of measures and $L^1$ convergence. Separate the singular component, then exhaust the domain by compact sets. A Euclidean comparison and Pierce's lemma control the remaining tails.

The proof works with infima and approximating codebooks; it does not require an existence theorem for exact optimal quantizers. The existence and stationarity results reviewed in Section 3 concern separate assumptions.

### Matrix-Field Extension

Section 6 replaces the divergence by a center-dependent quadratic cost $(x-a)^TS(a)(x-a)$ for a continuous positive-definite matrix field. Theorem 6.1 reports the analogous determinant-weighted constant, without the Bregman factor $2^{-r/2}$, under compact-support or bounded-field conditions and a finite $(r+\delta)$ moment. The proof is not detailed; the authors refer to the preceding argument. This extension is recorded as a reported result rather than an independently checked guarantee.

## Experiments

There are no numerical experiments, datasets, measured clustering improvements, or runtime comparisons. Evidence consists of theorem proofs and analytical examples. The applicability discussion covers quadratic and Mahalanobis losses, power potentials, Itakura-Saito, generalized KL, logistic, softplus, and exponential potentials. In particular, the stated conditions cover generalized KL and Itakura-Saito examples when support stays away from zero, and logistic loss when support is compactly contained in $(0,1)$.

## Limitations

- The sharp Bregman equality assumes positive-definite Hessians. The convex, potentially degenerate case is treated through a separate upper bound with bounded Hessian and the moment condition used in its proof.
- Boundary-singular potentials remain unresolved when the distribution's support reaches a problematic boundary point. The authors explicitly identify $F(x)=-\log x$ and $F(x)=x\log x$ with zero in the support. Finiteness of the determinant-weighted expression is necessary for a finite normalized limit, but the paper does not establish sufficiency in these cases.
- The theorem describes optimal population distortion as codebook size grows. It gives neither a finite-codebook convergence threshold nor guarantees that an iterative clustering algorithm attains the optimum.
- Extending minimal-moment improvements for radial distributions from norm-based quantization to the Bregman setting is left open.
- The supplied Markdown has damaged and inconsistent formulas. The main expression above follows Definition 3.1, Theorem 4.1, and Equation (5.43); the factor $2^{-r/2}$ is retained. The manuscript is dated 6 April 2026, but no identifier or publication venue for this paper is supplied.

## Related Concepts

- [[concepts/zadors-theorem|Zador's Theorem]]: sharp asymptotic quantization constants and their assumptions.
- [[concepts/bregman-divergences|Bregman Divergences]]: convex-potential losses and local Hessian geometry.
- [[concepts/representative-points|Representative Points]]: finite codebooks approximating probability distributions.

## Related Papers

- [[papers/clustering-with-bregman-divergences|Clustering with Bregman Divergences]]: Banerjee et al. (2005), reference 1, supplies the clustering and exponential-family background.
- [[papers/quantization-and-clustering-with-bregman-divergences|Quantization and Clustering with Bregman Divergences]]: Fischer (2010), reference 5, studies existence and statistical quantization properties; the present paper focuses on increasing-codebook asymptotics.
- Boutoille and Pagès (2025), "Optimal Bregman quantization: existence and uniqueness of optimal quantizers revisited," arXiv:2506.01746 (reference 2): source of the existence results reviewed in Section 3.
- Graf and Luschgy (2000), *Foundations of Quantization for Probability Distributions* (reference 6): supplies the classical proof strategy.
- "Clustering with Bregman divergences: an asymptotic analysis" (2016, reference 8): prior asymptotic treatment against which the authors compare their continuity, boundedness, and singular-component assumptions.
