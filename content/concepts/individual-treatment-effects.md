---
title: Individual Treatment Effects
type: concept
aliases:
  - ITE
  - Individual Treatment Effect
tags:
  - causal-inference
  - treatment-effect-heterogeneity
  - potential-outcomes
  - uncertainty-quantification
---

## Overview

For a unit $i$ with potential outcomes $Y_i(1)$ and $Y_i(0)$, the individual treatment effect is

$$
\tau_i=Y_i(1)-Y_i(0).
$$

Only one potential outcome is observed for each unit, so an ITE is not generally point identified from ordinary observational data. ITE inference therefore targets a distribution or prediction set under causal assumptions rather than treating the unobserved difference as a directly supervised label.

## Key Ideas

- **Distinct estimands:** An average treatment effect averages over a population, and a conditional average treatment effect averages within covariate-defined groups. An ITE retains individual outcome randomness and depends on both potential outcomes.
- **Fundamental missingness:** Treatment reveals either $Y_i(1)$ or $Y_i(0)$, never both. Consistency, conditional ignorability, and [[concepts/causal-overlap|causal overlap]] can identify marginal potential-outcome laws given covariates, but they do not reveal both realized counterfactual outcomes for one person.
- **Dependence matters:** Separate marginal distributions for $Y(1)\mid X$ and $Y(0)\mid X$ do not in general identify the distribution of their difference without assumptions about their joint dependence. Special constructions, such as fixing one baseline potential outcome in a simulation, avoid this ambiguity by design.
- **Prediction rather than point estimation:** [[concepts/conformal-prediction|Conformal prediction]] can calibrate prediction sets for counterfactual outcomes or ITEs. Its standard guarantee is marginal across future units, not [[concepts/conditional-prediction-coverage|pointwise conditional coverage]].
- **Shift and confounding:** Observational ITE procedures must distinguish treatment-group imbalance from a shift between calibration and target populations. Propensity weighting addresses the former under causal assumptions; localization or density-ratio weighting can address the latter.

## Important Papers

- Lei and Candes (2021), "Conformal Inference of Counterfactuals and Individual Treatment Effects": develops weighted conformal prediction for counterfactual outcomes under covariate shift.
- [[papers/conformal-diffusion-models-for-individual-treatment-effect-estimation-and-inference|Conformal Diffusion Models for Individual Treatment Effect Estimation and Inference]]: combines diffusion-based potential-outcome sampling with propensity and local conformal weights.

## Related Concepts

- [[concepts/conformal-prediction|Conformal Prediction]]
- [[concepts/conditional-prediction-coverage|Conditional Prediction Coverage]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/counterfactual-quantile-learning|Counterfactual Quantile Learning]]: contrasts quantiles of policy-specific marginal outcomes with quantiles of individual treatment effects.
- [[concepts/density-ratio-estimation|Density Ratio Estimation]]
