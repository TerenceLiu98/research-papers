---
title: Bayesian Sensitivity Analysis
type: concept
aliases:
  - BSA
definition: "Bayesian sensitivity analysis assigns probability distributions to parameters governing departures from identifying assumptions and propagates their uncertainty into posterior inference about a target quantity."
tags:
  - bayesian-inference
  - causal-inference
  - sensitivity-analysis
---

## Overview

Bayesian sensitivity analysis represents uncertainty about identifying assumptions with priors on sensitivity parameters. For unmeasured confounding, a model for a hypothetical latent confounder and its outcome relationship permits posterior inference about causal effects conditional on those modeling choices.

## Key Ideas

- **Benchmarking requires comparable scales.** Standardizing latent and observed confounders and assigning exchangeable outcome-coefficient priors makes observed predictors informative reference points for latent confounding.
- **Nonidentification persists.** The observed likelihood may identify combinations of parameters without identifying each causal or confounding parameter separately. Posterior precision therefore depends on prior restrictions.
- **Indirect learning is possible.** Prior dependence between likelihood-informed combinations and sensitivity parameters permits posterior updating without making the latter directly identified.
- **Transparent parameterization helps computation.** Separating likelihood-informed and nonidentified parameter blocks can improve sampling; it does not create new identifying information.
- **Scenario uncertainty survives large samples.** Sampling uncertainty may diminish while uncertainty about unobserved confounding remains. Wider intervals can reflect this persistent uncertainty.

## Important Papers

- [[papers/bayesian-sensitivity-analysis-for-unmeasured-confounding-in-causal-panel-data-models|Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models]] (Liu and Yamamoto, 2025): combines covariate benchmarking, shrinkage, and transparent parameterization for counterfactual panel models.
- McCandless, Gustafson, and Levy (2007), “Bayesian Sensitivity Analysis for Unmeasured Confounding in Observational Studies”: parametric latent-confounder framework extended by the panel-data paper.

## Related Concepts

- [[concepts/honest-event-study-inference|Honest Event Study Inference]]: assesses robustness using explicit bias bands and simultaneous inference; Bayesian sensitivity analysis instead integrates over specified probability distributions for departures from assumptions.
