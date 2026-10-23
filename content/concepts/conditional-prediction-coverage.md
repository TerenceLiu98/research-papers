---
title: Conditional Prediction Coverage
type: concept
aliases:
  - Conditional Coverage
tags:
  - uncertainty-quantification
  - prediction-sets
  - statistical-inference
---

## Overview

Conditional prediction coverage asks whether a prediction set contains a future outcome at its target rate for a given input: $P(Y\in\mathcal C_\alpha(x)\mid X=x)\geq1-\alpha$. Marginal coverage averages over inputs and can therefore conceal poor coverage in particular regions.

## Key Ideas

- Distinguish marginal, subgroup, and pointwise conditional coverage. Coverage within a finite collection of groups is a useful diagnostic but does not certify every individual input.
- Classical conformal prediction provides marginal coverage under exchangeability. A conditional-distribution approach instead relies on assumptions about how accurately the local outcome or score law can be estimated.
- [[Generative Score Inference]] models prediction discrepancies conditional on covariates. Its stated bound separates generator error in total variation from Monte Carlo error in the synthetic empirical distribution.
- Validation can adjust nominal levels to improve observed coverage, but finite validation data cannot establish exact coverage for every input.
- Interval length measures efficiency only in conjunction with coverage. A shorter interval that misses the target more often need not be preferable.
- Weighted conformal methods can recover marginal validity under covariate shift when their change-of-measure weights are accurate. [[papers/conformal-diffusion-models-for-individual-treatment-effect-estimation-and-inference|Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference]] bounds its marginal coverage deficit by the $L_1$ error of combined propensity and localization weights, but does not convert that result into fixed-$x$ coverage.

## Important Papers

- [[Generative Score Inference for Multimodal Data]]: distinguishes model-dependent conditional guarantees from measured coverage across ten k-means subgroups in tabular experiments.
- Alaa, Hussain, and Sontag (2023), "Conformalized unconditional quantile regression": a conditional-coverage comparator discussed in the GSI paper.
- Shafer and Vovk (2008), "A tutorial on conformal prediction": the marginal-coverage reference used in the GSI paper.
- [[papers/conformal-diffusion-models-for-individual-treatment-effect-estimation-and-inference|Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference]]: separates a proved marginal guarantee under estimated shift weights from empirical conditional-coverage evaluation.

## Related Concepts

- [[Generative Score Inference]]
- [[concepts/conformal-prediction|Conformal Prediction]]
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]
