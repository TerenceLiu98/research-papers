---
title: "Robust Bayes-Assisted Conformal Prediction"
type: paper
authors:
  - Kianoosh Ashouritaklimi
  - Stefano Cortinovis
  - François Caron
year: null
tags:
  - conformal-prediction
  - bayesian-inference
  - uncertainty-quantification
  - distribution-shift
---

## TL;DR

RoBAS constructs residual-based [[Bayes-Assisted Conformal Prediction]] scores that exploit a reliable zero-centered working prior but revert toward a data-centered score when calibration residuals reveal prior-data conflict. Its heavy-tailed and empirical-Bayes variants retain the finite-sample marginal coverage of [[Conformal Prediction]] while producing competitive intervals without shift and substantially narrower intervals than prior-sensitive alternatives under the studied training-to-deployment shifts.

## Research Question

Can a Bayes-assisted conformal score retain the efficiency gained from informative prior knowledge when that knowledge is accurate without producing excessively wide prediction intervals when the prior conflicts with calibration data?

## Motivation

Posterior-predictive nonconformity scores can be Bayes-optimal when their Bayesian working model is well aligned with the data. Their conformal validity survives misspecification, but their efficiency need not: a poor prior can sharply increase prediction-set size. This problem is acute with small calibration sets and predictors whose training distribution differs from the calibration and test distribution.

## Contributions

- Introduces Robust Bayes-Assisted Shrinkage (RoBAS), which places a Bayesian working model on a fixed predictor's residuals rather than on the full conditional response model.
- Gives a heavy-tailed hierarchical construction, RoBAS-Full, whose score becomes equivalent up to a monotone transformation to Distance-to-Average (DTA) under strong prior-data conflict.
- Derives RoBAS-EB, a closed-form empirical-Bayes score that adaptively interpolates between Distance-to-Origin (DTO) and DTA.
- Proves that the RoBAS-EB conformal prediction set is an interval for calibration size $n\geq4$ and proposes a grid-free endpoint search.
- Evaluates both variants on synthetic, tabular, and image regression tasks with small calibration sets and training-to-calibration/test distribution shift.

## Method

Given a fixed predictor $f$, RoBAS models residuals $r_i=y_i-f(x_i)$. DTO uses $|r_{n+1}|$ and is efficient when residuals are centered at zero, whereas DTA uses $|r_{n+1}-\bar r_n|$ and is robust to a shifted residual mean but must estimate that mean.

RoBAS-Full uses a Gaussian residual model with a zero-centered Gaussian prior on the residual mean and a heavy-tailed mixing distribution over its variance. As the observed residual mean moves far from zero, the posterior can assign mass to large prior variances, weakening the zero-centered prior; the resulting posterior-predictive score converges to a monotone transformation of DTA. The experiments instantiate this construction with a horseshoe prior.

RoBAS-EB replaces the variance mixture with a conjugate normal prior and plugs empirical-Bayes variance estimates into the fixed-hyperparameter score:

$$
s(r_{n+1},\mathbf r_{1:n})=
\left|r_{n+1}-\widehat a(\mathbf r_{1:n})\bar r_n\right|.
$$

The shrinkage factor is zero when the estimated between-mean variance vanishes and approaches one as prior-data conflict grows. The score therefore behaves like DTO near a zero residual mean and like DTA for a sufficiently large shift. Prediction interval endpoints are found by bracketed maximization and root search rather than a fixed response grid.

## Experiments

All experiments use 300 trials and focus on calibration sizes of 5, 10, 25, and 50. The synthetic study varies the mean and variance of Gaussian residuals and compares RoBAS-Full and RoBAS-EB with DTO, DTA, and a Normal-Normal-Gamma Bayes-assisted score. Near zero mean, RoBAS is among the narrowest methods; as the residual mean moves away from zero, it tracks DTA while DTO and the Normal-Normal-Gamma intervals widen substantially. The gains diminish with larger calibration sets and lower noise.

The tabular experiments use Facebook comment volume, Airfoil Self-Noise, and Concrete Compressive Strength, inducing covariate shift between proper training data and the exchangeable calibration/test population. The image experiments use UTKFaces and VentricularVolume with in- and out-of-distribution calibration/test subsets. A random forest serves as the predictor, with pretrained image encoders for the image tasks. RoBAS is competitive with the narrowest baselines in distribution and remains close to DTA under shift, while the other standard and Bayes-assisted approaches generally widen.

For UTKFaces out-of-distribution data, reported RoBAS widths range from 2.452 to 2.901 across calibration sizes, close to DTA's 2.463 to 2.919; DTO ranges from 7.554 to 7.870 and the Normal-Normal-Gamma method from 4.677 to 5.022. The paper reports coverage separately and states that the methods achieve the required marginal coverage, consistent with exchangeability of calibration and test samples.

## Limitations

- The robustness target is prediction-set efficiency under prior-data conflict, not coverage under a shift between calibration and test data; the usual exchangeability requirement remains.
- RoBAS-Full and RoBAS-EB use residual mean shift as the signal of predictor failure, so other forms of misspecification are not directly addressed.
- The strongest empirical advantages appear with small, noisy calibration samples; benefits shrink with larger calibration sets or lower noise.
- RoBAS-Full requires special-function evaluation, and both variants still use iterative endpoint search rather than closed-form interval endpoints.
- The real-data evidence covers three tabular and two image regression datasets with the specified predictors and shift constructions; it does not establish performance in other domains.

## Related Concepts

- [[Conformal Prediction]]
- [[Bayes-Assisted Conformal Prediction]]

## Related Papers

- Hoff (2023), "Bayes-Optimal Prediction with Frequentist Coverage Control": establishes Bayes-risk optimality of posterior-predictive conformal scores under an aligned working model.
- Fong and Holmes (2021), "Conformal Bayesian Computation": develops posterior-predictive conformal scoring with add-one-in importance sampling.
- Bersson and Hoff (2024), "Optimal Conformal Prediction for Small Areas": gives a Normal-Normal-Gamma working model and closed-form prediction intervals.
- Tibshirani et al. (2019), "Conformal Prediction Under Covariate Shift": addresses coverage, rather than efficiency, when calibration and test distributions differ.

[[index|Library home]]
