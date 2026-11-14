---
title: "UD-DML: Uniform Design Subsampling for Double Machine Learning over Massive Data"
type: paper
authors:
  - Yuanke Qu
  - Xiaoya Xu
  - Hengtao Zhang
year: 2026
tags:
  - causal-inference
  - double-machine-learning
  - subsampling
  - uniform-design
  - observational-studies
---

## TL;DR

UD-DML reduces the cost of [[Double Machine Learning]] by selecting a balanced working sample before fitting nuisance models. It builds a low-discrepancy skeleton in a PCA-rotated covariate space, matches one treated and one control observation to each skeleton point, and runs cross-fitted AIPW estimation on the selected original records. The paper proves representativeness and treatment-balance bounds for functions captured by the retained coordinates and a root-$r$ Gaussian limit under explicit nuisance-rate, overlap, smoothness, and design-error conditions. Simulations and a 2.85-million-record natality study report lower error than random subsampling, especially under poor overlap, at substantially lower cost than full-data DML.

## Research Question

Can a geometrically representative and treatment-balanced subsample preserve valid average-treatment-effect inference from DML while moving repeated nuisance-model fitting from the full sample size $n$ to a much smaller selected size $r$?

## Motivation

Cross-fitting lets DML use flexible outcome and propensity models without allowing first-order nuisance error to dominate causal estimation, but it requires repeated model fitting on large samples. Uniform random subsampling lowers that cost without preserving the full covariate geometry or aligning treated and control observations. Those failures are especially damaging under weak overlap because extreme estimated propensities generate unstable inverse-probability corrections. The paper treats working-sample selection as a design problem through [[Uniform Design Subsampling]].

## Contributions

- Introduces UD-DML, which combines a low-discrepancy uniform-design skeleton with paired treated-control nearest-neighbor selection and cross-fitted AIPW estimation.
- Bounds the difference between full-sample and selected-sample empirical averages by the skeleton discrepancy and arm-specific matching radii in the retained PCA space.
- Shows that matching both treatment arms to the same skeleton also controls their empirical covariate imbalance for smooth functions of the retained coordinates.
- Proves root-$r$ asymptotic normality and motivates Wald intervals based on the selected sample's cross-fitted pseudo-outcomes.
- Evaluates statistical accuracy, interval behavior, runtime, double robustness, and sensitivity to overlap in simulations and a large observational application.

## Method

UD-DML standardizes the covariates and retains the smallest number of principal components explaining a chosen fraction of variance; the experiments use a threshold of 0.85. It constructs a good-lattice-point design on $[0,1]^q$, searches a budgeted set of admissible power generators, and chooses the candidate with the smallest mixture discrepancy. Coordinate-wise empirical inverse CDFs map this skeleton into the retained PCA space.

Separate KD-trees index treated and control observations. For every skeleton point, the method selects the nearest available unit from each arm, producing $r=2r_p$ original observations. PCA coordinates and skeleton points determine indices only: outcome and treatment-effect estimation still use the original records and covariates.

The selected observations enter standard cross-fitted DML. Fold-specific outcome regressions and propensity scores form AIPW pseudo-outcomes, whose average estimates the ATE; their empirical variance divided by $r$ supplies the Wald variance estimate. The dominant iterative learning cost is therefore $C_{\mathrm{DML}}(r,p,K)$ rather than $C_{\mathrm{DML}}(n,p,K)$, although PCA, empirical-CDF construction, design search, and matching still add preprocessing costs involving the full data.

The theory separates two design errors. Generalized empirical F-discrepancy controls how well the skeleton represents full-sample averages, while the maximum distance from a skeleton point to its selected observation controls matching error. Under low-dimensional approximation, smoothness, vanishing design errors, overlap, cross-fitted nuisance consistency and product rates, and a conditional Lindeberg condition, the feasible estimator is asymptotically equivalent to an oracle estimator and satisfies a root-$r$ central limit theorem.

