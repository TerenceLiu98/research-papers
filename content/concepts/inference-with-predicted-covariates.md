---
title: Inference with Predicted Covariates
type: concept
aliases:
  - Regression with Machine-Learned Covariates
definition: "Statistical inference for regression parameters when some covariates are replaced or supplemented by machine-learning predictions, requiring explicit treatment of prediction error and the labeled-data sampling design."
tags:
  - measurement-error
  - statistical-inference
  - machine-learning
---

## Overview

Predicted covariates are imperfect measurements of the regressors defining a target regression. Good predictive performance does not ensure that substitution preserves regression coefficients: errors may correlate with predictions, observed covariates, or the target regression residual. Larger unlabeled datasets can make a biased estimate more precise without making it valid.

## Key Ideas

- **Preserve the estimand.** Define the regression using true covariates before considering predicted substitutes. Prediction-error bias need not point toward zero.
- **Keep an honest calibration sample.** Training predictions generally overstate out-of-sample agreement with truth. A separate validation sample estimates the relationship relevant to unlabeled observations.
- **Use labels as a baseline.** Representative labeled-only regression can remain consistent without assumptions about classifier errors.
- **Predictions can provide instruments.** Under exclusion from the target residual and adequate relevance, validation-based linear calibration supports a 2SLS component. Combining its moments with labeled OLS through GMM can improve efficiency while propagating calibration uncertainty.
- **Testability is limited.** A validation-based exclusion test can detect some failures; nonrejection is not proof. Training/validation allocation trades predictive quality against calibration precision and diagnostic power.
- **Label selection matters.** Random labeling supports transport to the full sample. Active learning and oversampling change that design and require separate justification or correction.

## Important Papers

- [[papers/machine-learning-predictions-as-regression-covariates|Machine Learning Predictions as Regression Covariates]] — develops the training/validation/primary split and OLS-plus-2SLS GMM correction for missing covariates.

## Related Concepts

- [[concepts/debiased-inference-with-multiple-imperfect-measurements|Debiased Inference with Multiple Imperfect Measurements]] — uses multiple imperfect proxies and a different identification strategy when verified labels are unavailable.
- [[concepts/weak-instruments-and-iv-inference|Weak Instruments and IV Inference]] — explains why predictive relevance and instrument validity are separate requirements.
