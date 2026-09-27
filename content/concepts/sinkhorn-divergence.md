---
title: Sinkhorn Divergence
type: concept
aliases:
  - Sinkhorn Divergences
tags:
  - optimal-transport
  - distribution-comparison
  - generative-models
---

## Overview

Sinkhorn divergence subtracts self-transport costs from entropically regularized optimal transport. This removes the entropic self-cost offset while retaining a discrepancy that can be approximated using Sinkhorn scaling. It can serve as a distributional comparison or as an energy for generative training.

## Key Ideas

With the quadratic-cost convention used in W-Flow,

$$
\mathrm{OT}_\varepsilon(q,p)=\inf_{\pi\in\Pi(q,p)}
\left\{\int\tfrac12\|x-y\|^2\,d\pi
+\varepsilon D_{\mathrm{KL}}(\pi\|q\otimes p)\right\},
$$

$$
S_\varepsilon(q,p)=\mathrm{OT}_\varepsilon(q,p)
-\tfrac12\mathrm{OT}_\varepsilon(q,q)
-\tfrac12\mathrm{OT}_\varepsilon(p,p).
$$

- **Coupled marginal constraints.** The transport plan matches both probability marginals. Sinkhorn iterations scale a Gibbs kernel to approximate these constraints, coordinating a batch's assignments.
- **Barycentric velocity.** If $T^\varepsilon_{q,p}(x)=\mathbb E_{\pi^\varepsilon_{q,p}}[Y\mid X=x]$, the quadratic-cost Wasserstein gradient direction is $T^\varepsilon_{q,p}(x)-T^\varepsilon_{q,q}(x)$. W-Flow uses this direction as a stopped regression target, avoiding differentiation through the iterative solver.
- **Two different biases.** Subtracting population self-costs addresses entropic regularization bias. It does not generally remove the sampling discrepancy between independent empirical measures. Statistical null calibration is a separate problem.
- **Self-matching in particle estimates.** Coupling a generated batch to itself introduces zero-cost diagonal matches. W-Flow estimates self-transport with two independent generated batches. This avoids identical-index matches without implying that every finite-batch estimate is unbiased.
- **Approximation controls.** Entropic strength, transport cost, feature representation, batch size, and solver iteration count all affect the computed field. Properties of exact population couplings do not automatically transfer to a truncated solver and finite neural training.

## Important Papers

- Feydy et al. (2019), "Interpolating between Optimal Transport and MMD using Sinkhorn Divergences": foundational reference as cited in W-Flow.
- [[papers/one-step-generative-modeling-via-wasserstein-gradient-flows|One-Step Generative Modeling via Wasserstein Gradient Flows]]: uses the divergence as a training-time energy with independent-batch self-transport and velocity guidance.
- [[papers/the-earth-moves-but-so-does-the-bias-systematic-upward-bias-of-the-wasserstein-earth-movers-distance-and-permutation-based-null-calibration|The Earth Moves, But So Does the Bias]]: distinguishes entropic debiasing from finite-sample calibration of distributional comparisons.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]: the underlying mass-coupling problem.
- [[concepts/wasserstein-gradient-flows|Wasserstein Gradient Flows]]: converts a discrepancy into distributional dynamics.
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: a kernel-based alternative for comparing distributions.
- [[concepts/permutation-based-null-calibration|Permutation-Based Null Calibration]]: addresses a statistical equality-null question distinct from entropic debiasing.
