---
title: Distributional Extrapolation
type: concept
aliases:
  - Distributional Extrapolability
tags:
  - distributional-regression
  - extrapolation
  - uncertainty-quantification
---

## Overview

Distributional extrapolation asks whether conditional outcome distributions outside the observed covariate support are determined by the distributions observed inside it. It differs from ordinary function extrapolation because distributional changes within the support can encode information about a latent response function beyond the support.

## Key Ideas

- **Extrapolation uncertainty is disagreement under observational equivalence.** For a model class, compare models that induce the same conditional distributions throughout the training support and measure how far their predictions can disagree at nearby unsupported inputs.
- **Functional and distributional identification differ.** A nonlinear function may not be determined by its in-support values, while a structured conditional-distribution model may still identify its continuation.
- **Structure creates the guarantee.** In [[concepts/pre-additive-noise-models|Pre-Additive Noise Models]], noise can move the input of a nonlinear function beyond the observed covariate boundary. Under monotonicity and support assumptions, the resulting in-support outcome distributions reveal part or all of that continuation.
- **Noise range controls local reach.** With bounded pre-additive noise, identification generally extends only beyond the training boundary by a distance tied to the noise support. Unbounded noise supports can yield global results under stronger population assumptions.
- **Point prediction can discard useful information.** Optimizing only a conditional mean or one quantile need not recover the noise distribution that carries the extrapolation signal.
- **Identification is not deployment validity.** A theoretical result for a specified model class does not establish that the class fits a particular dataset or that covariate shifts preserve the conditional law.

## Important Papers

- [[papers/engression-extrapolation-through-the-lens-of-distributional-regression|Engression: Extrapolation through the Lens of Distributional Regression]]: defines distributional extrapolation uncertainty and derives global, local, and finite-sample results for engression with pre-additive noise.
- Christiansen et al. (2021): studies extrapolation under assumptions that constrain function behavior beyond the observed support, as discussed by the engression paper.
- Dong and Ma (2023): analyzes extrapolation for additive nonlinear functions under changes in covariate marginals, as distinguished in the engression paper.

## Related Concepts

- [[concepts/pre-additive-noise-models|Pre-Additive Noise Models]]: a structural class in which conditional distributions can expose response-function values beyond observed covariates.
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]: concerns coverage at a given input rather than identification outside the training support.
