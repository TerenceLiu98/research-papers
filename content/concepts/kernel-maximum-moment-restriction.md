---
title: Kernel Maximum Moment Restriction
type: concept
aliases:
  - KMMR
  - MMR-IV
tags:
  - instrumental-variables
  - conditional-moments
  - kernel-methods
  - causal-inference
---

## Overview

Kernel maximum moment restriction measures the largest residual moment over a unit ball in a reproducing kernel Hilbert space. For instrumental-variable regression, it converts the conditional moment $\mathbb E[Y-f(X)\mid Z]=0$ into a scalar population risk with a closed-form kernel expression. MMR-IV estimates the structural function by minimizing an empirical version of that risk (Zhang, 2022, Chapter 6).

## Key Ideas

With residual $r_f=Y-f(X)$, the risk is

$$
R_k(f)=\sup_{\|h\|_{\mathcal H_k}\leq1}
\left(\mathbb E[r_fh(Z)]\right)^2
=\left\|\mathbb E[r_fk(Z,\cdot)]\right\|_{\mathcal H_k}^2
=\mathbb E[r_fr_f'k(Z,Z')],
$$

where the primed quantities come from an independent observation.

- **Moment equivalence versus identification:** With a suitable integrally strictly positive definite kernel and integrability, zero risk is equivalent to the conditional moment restriction. Identifying a unique structural function requires an additional condition, such as completeness. Kernel flexibility cannot make an invalid instrument valid.
- **Single objective:** The RKHS supremum has an analytic solution, so fitting does not require a learned adversary or a first-stage conditional-density model. Both neural networks and RKHS functions can parameterize $f$.
- **U- and V-statistics:** The U-statistic omits diagonal pairs and is unbiased for the population risk at a fixed $f$, but its weight matrix can be indefinite. The V-statistic includes diagonal pairs and uses the positive-semidefinite matrix $K_z/n^2$; the thesis evaluates this version with regularization.
- **Separate kernel roles:** The instrument kernel $k$ weights residual moments. In the RKHS implementation, a second kernel $l$ describes functions of the treatment. Their choice affects finite-sample performance even when the population moment characterization holds.
- **Computation and inference:** A GP interpretation yields an analytical cross-validation criterion. Nystrom approximation reduces matrix-inversion cost but the stated complexity still includes an $n^2$ term. Consistency and asymptotic normality require the chapter's regularity assumptions; its function-space normality theorem concerns a regularized population target.
- **Empirical boundary:** The thesis's kernel implementation works well in several low-dimensional simulations but struggles with image-valued treatments after PCA. Its neural-network version handles those structured scenarios better. Linear IV estimators remain competitive when their linear specification is correct.

## Important Papers

- Muandet, Jitkrittum, and Kubler (2020), "Kernel conditional moment test via maximum moment restriction," cited in the thesis as the preceding testing framework.
- Zhang, Imaizumi, Scholkopf, and Muandet, "Maximum moment restriction for instrumental variable regression," listed in the thesis as a 2021 preprint, arXiv:2010.07684.
- [[papers/approximate-inference-for-non-parametric-bayesian-hawkes-processes-and-beyond|Approximate Inference for Non-parametric Bayesian Hawkes Processes and Beyond]]: Chapter 6 and Appendix D develop the estimation framework and its evaluation.

## Related Concepts

- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]: Both use RKHS norms and unit-ball suprema. MMD compares distribution embeddings; MMR embeds residual-weighted instrument moments.
- [[concepts/fixed-effects-instrumental-variables|Fixed-Effects Instrumental Variables]]: A distinct panel-data IV approach sharing the need to justify relevance and exclusion; MMR-IV does not automatically supply panel controls or a valid instrument.
- [[concepts/non-parametric-bayesian-hawkes-processes|Non-parametric Bayesian Hawkes Processes]]: The thesis discusses point-process moment restrictions as a possible application, while its MMR experiments concern IV regression.
