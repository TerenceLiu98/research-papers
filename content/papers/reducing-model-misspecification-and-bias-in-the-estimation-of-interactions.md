---
title: "Reducing Model Misspecification and Bias in the Estimation of Interactions"
type: paper
authors:
  - Matthew Blackwell
  - Michael P. Olson
year: 2022
doi: "10.1017/pan.2021.19"
source_job_id: "16cd2bd6-7ff5-42e2-ba4d-31b42d3e47fc"
tags:
  - interaction-effects
  - causal-inference
  - variable-selection
---

## TL;DR

Omitting moderator–covariate interactions can bias the focal treatment–moderator interaction. Blackwell and Olson adapt post-double selection (PDS) to select adjustment terms using the outcome, treatment, and treatment–moderator product, then estimate effects by unpenalized regression. Simulations favor this approach under approximate sparsity, especially when full moderation is unstable.

## Research Question

How can researchers estimate a prespecified interaction while allowing covariate effects to vary with the moderator, without excessive variance or regularization bias?

## Motivation

Adding a single interaction to a baseline regression assumes that all other covariate slopes remain constant across moderator values. A fully moderated model relaxes this restriction, but nearly doubles the parameter count. Prediction-oriented regularization can shrink the target interaction directly or omit adjustment terms that strongly predict treatment despite weak outcome associations.

## Contributions

- Distinguishes direct shrinkage of the focal effect from indirect regularization bias through inadequate covariate adjustment.
- Adapts PDS to joint estimation of the treatment coefficient and its interaction, extending covariance estimation to marginal effects.
- Discusses deviation coding for regularized fixed-effect interactions and cluster-adjusted penalty loadings.
- Demonstrates consequences through simulations and two political-science reanalyses.

## Method

Write the fully moderated outcome model as

$$
Y=\delta_0+\delta_1D+\delta_2V+X^\top\delta_3+\delta_4DV+VX^\top\delta_5+\varepsilon.
$$

Omitting $VX$ biases the coefficient on $DV$ when omitted interactions predict the outcome and remain associated with the focal product after adjustment. Adding treatment–covariate products alone does not solve this problem. With binary $V$, full moderation is equivalent to fitting separate regressions by moderator group.

PDS runs three lasso regressions, predicting $Y$, $D$, and $DV$ from candidate terms $Z=(V,X,VX)$. It takes the union of selected terms and fits OLS of $Y$ on $D$, $DV$, and that union. In the applications, lower-order terms are forced into the final model. Selection uses data-dependent, covariate-specific penalties, with adjustments for clustering.

The joint covariance estimator uses residualized focal regressors and a robust sandwich calculation. Retaining the covariance between the treatment and interaction coefficients permits uncertainty estimation for $\delta_1+v\delta_4$. Deviation coding makes shrinkage of categorical coefficients refer to a grand mean rather than an arbitrary reference category (Sections 3.3–3.4).

The causal target is treatment-effect heterogeneity across moderator groups, not necessarily the causal effect of intervening on the moderator. Flexible modeling does not replace identification assumptions such as no unmeasured confounding.

## Experiments

**Monte Carlo study (Section 4).** Sample size is 425, with 20 or 200 covariates and a true interaction coefficient of 1. Covariate effects decay quadratically in the approximately sparse design; moderator–covariate partial explanatory power varies over 0, 0.25, and 0.5. Comparators include single-interaction OLS, fully moderated OLS, adaptive lasso, KRLS, BART, and an infeasible oracle.

With 20 covariates, full moderation has the lowest bias among feasible methods, with PDS close behind. With 200 covariates, full moderation estimates 403 parameters and becomes numerically unstable. PDS maintains roughly nominal 95% interval coverage under approximate sparsity, with some undercoverage when interactions strongly predict outcomes. Adaptive-lasso intervals often undercover. Under denser, inverse-index coefficient decay, lasso-based performance deteriorates; KRLS has lower RMSE than PDS in the high-dimensional dense setting despite tending to estimate a near-zero interaction.

**Direct primaries and third-party voting (Section 5.1).** Single-interaction and adaptive-lasso models suggest a more negative adoption effect in the South. Full moderation yields a near-zero regional interaction; PDS lies between these conclusions, with a marginally significant negative marginal effect in the South.

**Remittances and protest (Section 5.2).** Only the single-interaction model finds a statistically significant regime-type interaction. PDS and full moderation suggest little difference across regimes. PDS produces smaller marginal-effect estimates and somewhat tighter intervals than full moderation; its effect is significant only in autocracies.

## Limitations

PDS relies on approximate sparsity and suitable penalty choices. Dense nuisance relationships undermine its performance. When covariate interactions are nearly unrelated to treatment, outcome-only selection may be more efficient. Full moderation remains attractive when the sample supports it. The comparison tests particular implementations of BART and KRLS, whose general response-surface prediction objective differs from targeted interaction inference. Empirical disagreements demonstrate specification sensitivity, not known causal ground truth.

## Related Concepts

- [[concepts/post-double-selection|Post-Double Selection]]: union-based adjustment followed by unpenalized target estimation.
- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: interpreting treatment effects across moderator values requires both adequate adjustment and joint coefficient uncertainty.

## Related Papers

- Belloni, Chernozhukov, and Hansen (2014), “Inference on Treatment Effects after Selection among High-Dimensional Controls”: the foundational PDS approach adapted here.
- Beiser-McGrath and Beiser-McGrath (2020), “Problems with Products?”: prior analysis of omitted interactions and adaptive estimation.
- [[papers/the-consequences-of-model-misspecification-for-the-estimation-of-nonlinear-interaction-effects|The Consequences of Model Misspecification for the Estimation of Nonlinear Interaction Effects]]: a related library paper extending specification concerns to nonlinear moderation; not a citation from this earlier article.

Published in *Political Analysis* 30, 495–514 (2022), online 23 July 2021. The paper identifies the `inters` R package and [replication archive](https://doi.org/10.7910/DVN/HZYFRI).
