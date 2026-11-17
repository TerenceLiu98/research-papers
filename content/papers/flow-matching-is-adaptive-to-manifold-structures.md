---
title: Flow Matching is Adaptive to Manifold Structures
type: paper
authors:
  - Shivam Kumar
  - Yixin Wang
  - Lizhen Lin
year: null
tags:
  - flow-matching
  - statistical-learning-theory
  - manifold-adaptation
---

## TL;DR

The paper derives finite-sample guarantees for linear-path flow matching with a target supported on an unknown smooth manifold. Under geometric, density-smoothness, and one-sided velocity-regularity assumptions, the reported Wasserstein convergence exponents depend on intrinsic dimension. The density-estimation term matches the benchmark rate up to logarithms, while the support-estimation term retains a gap.

## Research Question

Can ambient-space flow matching estimate a singular, manifold-supported distribution at rates governed by its intrinsic dimension rather than its embedding dimension?

## Motivation

Full-dimensional density assumptions exclude exactly manifold-supported targets. Gaussian-to-data interpolation remains full-dimensional before its endpoint, but the terminal target is singular. The appropriate statistical object is therefore the distribution induced by the learned ODE, with early stopping to control the near-terminal regime.

## Contributions

- Non-asymptotic velocity-estimation bounds across time regimes, using ReLU approximation and empirical-process control.
- A reported expected Wasserstein-2 bound for the early-stopped pushforward distribution.
- A separation of support smoothness, density smoothness, and intrinsic dimension in the statistical rate.
- Synthetic sphere and torus experiments, with supplementary MNIST and sample-size studies.

## Method

Independent Gaussian noise $X_0$ and data $X_1$ define $X_t=(1-t)X_0+tX_1$. Squared-error regression against $X_1-X_0$ targets

$$
v^*(x,t)=\mathbb E[X_1-X_0\mid X_t=x]
=\frac{\mathbb E[X_1\mid X_t=x]-x}{1-t}.
$$

The theoretical estimator uses a fixed time partition refined near the endpoint and time-dependent network capacities. Sampling integrates the learned field to $1-\underline t$, where $\underline t=n^{-\beta/(2\alpha+d)}\log^{\beta+1}n$.

Assumptions 1–3 require a compact boundaryless $d$-manifold with positive reach and smoothness $\beta\ge2$, a positive density of Hölder smoothness $\alpha\in[0,\beta-1]$, and a one-sided Jacobian bound $\mu_2(\partial_xv^*)\le L_*/(1-t)^{1-\xi}$. Theorems 1–2 assume $d\ge3$; Theorem 2 further constrains $\xi$ relative to $1/\log\log n$.

Theorem 2 reports

$$
\mathbb E W_2(\widehat\pi_{1-\underline t},\pi_1)
\lesssim n^{-\beta/(2\alpha+d)}\log^{\max(\beta,2)}n
+n^{-(\alpha+1)/(2\alpha+d)}\log^{d+9}n
+n^{-1/2}\log^4n.
$$

Constants can depend on ambient dimension $D$. The proof combines local approximation, estimation bounds, ODE stability, and early-stopping error. The cited lower bound has support term $n^{-\beta/d}$ instead of $n^{-\beta/(2\alpha+d)}$. Thus the support component is slower, even though the density term matches the benchmark and dominates in the stated smoothness regime.

## Experiments

Sphere and rotated-torus targets use $d\in\{2,3,4,5\}$ and $D\in\{2d,3d,4d\}$. Width-256 MLPs train for 1,000 iterations; sampling uses 250 Euler steps. Tables 2–3 report five-run means and standard deviations for standardized sliced Wasserstein-1 and distance to the manifold.

| Target, dimensions | Standardized sliced W1 | Manifold distance |
| --- | --- | --- |
| Sphere, d=2, D=4 | 0.04177 ± 0.01935 | 0.05304 ± 0.00460 |
| Sphere, d=2, D=8 | 0.04194 ± 0.01330 | 0.05861 ± 0.00589 |
| Torus, d=5, D=10 | 0.03017 ± 0.01236 | 0.13094 ± 0.00347 |
| Torus, d=5, D=20 | 0.04205 ± 0.01155 | 0.23003 ± 0.00515 |

Distributional discrepancies remain comparable in scale, while geometric residuals can increase with ambient dimension. These metrics measure different aspects of generation.

Appendix A trains separate MNIST models per digit in 784 dimensions. For digit 3, increasing training size from 100 to 5,000 reduces sliced W1 from 0.0416 to 0.0254; the fitted exponent is 0.152, with 95% interval [0.069, 0.234]. Inferring dimension 11.2 from this exponent assumes density smoothness $\alpha=1$ and the proposed rate model. It is not an independent dimension measurement. Sphere ablations approach finite-sample baselines, with pooled fitted exponents 0.14, 0.19, and 0.17 for intrinsic dimensions 2, 3, and 4.

## Limitations

The rate is conditional on the explicit one-sided regularity assumption and describes the theoretical estimator, not arbitrary trained networks or numerical solvers. Sliced W1 experiments do not directly measure the theorem's W2 loss. Table 6 has fluctuations despite the surrounding claim of monotonic decrease; fitted exponents do not establish the precise asymptotic rate. The noisy floral illustration and experiments with d=2 extend beyond the stated theorem's exact-support and dimension conditions. Near-manifold noise, stratified supports, and conditional distribution estimation remain future directions.

The supplied Markdown does not establish a publication year or stable identifier; these remain unspecified.

## Related Concepts

- [[concepts/flow-matching|Flow Matching]]: conditional velocity regression with a Gaussian source and linear interpolation, analyzed here as a distribution estimator.

## Related Papers

- [[papers/manifold-stable-flow-matching|Manifold-Stable Flow Matching]]: a complementary approach that prescribes normal contraction for geometric adherence; this paper instead studies statistical adaptation of ordinary linear-path flow matching.
- Tang and Yang, *Adaptivity of Diffusion Models to Manifold Structures* (2024): cited predecessor on intrinsic-geometry adaptation in diffusion.
- Fukumizu et al., *Flow Matching Achieves Almost Minimax Optimal Convergence* (2024): cited statistical analysis for full-dimensional targets.
