---
title: Conformal Prediction
type: concept
aliases:
  - Conformal Inference
tags:
  - uncertainty-quantification
  - prediction-sets
  - statistical-inference
---

## Overview

Conformal prediction wraps a predictive model with a calibration procedure that returns sets of plausible outputs rather than a single prediction. Under exchangeability between calibration and future examples, the resulting sets provide a finite-sample marginal coverage guarantee without requiring a correct parametric model of the data distribution.

## Key Ideas

- A nonconformity score measures how unusual a candidate output is relative to a model's prediction. Calibration scores determine a quantile threshold, and candidates below that threshold enter the prediction set.
- For target error rate $\alpha$, the standard guarantee is $P\{Y_{\mathrm{test}}\in\mathcal C(X_{\mathrm{test}})\}\geq1-\alpha$ under exchangeability. This probability averages over test examples and the calibration sample.
- Set size or interval width measures efficiency: smaller valid sets are more informative. Efficiency should be interpreted together with achieved coverage.
- Exchangeability is weaker than independence and identical distribution, but distribution shift can still break the usual guarantee. Calibration data therefore need to represent the deployment population.
- Marginal validity does not imply [[Conditional Prediction Coverage]] for each input or subgroup. Coverage diagnostics can reveal heterogeneity without creating a pointwise guarantee.
- Conformal prediction is model-agnostic: it can calibrate scores from a fixed black-box model, but its usefulness still depends on the score function and calibration data.

## Important Papers

- Sadinle, Lei, and Wasserman (2019), "Least Ambiguous Set-Valued Classifiers with Bounded Error Levels": develops efficient set-valued classification with controlled error.
- Angelopoulos and Bates (2021), "A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification": practical introduction to conformal methods and their assumptions.
- [[Conformal Prediction with Large Language Models for Multi-Choice Question Answering]]: applies calibrated answer sets to LLaMA-13B on MMLU and demonstrates cross-subject undercoverage under distribution shift.
- [[Generative Score Inference for Multimodal Data]]: contrasts classical marginal conformal coverage with a model-dependent approach targeting conditional score distributions.
- [[papers/conformal-diffusion-models-for-individual-treatment-effect-estimation-and-inference|Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference]]: calibrates diffusion-generated potential outcomes with propensity and local weights for ITE inference under covariate shift.

## Related Concepts

- [[Conditional Prediction Coverage]]
- [[Generative Score Inference]]
- [[concepts/individual-treatment-effects|Individual Treatment Effects]]
