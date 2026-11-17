---
title: Generalizing Trimming Bounds for Endogenously Missing Outcome Data Using Random Forests
type: paper
authors:
  - Cyrus Samii
  - Ye Wang
  - Junlong Aaron Zhou
year: 2025
tags:
  - causal-inference
  - partial-identification
  - missing-data
---

## TL;DR

Generalized random forests tighten Lee bounds on treatment effects among always-responders using many pre-treatment covariates. The method permits selection to move in opposite directions across covariate strata, while requiring a common direction within each stratum. In a cross-partisan conversation experiment, estimated bounds on warmth toward outpartisan voters are [0.272, 0.355], with both endpoints significantly above zero.

## Research Question

Can flexible covariate adjustment deliver informative treatment-effect bounds when treatment affects whether outcomes are observed and missingness depends on unobserved outcome determinants?

## Motivation

Conditioning on observed outcomes can introduce collider bias even after randomized assignment. Imputation or response weighting cannot generally repair selection driven by unobserved factors. Basic trimming bounds avoid those assumptions but may be too wide to support substantive conclusions.

## Contributions

- Extends covariate-tightened trimming bounds to continuous and numerous covariates using generalized random forests.
- Allows conditional monotonicity, with treatment increasing response in some covariate regions and decreasing it in others.
- Combines orthogonal moments and cross-fitting for consistent, asymptotically normal bound estimation under regularity conditions.
- Demonstrates conditional and aggregate bounds in simulations and an experimental reanalysis.

## Method

The target is the always-responder effect,

$$
\tau_{AR}=E[Y(1)-Y(0)\mid S(1)=S(0)=1].
$$

Identification requires treatment ignorability conditional on covariates, propensity overlap, and monotonic selection within covariate strata. Under increasing selection, let $s_d(x)=P(S=1\mid D=d,X=x)$ and $q(x)=s_0(x)/s_1(x)$. Control responders are always-responders; the treated responders contain an always-responder fraction $q(x)$. Retaining the bottom or top $q(x)$ fraction of the treated outcome distribution bounds their treated mean. Subtract the control responder mean, then aggregate using weights proportional to $s_0(x)$, the conditional always-responder share.

When selection decreases, trim the control distribution instead and reverse the corresponding subtraction bounds. Classification uses the estimated response-rate ratio to determine selection direction. Conditional monotonicity excludes simultaneous treatment-only and control-only responders at the same covariate value.

Probability forests estimate response probabilities and quantile forests estimate trimming thresholds. Across sample folds, nuisance estimates are fitted outside the target fold and orthogonalized moments are fitted within it. Generalized random forest weights adapt neighborhoods to the data. The procedure averages fold estimates and uses estimated standard errors for endpoint inference; Imbens–Manski and Stoye methods provide inference for the partially identified effect itself (§5).

Under the stated identification assumptions, covariate adjustment weakly tightens the population bounds; this is not a guarantee that every finite-sample interval is shorter.

## Experiments

**Simulation (§6).** The main design uses 1,000 observations and ten covariates, only one of which affects outcomes and response alongside an unobserved factor. Across 1,000 assignments, adjusted bounds are narrower than basic bounds. Complete-case OLS, causal forests, and inverse attrition weighting are biased. Conditional estimates exhibit some boundary bias. With sample sizes from 400 to 2,000, reported mean squared error declines and coverage is approximately the nominal 95%.

**Application (§7).** Santoro and Broockman (2022) randomized disclosure of a conversation partner's outpartisan identity. Adjustment uses age, gender, race, education, party identification, and baseline warmth. Evidence against unconditional monotonicity motivates allowing selection direction to vary. Adjusted bound estimates are 0.272 and 0.355 on the rescaled warmth outcome; both are significantly positive. Conditional lower bounds are significantly positive below age 30, while the estimated sets cross zero for other representative ages. These conditional profiles hold other attributes at means or modes.

The article describes supplementary comparisons with Olma and Semenova and extensions to binary outcomes, unit-level missingness, and observational studies; their detailed results are not reproduced in the supplied main text.

## Limitations

The estimand concerns always-responders, not the full population. Conditional monotonicity remains a substantive restriction and is not equivalent to missing at random. Inadequate covariates for separating selection directions can make the estimator inconsistent; residual classification error is left for future research. Forest estimation costs more computation and offers less direct interpretability than simple stratification. Asymptotic inference depends on regularity and nuisance-estimation conditions.

## Related Concepts

- [[concepts/lee-trimming-bounds|Lee Trimming Bounds]]: the underlying selection-bounding argument and its covariate extension.
- [[concepts/double-machine-learning|Double Machine Learning]]: orthogonal scores and cross-fitting control nuisance-estimation bias.

## Related Papers

- Lee (2009), “Training, Wages, and Sample Selection: Estimating Sharp Bounds on Treatment Effects”: foundational trimming construction.
- Athey, Tibshirani, and Wager (2019), “Generalized Random Forests”: adaptive local estimation framework.
- Semenova (2025), “Generalized Lee Bounds”: related conditional-monotonicity approach.
- [[papers/priming-bias-versus-post-treatment-bias-in-experimental-designs|Priming Bias Versus Post-Treatment Bias in Experimental Designs]]: another partial-identification response to post-treatment conditioning, targeting moderator effects rather than response selection.

Replication package: [Wang (2025), Harvard Dataverse](https://doi.org/10.7910/DVN/JDSFJO). The article describes an R implementation named CTB.
