---
title: "The Consequences of Model Misspecification for the Estimation of Nonlinear Interaction Effects"
type: paper
authors:
  - Janina Beiser-McGrath
  - Liam F. Beiser-McGrath
year: 2023
doi: "10.1017/pan.2022.25"
source_job_id: "c31be0c9-3ff9-46c7-9baa-099c48363665"
tags:
  - interaction-effects
  - model-misspecification
  - political-methodology
---

## TL;DR

Flexible interaction estimators can mistake omitted nonlinear covariate effects for nonlinear moderation. In the paper's simulation, a binning-based Wald test rejects a true linear interaction in 86.5% of runs without full moderation and 66% with it. Expanding covariate adjustment and using adaptive Lasso provide progressively broader robustness checks.

## Research Question

Can methods designed to relax linear interaction assumptions yield misleading nonlinear interaction estimates when other parts of the outcome model remain misspecified?

## Motivation

Allowing a treatment effect to vary flexibly with a moderator does not ensure adequate modeling of correlated adjustment covariates. The resulting interaction curve can absorb omitted nonlinearities. Graphical diagnostics and tests comparing linear and binned specifications do not, by themselves, identify the source of this misspecification.

## Contributions

- Demonstrates false detection of nonlinear interactions when a correlated control variable's quadratic effect is omitted.
- Proposes theoretical specification checks, adaptive-Lasso selection of adjustment terms, and a fully nonlinear interactive adaptive-Lasso model.
- Reanalyzes 23 interaction effects from 17 studies to assess sensitivity to broader functional-form flexibility.

## Method

The simulation uses treatment $D$, moderator $X$, and control $Z$:

$$
Y=-0.5D+0.5X+0.5Z-1.5Z^2+0.5DX+\epsilon.
$$

$X$ and $Z$ are jointly normal with zero means, unit variances, and correlation 0.5; $D$ and the error are standard normal. The true marginal effect is $-0.5+0.5X$, linear in the moderator.

The binning estimator divides $X$ at its terciles and allows local treatment slopes and moderator relationships. The paper compares specifications with and without squared terms and with and without full moderation of controls. Full moderation here interacts controls with $X$, not with treatment $D$; it does not automatically include nonlinear functions of controls.

The proposed sequence is to include theoretically plausible control nonlinearities, select additional control nonlinearities and interactions using adaptive Lasso, and then estimate a fuller nonlinear interactive adaptive-Lasso model involving the focal variables as well. The second step retains binning-based presentation; the third addresses a broader set of omitted interactions.

## Experiments

**Simulation (Sections 2–3).** Four binning specifications are estimated over 1,000 simulated datasets each. Omitting squared terms produces Wald-test rejection rates of 86.5% without full moderation and 66% with full moderation at the 0.05 threshold. Including squared terms yields approximately uniform null p-values. In the illustrated dataset, both proposed Lasso approaches recover a largely linear interaction over most moderator support, whereas the original binning and kernel estimates show curvature.

**Empirical reanalysis (Section 4).** The authors select 17 studies with 23 interaction estimates, excluding cases with common-support problems, no additional controls, or computational issues. Original binning estimates identify 18 substantively nonlinear patterns: 13 nonmonotonic and five otherwise visibly nonlinear. Adding Lasso-selected control terms leaves results broadly similar. Among these 18 cases, the fully nonlinear interactive Lasso instead yields 12 constant marginal effects, five linear interactions, and one weakly nonlinear interaction.

The paper additionally reports BART checks for 14 cases with constant marginal effects under the fuller Lasso model, a set broader than the 12 cases above. BART finds no substantive interaction in 10 and no statistically significant interaction in any of the 14. These supplementary findings are reported in the main text; the supplementary analyses were not supplied separately.

## Limitations

Regularization can shrink genuine interactions to zero, so disagreement with binning is a sensitivity finding rather than proof that the empirical interaction is absent. The authors interpret detection of other nonlinearities and the BART checks as evidence against regularization alone explaining their results. Flexible models also increase computational and post-estimation complexity.

The simulation establishes a specific failure mode, not universal rejection rates. The selected reanalysis sample excludes support and computational problems, and its substantive nonlinearity classifications include visual judgments. The supplied Markdown omits referenced footnote details and separate supplementary material, so sample-size and tuning details not stated in the main text are not reconstructed.

## Related Concepts

- [[concepts/conditional-marginal-effects|Conditional Marginal Effects]]: interpreting moderator-indexed effects requires adequate adjustment for the remaining covariates.

## Related Papers

- Hainmueller, Mummolo, and Xu (2019), “How Much Should We Trust Estimates from Multiplicative Interaction Models? Simple Tools to Improve Empirical Practice”: supplies the binning, kernel, and diagnostic procedures examined here.
- Beiser-McGrath and Beiser-McGrath (2020), “Problems with Products? Control Strategies for Models with Interactive and Quadratic Effects”: prior analysis of omitted nonlinearities and interactions.
- Blackwell and Olson, “Reducing Model Misspecification and Bias in the Estimation of Interactions”: related control-specification and regularization strategies.
- [[papers/a-practical-guide-to-estimating-conditional-marginal-effects-modern-approaches|A Practical Guide to Estimating Conditional Marginal Effects: Modern Approaches]]: a related library treatment of flexible nuisance adjustment and moderator-indexed estimation, not a citation claimed by this paper.

Published in *Political Analysis* 31, 278–287 (2023), online 17 October 2022. Replication data and code: [Harvard Dataverse](https://doi.org/10.7910/DVN/S44D0E).
