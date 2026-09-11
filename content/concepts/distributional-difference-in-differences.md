---
title: Distributional Difference-in-Differences
type: concept
aliases:
  - Distributional DiD
tags:
  - causal-inference
  - difference-in-differences
  - distributional-treatment-effects
---

## Overview

Distributional difference-in-differences studies how treatment changes an entire outcome law relative to an untreated counterfactual inferred from a comparison group's evolution. It can reveal changes in spread, shape, or tails that an average contrast does not summarize. Identification requires a restriction on untreated distributional evolution; mean parallel trends alone does not specify a whole counterfactual law.

## Key Ideas

- In a univariate transport formulation, control pre- and post-period laws $\mu_0,\mu_1$ identify the monotone map $d=F_{\mu_1}^{-1}\circ F_{\mu_0}$. Assuming that this map also governs untreated evolution in the treated group gives $\widetilde\mu_1=d_{\#}\mu_0^*$.
- The monotone map connects this formulation to Changes-in-Changes. Its transfer across groups is an identifying assumption, not a consequence of fitting the control distributions.
- A global test compares the observed treated post-period law with $\widetilde\mu_1$. [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]] supplies one such comparison, with calibration adjusted for estimation of $d$.
- Equality of marginal laws is distinct from equality of individual potential outcomes. An omnibus rejection can arise from a location shift as well as a shape change, and does not by itself establish individual treatment-effect heterogeneity.
- Smoothness, density support, paired observations, and the sampling design matter for inference. A two-period scalar construction does not automatically extend to staggered adoption or multivariate outcomes.

## Important Papers

- [[papers/a-test-for-treatment-heterogeneity-under-a-distributional-difference-in-difference-framework|A Test for Treatment Heterogeneity under a Distributional Difference-in-Difference Framework]]: Develops an MMD test with transport-estimation uncertainty and spectral calibration.
- Athey and Imbens (2006), "Identification and inference in nonlinear difference-in-differences models," as discussed in the ingested paper.
- Torous, Gunsilius, and Rigollet (2024), "An optimal transport approach to estimating causal effects via nonlinear difference-in-differences," as discussed in the ingested paper.

## Related Concepts

- [[concepts/optimal-transport|Optimal Transport]]
- [[concepts/maximum-mean-discrepancy|Maximum Mean Discrepancy]]