## Experiments

The simulation study uses three ten-covariate observational data-generating processes with high, moderate, and low overlap. The true ATE is 1.0. LightGBM nuisance models, two-fold cross-fitting, propensity clipping to $[0.01,0.99]$, and 500 Monte Carlo replications are used while $n$ reaches $500{,}000$ and $r$ varies from 1,000 to 10,000. Comparisons include DML on a uniform random subsample and, in the scalability experiment, full-data DML.

UD-DML and random-subsample DML behave similarly in the high-overlap setting, but the reported RMSE and interval-width gaps widen under moderate and poor overlap while coverage generally remains near 95%. At $n=500{,}000$ and $r=5{,}000$, Table 2 reports UD-DML versus random-subsample RMSEs of 0.037 versus 0.049 in the moderate-overlap setting and 0.036 versus 0.062 in the low-overlap setting. In the latter setting, UD-DML runs in 2.80 seconds, random-subsample DML in 0.57 seconds, and full-data DML in 28.73 seconds; full-data DML remains much more accurate, with RMSE 0.004.

When either nuisance component is correctly estimated, the results broadly retain the AIPW double-robustness pattern. With both nuisance models deliberately misspecified, neither method has a general robustness guarantee: UD selection remains much better than random selection in the reported moderate- and low-overlap cases, but its coverage falls below nominal in the moderate-overlap case. The paper attributes the remaining bias to higher-order structure not controlled by marginal geometry in the retained PCA space.

The real-data study estimates the effect of maternal smoking on birth weight using 2,846,543 cleaned records from the 2021 US Natality file, including 111,627 records reporting smoking. Full-data DML estimates a 134.7-gram reduction. At $r=5{,}000$, 100 bootstrap replications give a UD-DML mean corresponding to a 124.4-gram reduction with scaled standard deviation 0.00237, compared with a 152.4-gram reduction and standard deviation 0.01051 for random-subsample DML. Reported runtimes are 15.4 seconds for UD-DML, 1.1 seconds for random subsampling, and 189.9 seconds for full-data DML.

## Limitations

The theoretical guarantee is conditional on substantial structure: overlap must remain bounded, nuisance estimators must satisfy consistency and product-rate requirements on the selected data, the target and nuisance errors must be well approximated by smooth functions of the retained PCA coordinates, and both discrepancy and matching errors must vanish faster than $r^{-1/2}$. These conditions do not follow automatically from constructing a uniform design.

PCA can omit low-variance directions that carry causal signal, and marginal empirical transformations do not fully control nonlinear interactions or higher-order moments. The joint-misspecification experiment demonstrates this limitation through sub-nominal coverage in one data-generating process. KD-tree matching also deteriorates in genuinely high-dimensional spaces, and the proposed 1:1 pairing applies only to binary treatment.

The empirical comparison is limited to three synthetic designs and one natality dataset. Full-data DML remains the most accurate estimator in the scalability results, while UD-DML pays a meaningful runtime premium over random subsampling. The natality analysis treats the full-data estimate as a reference rather than an observed causal truth, and its causal interpretation still depends on unconfoundedness and the adequacy of the recorded covariates.

## Related Concepts

- [[Double Machine Learning]]
- [[Uniform Design Subsampling]]
- Augmented inverse propensity weighting
- Causal overlap
- Neyman-orthogonal scores

## Related Papers

- Chernozhukov et al. (2018), "Double/Debiased Machine Learning for Treatment and Structural Parameters."
- Zhang et al. (2023), "Model-Free Subsampling Method Based on Uniform Designs."
- Zhou et al. (2024), "Efficient Model-Free Subsampling Method for Massive Data."
- Su, Wang, and Wang (2022), "A Two-Stage Optimal Subsampling Estimation for Missing Data Problems with Large-Scale Data."
- Su (2025), "Fast and Efficient Causal Inference in Large-Scale Data via Subsampling and Projection Calibration."
