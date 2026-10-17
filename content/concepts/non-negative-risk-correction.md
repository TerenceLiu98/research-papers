---
title: Non-Negative Risk Correction
type: concept
aliases:
  - Non-Negative Bregman Divergence Correction
tags:
  - risk-estimation
  - density-ratio-estimation
  - positive-unlabeled-learning
---

## Overview

Non-negative risk correction replaces an empirical risk component with its positive part when that component is known to be nonnegative in the population. The aim is to prevent flexible models from exploiting negative finite-sample estimates of an intrinsically nonnegative quantity.

## Key Ideas

- **Correct the justified component:** If $J(r)=A(r)+B(r)$ with $A(r)\geq0$, the corrected estimator is $\max\{0,\hat A(r)\}+\hat B(r)$. This does not require the entire empirical objective to be nonnegative.
- **Density-ratio construction:** If $r^*=p_{\mathrm{nu}}/p_{\mathrm{de}}\leq\bar R$ and $0<C<1/\bar R$, then $(\mathbb E_{\mathrm{de}}-C\mathbb E_{\mathrm{nu}})\ell_1(r)\geq0$ whenever $\ell_1\geq0$. Rewriting a Bregman objective around this component yields the D3RE correction.
- **Bias and consistency:** Clipping introduces bias. Kato and Teshima bound its contribution using bounded losses and a strictly positive population margin; their bound decays exponentially with sample sizes. Such guarantees depend on the assumptions, not clipping alone.
- **Output caps differ:** Capping a ratio prediction can still let a model assign the cap to numerator samples and small values to denominator samples. Risk correction acts on the coupled sample-average objective.
- **Optimization differs from estimation:** Ascent on a negative component is an optional practical heuristic. Statistical guarantees for a corrected-risk minimizer do not establish convergence of that heuristic.

## Important Papers

- Kiryo et al. (2017), "Positive-unlabeled learning with non-negative risk estimator": introduces the PU-learning correction that motivates the density-ratio extension.
- [[papers/non-negative-bregman-divergence-minimization-for-deep-direct-density-ratio-estimation|Non-Negative Bregman Divergence Minimization for Deep Direct Density Ratio Estimation]]: derives a population-nonnegative decomposition for multiple ratio-fitting losses.

## Related Concepts

- [[concepts/density-ratio-estimation|Density Ratio Estimation]]: provides the ratio bound and two-distribution estimation problem.
- [[concepts/bregman-divergences|Bregman Divergences]]: supplies the objective family used by D3RE.
