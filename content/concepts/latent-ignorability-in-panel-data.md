---
title: Latent Ignorability in Panel Data
type: concept
aliases:
  - Panel Latent Ignorability
definition: Treatment assignment is independent of untreated potential outcome trajectories conditional on observed exogenous covariates and latent unit-specific trajectories.
tags:
  - causal-inference
  - panel-data
  - identification
---

## Overview

Latent ignorability in panel data assumes that conditioning on observed covariates and suitable latent trajectories removes dependence between treatment assignment and untreated potential outcomes. It allows selection to depend on unobserved features that also shape outcomes, provided those features are captured by the conditioning variables.

## Key Ideas

For adoption time $a_i$, covariates $X_i$, untreated outcome trajectory $Y_i(0)$, and latent trajectory $U_i$, the restriction is

$$
p(a_i\mid X_i,Y_i(0),U_i)=p(a_i\mid X_i,U_i).
$$

- **Recoverability is separate:** The assumption alone does not reveal the latent variables. Factor-based methods additionally require a low-rank representation, such as $U_{it}=\gamma_i'f_t$, estimable from untreated outcomes.
- **Relation to strict exogeneity:** Conditioning on latent trajectories can accommodate common shocks with heterogeneous unit impacts. Residual feedback from outcomes to treatment remains excluded; this is distinct from sequential ignorability.
- **Prediction and identification:** An accurate pretreatment fit is useful diagnostic evidence, but cannot establish that all post-treatment confounding is captured. No anticipation, no spillovers, and suitable support remain separate requirements.
- **Residual confounding:** Unit-specific trends outside the shared factor structure motivate sensitivity analysis rather than automatic causal interpretation of imputed outcomes.

## Important Papers

- [[papers/a-bayesian-alternative-to-synthetic-control-for-comparative-case-studies|A Bayesian Alternative to Synthetic Control for Comparative Case Studies]]: uses latent ignorability and low-rank extraction to justify Bayesian counterfactual imputation.
- [[papers/bayesian-sensitivity-analysis-for-unmeasured-confounding-in-causal-panel-data-models|Bayesian Sensitivity Analysis for Unmeasured Confounding in Causal Panel Data Models]]: examines confounding remaining beyond covariates and latent common factors.

## Related Concepts

- [[concepts/individual-treatment-effects|Individual Treatment Effects]]: an inferential target obtainable from conditional counterfactual distributions under additional modeling assumptions.
