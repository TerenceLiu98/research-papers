---
title: "Understanding, Choosing, and Unifying Multilevel and Fixed Effect Approaches"
type: paper
authors:
  - Chad Hazlett
  - Leonard Wainstein
year: 2022
doi: "10.1017/pan.2020.41"
journal: Political Analysis
volume: 30
pages: "46–65"
tags:
  - multilevel-modeling
  - fixed-effects
  - clustered-data
---

## TL;DR

Random effects in linear multilevel models can be represented as regularized fixed effects. Shrinkage improves prediction but can leave group-level confounding unremoved. Adding appropriate covariate projections and using cluster-robust standard errors yields the same shared coefficients and standard errors as the analogous fixed-effects model, under a spherical working error specification and matching finite-sample corrections.

## Research Question

When do multilevel and fixed-effects approaches differ in coefficient bias, prediction, and uncertainty, and when can their inferential results be made identical?

## Motivation

Researchers often choose multilevel models because observations are grouped, without checking covariate–random-effect dependence or the assumed covariance structure. The paper distinguishes adjustment for confounding from modeling dependence and from predicting outcomes. It reviews 109 empirical articles alongside 10 textbooks and four pedagogical articles. The journal issue is dated 2022; online publication was December 31, 2020.

## Contributions

- Formalizes random effects as penalized group-specific coefficients, explaining both partial pooling and incomplete adjustment for group-level confounding.
- Connects the Mundlak group-mean adjustment to fixed-effects estimation and generalizes correction using within-group projections.
- Shows equality of cluster-robust standard errors for shared coefficients after bias correction, provided the same finite-sample multiplier is used.
- Documents substantial gaps between available methodological remedies and applied practice.

## Method

For a random-intercept model, estimating group intercepts is equivalent to minimizing squared residuals plus $\lambda\sum_g\gamma_g^2$, with $\lambda=\hat\sigma^2/\hat\omega^2$ when the observation-level working covariance is $\sigma^2 I$. Shrinking intercepts leaves residual confounding when group effects correlate with the target covariate (Section 3.1).

For bias correction, add group means of every included lower-level regressor, including interactions and nonlinear transformations. This separates [[concepts/within-and-between-cluster-covariate-effects|within- and between-cluster covariate effects]]. In the general model, add columns of $\widetilde X_g=Z_g(Z_g^\top Z_g)^{-1}Z_g^\top X_g$, where the inverse exists, as unpenalized regressors. Under the spherical working specification, identifiable shared coefficients equal those from the corresponding FE regression (Section 3.2).

Use a cluster sandwich variance estimator allowing arbitrary covariance within groups and zero covariance across groups. The corrected MLM and FE estimates have identical cluster-robust standard errors for shared coefficients when their finite-sample scaling agrees (Section 3.3). Working covariance assumptions used for fitting must be distinguished from the actual error dependence accommodated by this variance estimator.

## Experiments

- **Regularization equivalence:** 1,000 simulations with 25 groups of 15 observations compare random intercepts with cross-validated regularized FE. Target coefficient estimates correlate at 0.999; the penalty choices correlate at 0.910. Exact equality requires the theorem's matched penalty, rather than independently tuned penalties (Figure 1).
- **Confounding:** With 50 groups and group sizes of 5 or 50, uncorrected random intercepts retain bias. Their RMSE is about twice that of group FE in the reported simulations; larger groups reduce but do not eliminate the problem (Figure 2).
- **Prediction:** Bias-corrected random intercepts have lower test prediction error than group FE in DGP 1, particularly for smaller groups, over 1,000 iterations (Figure 3).
- **Coverage:** DGP 2 combines autocorrelation of 0.75 with group-dependent error variance. Default random-intercept intervals undercover. Cluster-robust intervals address the lower-level coefficient's undercoverage, while inference for the group-level coefficient remains poor with 15 groups and still undercovers with 50 (Figures 4–5).
- **Practice review:** Among relevant studies, suitable debiasing was used in 0/24 education, 1/39 political science, and 2/19 sociology articles. These are subsets of the broader 109-article review.

## Limitations

The equivalence concerns linear models, identifiable shared coefficients, and the stated spherical working specification. It does not remove within-group confounding or justify causal interpretation without conditional mean and specification assumptions. Group-level covariates, random-slope covariates, and some cross-level interactions can duplicate their projections, preventing this correction from identifying their effects. A per-cluster regression can help under additional exogeneity assumptions.

Cluster-robust inference requires defensible independence across clusters and enough clusters; many observations in a few groups are insufficient. Prediction gains in the simulations do not establish universal superiority. The supplied text refers proofs and additional examples to supplementary appendices that are not included in the parsed main article.

## Related Concepts

- [[concepts/within-and-between-cluster-covariate-effects|Within- and Between-Cluster Covariate Effects]]: group means separate the variation needed for the Mundlak correction.
- [[concepts/two-way-fixed-effects|Two-Way Fixed Effects]]: a related panel specification with unit and period intercepts; the paper's primary comparison concerns group intercepts, so its results should not be read as resolving all two-way identification issues.

## Related Papers

- Mundlak (1978), “On the Pooling of Time Series and Cross Section Data”: source of the group-mean correction developed here.
- Cameron and Miller (2015), “A Practitioner’s Guide to Cluster-Robust Inference”: guidance cited for covariance estimation and cluster-count concerns.
- [[papers/misspecifying-the-shape-of-a-random-effects-distribution-why-getting-it-wrong-may-not-matter|Misspecifying the Shape of a Random Effects Distribution: Why Getting It Wrong May Not Matter]]: complementary library reading on distributional-shape robustness, a different issue from covariate–random-effect confounding.
